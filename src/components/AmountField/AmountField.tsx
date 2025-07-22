import { TextField, InputAdornment, type TextFieldProps } from '@mui/material';
import { NumericFormat, NumberFormatValues } from 'react-number-format';
import { getCurrency } from '../../utils/util';
import { CurrencyCode } from '../../types/index.ts';
import { useMemo } from 'react';

/**
 * Props for the AmountField component.
 */

export type AmountFieldProps = Pick<TextFieldProps, 'label' | 'helperText'> & {
	currencyCode: CurrencyCode;
	value: number | undefined;
	onValueChange: (value: NumberFormatValues) => void;
};

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

/**
 * A specialized TextField for inputting monetary amounts.
 * It uses react-number-format for formatting and Material-UI for styling.
 * - Displays a currency symbol adornment based on the `currencyCode` prop.
 * - Uses locale-aware thousand and decimal separators.
 * - Disallows negative numbers.
 * - Enforces a two-decimal-place format.
 */

export const AmountField = ({ currencyCode, value, onValueChange, label, helperText, ...props }: AmountFieldProps) => {
	const currency = getCurrency(currencyCode);
	const { thousandSeparator, decimalSeparator } = useMemo(() => getSeparators(currencyCode), [currencyCode]);

	return (
		<NumericFormat
			// MUI TextField props
			customInput={TextField}
			label={label}
			helperText={helperText}
			slotProps={{
				input: {
					startAdornment: <InputAdornment position='start'>{currency.symbol}</InputAdornment>
				}
			}}
			// NumericFormat props
			value={value}
			onValueChange={onValueChange}
			thousandSeparator={thousandSeparator}
			decimalSeparator={decimalSeparator}
			allowNegative={false}
			fixedDecimalScale
			decimalScale={2}
			{...props}
		/>
	);
};

export default AmountField;
