import { Currency, CurrencyCode } from '../types';
import Big from 'big.js';
import { CURRENCY_DETAILS } from '../assets/currencies';
import type { Counts, TenderType, DepositSummary, DepositBreakdown, DepositAction } from '../types';
import type { CurrencyDenomination } from './suggestionEngine';

/**
 * Retrieves the currency details for a given currency code.
 * @param currencyCode The code for the currency (e.g., 'us', 'ca').
 * @returns The currency object containing details like symbol, name, and denominations.
 * @throws Will throw an error if the currency code is invalid.
 */
export const getCurrency = (currencyCode: CurrencyCode): Currency => {
	const currency = CURRENCY_DETAILS[currencyCode];
	if (!currency) {
		throw new Error('Invalid currency code');
	}
	return currency;
};

/**
 * Calculates the number of columns per row for the tender count grid to ensure a consistent layout.
 * The goal is to create a 2x3 grid if the max denominations are 6 or less, and a 2x4 grid if they are 7 or 8.
 * @param currencyCode The code for the currently selected currency (e.g., 'us').
 * @returns The number of columns that should be in each row of the grid (e.g., 3 or 4).
 */

export const getColumnSize = (currencyCode: CurrencyCode): number => {
	const currency = getCurrency(currencyCode);
	const maxDenominations = Math.max(currency.denomination.bills.length, currency.denomination.coins.length);
	return 12 / Math.ceil(maxDenominations / 2);
};

/**
 * Parses a numerical value from a string, ignoring non-numeric characters.
 * @param input The string to parse (e.g., '$100', '25¢').
 * @param divisor An optional number to divide the parsed value by, for handling subunits like cents. Defaults to 1.
 * @returns The parsed numerical value.
 */
export const parseValue = (input: string, divisor = 1): number => parseFloat(input.match(/\d+(\.\d+)?/)?.[0] || '0') / divisor;

export const getDenominationValue = (tender: TenderType, denom: string, currency: Currency): number => {
	if (tender === 'rolls') {
		return parseValue(currency.denomination.rolls[denom]);
	}
	return parseValue(denom, denom.includes(currency.symbol) ? 1 : 100);
};

/**
 * Calculates the total monetary value from a counts object.
 * @param counts An object containing the quantity of each bill, coin, and roll.
 * @param currencyCode The currency code to use for value calculation.
 * @returns The total calculated value.
 */

export const calculateTotal = (counts: Counts, currencyCode: CurrencyCode): Big => {
	const currency = getCurrency(currencyCode);
	let totalSum = new Big(0);

	Object.keys(counts).forEach((tender) => {
		Object.keys(counts[tender as TenderType]).forEach((denomKey) => {
			const quantity = counts[tender as TenderType][denomKey];
			const value = getDenominationValue(tender as TenderType, denomKey, currency);

			if (typeof quantity === 'number') {
				totalSum = totalSum.plus(new Big(value).times(quantity));
			}
		});
	});

	return totalSum;
};

/**
 * Calculates the variance between the counted total and the expected total.
 * @param calculatedTotal The total monetary value from the physical count.
 * @param openingBalance The starting balance of the till.
 * @param totalSales The total sales recorded.
 * @returns The variance ratio, or 0 if the expected total is zero.
 */
export const calculateVariance = (calculatedTotal: number, openingBalance: number | undefined, totalSales: number | undefined): number => {
	const expectedTotal = (openingBalance || 0) + (totalSales || 0);
	if (expectedTotal === 0) {
		return 0; // Avoid division by zero; no variance if nothing is expected.
	}
	return calculatedTotal / expectedTotal;
};

/**
 * Calculates the deposit breakdown and any necessary actions based on till counts and a target opening balance.
 *
 * @param counts The complete counts of all tender types.
 * @param openingBalance The target opening balance to be left in the till.
 * @param currencyCode The currency code for value lookups.
 * @returns A DepositSummary object containing the total deposit, the breakdown, and any actions for the user.
 */
