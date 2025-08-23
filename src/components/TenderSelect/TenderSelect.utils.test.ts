import { filterValues } from './TenderSelect.utils';
import { TENDER_TYPES } from '../../assets/currencies';
import { type TenderType } from '../../types';

describe('TenderSelect helpers', () => {
	describe('filterValues', () => {
		const options = Object.keys(TENDER_TYPES) as TenderType[];

		it('should filter by key', () => {
			expect(filterValues(options, 'bills')).toEqual(['bills']);
		});

		it('should filter by value and include partial matches', () => {
			// 'Coin Rolls' includes 'Coins', so both are expected
			expect(filterValues(options, 'Coins')).toEqual(['coins', 'rolls']);
		});

		it('should be case-insensitive', () => {
			expect(filterValues(options, 'rOlLs')).toEqual(['rolls']);
		});

		it('should return all options for an empty search', () => {
			expect(filterValues(options, '')).toEqual(options);
		});

		it('should return an empty array for no matches', () => {
			expect(filterValues(options, 'nonexistent')).toEqual([]);
		});
	});
});
