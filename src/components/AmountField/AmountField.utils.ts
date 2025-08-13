import { getCurrency } from '../../utils/util';
import { type CurrencyCode } from '../../types';

/**
 * A utility function that returns locale-aware thousand and decimal separators.
 * @param currencyCode The currency code to get separators for.
 * @returns An object containing the `thousandSeparator` and `decimalSeparator`.
 */
export const getSeparators = (currencyCode: CurrencyCode) => {
	const locale = getCurrency(currencyCode).locale;
	const SAMPLE_NUMBER = 1234.56;
	const parts = new Intl.NumberFormat(locale).formatToParts(SAMPLE_NUMBER);
	const thousandSeparator = parts.find((part) => part.type === 'group')?.value || ',';
	const decimalSeparator = parts.find((part) => part.type === 'decimal')?.value || '.';

	return {
		thousandSeparator,
		decimalSeparator
	};
};
