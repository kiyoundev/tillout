import { TextField, InputAdornment, type TextFieldProps } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { getCurrency } from '@/utils/util';
import { useMemo } from 'react';
import { getSeparators } from './AmountField.utils';
import { useCurrencyCode } from '@/stores/tillStore';
import type { CurrencyCode } from '@/types';

/**
 * Props for the AmountField component.
 */

export type AmountFieldProps = Pick<TextFieldProps, 'helperText'> & {
	value: number | undefined;
	onValueChange: (value: number | undefined) => void;
	currencyCode?: CurrencyCode;
};

/**
 * A specialized TextField for inputting monetary amounts.
 * It uses react-number-format for formatting and Material-UI for styling.
 * - Displays a currency symbol adornment based on the `currencyCode` prop.
 * - Uses locale-aware thousand and decimal separators.
 * - Disallows negative numbers.
 * - Enforces a two-decimal-place format.
 */

export const AmountField = ({ value, onValueChange, helperText, currencyCode: propCurrencyCode, ...props }: AmountFieldProps) => {
	const storeCurrencyCode = useCurrencyCode();
	const currencyCode = propCurrencyCode || storeCurrencyCode;
	const currency = getCurrency(currencyCode);
	const { thousandSeparator, decimalSeparator } = useMemo(() => getSeparators(currencyCode), [currencyCode]);

	return (
		<NumericFormat
			// MUI TextField props
			customInput={TextField}
			helperText={helperText}
			slotProps={{
				input: {
					startAdornment: <InputAdornment position='start'>{currency.symbol}</InputAdornment>
				}
			}}
			fullWidth
			// NumericFormat props
			value={value === undefined ? null : value}
			onValueChange={(values) => onValueChange(values.floatValue)}
			thousandSeparator={thousandSeparator}
			decimalSeparator={decimalSeparator}
			allowNegative={false}
			fixedDecimalScale
			decimalScale={2}
			{...props}
		/>
	);
};
