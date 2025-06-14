import { Currency, Data, Tender, CurrencyCode } from '../types';
import { CURRENCY_DETAILS } from '../assets/currencies';

export const getCurrency = (currencyCode: CurrencyCode): Currency => {
	const currency = CURRENCY_DETAILS[currencyCode];
	if (!currency) {
		throw new Error('Invalid currency code');
	}
	return currency;
};

export const calculateTotal = (data: Data, currency: Currency): number => {
	const parseValue = (input: string, divisor = 1): number => parseFloat(input.match(/\d+(\.\d+)?/)?.[0] || '0') / divisor;
	let totalSum = 0;

	Object.keys(data).forEach((tender) => {
		Object.keys(data[tender as Tender]).forEach((type) => {
			let quantity = parseInt(data[tender as Tender][type], 10);
			let value = tender === 'rolls' ? parseValue(currency.cashTypes.rolls[type]) : parseValue(type, type.includes(currency.symbol) ? 1 : 100);
			totalSum += quantity * value;
		});
	});

	return totalSum;
};
