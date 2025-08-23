import { getSeparators } from './AmountField.utils';

describe('AmountField helpers', () => {
	describe('getSeparators', () => {
		it('should return correct separators for a US locale', () => {
			const separators = getSeparators('us');
			expect(separators.thousandSeparator).toBe(',');
			expect(separators.decimalSeparator).toBe('.');
		});

		it('should return correct separators for a Euro locale', () => {
			const separators = getSeparators('eu');
			expect(separators.thousandSeparator).toBe('.');
			expect(separators.decimalSeparator).toBe(',');
		});
	});
});