export const calculateDeposit = (counts: Counts, openingBalance: number, currencyCode: CurrencyCode): DepositSummary => {
	const currency = getCurrency(currencyCode);
	const totalCountedValue = calculateTotal(counts, currencyCode);
	const openingBalanceBig = new Big(openingBalance);

	if (totalCountedValue.lte(openingBalanceBig)) {
		return { totalDeposit: 0, breakdown: {}, actions: [] };
	}

	const totalDepositAmount = totalCountedValue.minus(openingBalanceBig);
	let remainingDeposit = totalDepositAmount;

	const depositBreakdown: DepositBreakdown = { bills: {}, coins: {}, rolls: {} };
	const actions: DepositAction[] = [];

	// Use the centralized helper to get all possible denominations, then filter for what the user actually has.
	const allDenominations = getFlattenedDenominations(currencyCode)
		.filter((denom) => (counts[denom.tender]?.[denom.denom] || 0) > 0)
		.sort((a, b) => b.value.cmp(a.value));

	const sortedDenominations = [
		...allDenominations.filter((d) => d.tender === 'bills' || d.tender === 'coins'),
		...allDenominations.filter((d) => d.tender === 'rolls')
	];

	for (const { tender, denom, value } of sortedDenominations) {
		if (remainingDeposit.lt(0.01)) break;

		const availableQty = counts[tender]?.[denom] || 0;
		if (availableQty === 0) continue;

		const qtyToDeposit = Math.min(availableQty, remainingDeposit.div(value).round(0, Big.roundDown).toNumber());

		if (qtyToDeposit > 0) {
			if (!depositBreakdown[tender]) depositBreakdown[tender] = {};
			depositBreakdown[tender]![denom] = qtyToDeposit;
			remainingDeposit = remainingDeposit.minus(value.times(qtyToDeposit));
		}
	}

	// Recommendation to break rolls for a more flexible float
	const floatCounts: Counts = JSON.parse(JSON.stringify(counts));
	for (const tender of Object.keys(depositBreakdown) as TenderType[]) {
		for (const denom of Object.keys(depositBreakdown[tender]!)) {
			floatCounts[tender]![denom]! -= depositBreakdown[tender]![denom]!;
		}
	}

	const looseCoinsInFloat = Object.values(floatCounts.coins || {})
		.filter((qty): qty is number => typeof qty === 'number')
		.reduce((sum, qty) => sum + qty, 0);
	if (looseCoinsInFloat < 20 && Object.keys(floatCounts.rolls || {}).length > 0) {
		const largestRollDenom = Object.keys(floatCounts.rolls!)
			.filter((denom) => floatCounts.rolls![denom]! > 0)
			.sort((a, b) => {
				const valA = new Big(getDenominationValue('rolls', a, currency));
				const valB = new Big(getDenominationValue('rolls', b, currency));
				return valB.cmp(valA);
			})[0];
		if (largestRollDenom) {
			actions.push({ type: 'BREAK_ROLL', message: `Break 1 roll of ${largestRollDenom} for a more flexible float.` });
		}
	}

	return {
		totalDeposit: totalDepositAmount.round(2).toNumber(),
		breakdown: depositBreakdown,
		actions
	};
};

/**
 * Creates a flattened, standardized list of all possible denominations for a given currency.
 * This function is the single source of truth for denomination data and handles the different
 * data structures for bills, coins (arrays), and rolls (object).
 *
 * @param currencyCode The currency to get denominations for (e.g., 'us').
 * @returns A flat array of `CurrencyDenomination` objects, each representing a single denomination.
 */
export const getFlattenedDenominations = (currencyCode: CurrencyCode): CurrencyDenomination[] => {
	const details = getCurrency(currencyCode);
	const allDenominations: CurrencyDenomination[] = [];

	Object.entries(details.denomination).forEach(([type, denoms]) => {
		const tenderType = type as TenderType;

		if (Array.isArray(denoms)) {
			// This part is correct for bills and coins
			denoms.forEach((name) => {
				const value = getDenominationValue(tenderType, name, details);
				const key = `${currencyCode}_${tenderType}_${name}`;
				allDenominations.push({
					key,
					denom: name,
					value: new Big(value),
					tender: tenderType,
					basePriority: 1 // Bills and coins are common
				});
			});
		} else {
			// --- THIS BLOCK IS NEEDED TO HANDLE ROLLS ---
			// 'denoms' is the rolls object, e.g., { '1¢': '$0.50', '5¢': '$2.00' }
			Object.keys(denoms).forEach((name) => {
				// For rolls, the 'name' is the coin type (e.g., '1¢')
				// and the value comes from the object lookup.
				const value = getDenominationValue(tenderType, name, details);
				const key = `${currencyCode}_${tenderType}_${name}`;
				allDenominations.push({
					key,
					denom: name,
					value: new Big(value),
					tender: tenderType,
					basePriority: 10 // Rolls are less common errors
				});
			});
		}
	});
	return allDenominations;
};
