import { Currency, Data, Symbol, Tender } from '../types';

export const displayEndAdornment = (option: Currency): string => `- ${option?.name ?? ''}`;

export const calculateTotal = (data: Data, symbol: Symbol): number => {
	const { rollsFaceValue, ...formData } = data;
	const parseValue = (input: string, divisor = 1): number => parseFloat(input.match(/\d+(\.\d+)?/)?.[0] || '0') / divisor;
	let totalSum = 0;

	Object.keys(formData).forEach((tender) => {
		Object.keys(formData[tender as Tender]).forEach((type) => {
			const quantity = parseInt(data[tender as Tender][type], 10);
			let value = tender === 'rolls' ? parseValue(rollsFaceValue[type]) : parseValue(type, type.includes(symbol) ? 1 : 100);
			totalSum += quantity * value;
		});
	});

	return totalSum;
};
