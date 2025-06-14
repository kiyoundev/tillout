import { TextField, InputAdornment, type TextFieldProps } from '@mui/material';
import { NumericFormat, NumberFormatValues } from 'react-number-format';
import { getCurrency } from '../../utils/util';
import { CurrencyCode } from '../../types/index.ts';
import { useMemo } from 'react';

/**
 * AmountField component
 *
 * A specialized TextField for inputting currency amounts.
 * It uses react-number-format for formatting and Material-UI for styling.
 * It dynamically displays the correct currency symbol and number separators
 * based on the provided currency code.
 */

export type AmountFieldProps = Pick<TextFieldProps, 'label' | 'helperText'> & {
	currencyCode: CurrencyCode;
	value: number | undefined;
	onValueChange: (value: NumberFormatValues) => void;
};

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
