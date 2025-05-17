import { getCurrency } from '../utils/util';
import { CURRENCY_DETAILS } from '../assets/currencies';
import { CurrencyCode } from '../types';

describe('getCurrency', () => {
	test('should return correct currency details for valid currency codes', () => {
		const validCodes: CurrencyCode[] = ['us', 'ca', 'au', 'nz', 'eu', 'gb'];
		validCodes.forEach((code) => {
			const result = getCurrency(code);
			expect(result).toEqual(CURRENCY_DETAILS[code]);
		});
	});

	test('should throw error for invalid currency codes', () => {
		expect(getCurrency('invalid_code' as CurrencyCode)).toThrow('Invalid currency code');
	});
});
