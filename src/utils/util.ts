import { Currency, CurrencyCode } from '../types';
import { CURRENCY_DETAILS } from '../assets/currencies';

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

// export const calculateTotal = (data: Data, currency: Currency): number => {
// 	const parseValue = (input: string, divisor = 1): number => parseFloat(input.match(/\d+(\.\d+)?/)?.[0] || '0') / divisor;
// 	let totalSum = 0;

// 	Object.keys(data).forEach((tender) => {
// 		Object.keys(data[tender as Tender]).forEach((type) => {
// 			let quantity = parseInt(data[tender as Tender][type], 10);
// 			let value = tender === 'rolls' ? parseValue(currency.cashTypes.rolls[type]) : parseValue(type, type.includes(currency.symbol) ? 1 : 100);
// 			totalSum += quantity * value;
// 		});
// 	});

// 	return totalSum;
// };
