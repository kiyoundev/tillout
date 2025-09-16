import { filterValues } from './CurrencySelect.utils';
import { CURRENCY_CODES } from '../../constants/currencies';

describe('CurrencySelect helpers', () => {
	describe('filterValues', () => {
		it('should filter options based on currency label (code)', () => {
			const filtered = filterValues(CURRENCY_CODES, 'gb');
			expect(filtered).toEqual(['gb']);
		});

		it('should filter options based on currency name', () => {
			// 'us' -> 'US Dollar', 'ca' -> 'Canadian Dollar'
			const filtered = filterValues(CURRENCY_CODES, 'Dollar');
			expect(filtered).toEqual(expect.arrayContaining(['us', 'ca', 'au', 'nz']));
			expect(filtered.length).toBe(4);
		});

		it('should be case-insensitive', () => {
			const filtered = filterValues(CURRENCY_CODES, 'dollar');
			expect(filtered).toEqual(expect.arrayContaining(['us', 'ca', 'au', 'nz']));
			expect(filtered.length).toBe(4);
		});

		it('should return an empty array if no match is found', () => {
			const filtered = filterValues(CURRENCY_CODES, 'nonexistent');
			expect(filtered).toEqual([]);
		});

		it('should return all options for an empty search string', () => {
			const filtered = filterValues(CURRENCY_CODES, '');
			expect(filtered).toEqual(CURRENCY_CODES);
		});
	});
});
