import { Currency, CurrencyCode } from '../types';
import { CURRENCY_DETAILS } from '../assets/currencies';
import { type Counts, type TenderType } from '../types';

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

/**
 * Calculates the total monetary value from a counts object.
 * @param counts An object containing the quantity of each bill, coin, and roll.
 * @param currencyCode The currency code to use for value calculation.
 * @returns The total calculated value.
 */
export const calculateTotal = (counts: Counts, currencyCode: CurrencyCode): number => {
	const currency = getCurrency(currencyCode);
	let totalSum = 0;

	Object.keys(counts).forEach((tender) => {
		Object.keys(counts[tender as TenderType]).forEach((denomKey) => {
			const quantity = counts[tender as TenderType][denomKey];
			let value =
				tender === 'rolls'
					? parseValue(currency.denomination.rolls[denomKey])
					: parseValue(denomKey, denomKey.includes(currency.symbol) ? 1 : 100);

			if (typeof quantity === 'number') {
				totalSum += quantity * value;
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
