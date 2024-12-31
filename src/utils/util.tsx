import { Currency } from '../types';

export const displayEndAdornment = (option: Currency): string => `- ${option?.name ?? ''}`;

export const removeLeadingZero = (e: React.ChangeEvent<HTMLInputElement>) => {
	let value = e.target.value;
	if (/^\d+$/.test(value)) {
		value = String(Number(value));
	}
	return value;
};
