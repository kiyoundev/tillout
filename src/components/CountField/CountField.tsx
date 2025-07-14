import { TextField, type TextFieldProps } from '@mui/material';
import { NumericFormat, type OnValueChange } from 'react-number-format';

export type CountFieldProps = Pick<TextFieldProps, 'label' | 'onFocus' | 'onBlur'> & {
	value: number | undefined;
	onValueChange: OnValueChange;
};

/**
 * CountField component
 *
 * A specialized TextField for inputting the count of currency denominations.
 * It uses react-number-format for formatting and input constraints, and Material-UI for styling.
 * - Label is provided by the parent (e.g., "$100", "€50").
 * - Allows 0 as a minimum value, no explicit maximum.
 * - Disallows negative numbers and decimals.
 * - Disallows leading zeros.
 */

export const CountField = ({ value, onValueChange, label, ...props }: CountFieldProps) => (
	<NumericFormat
		// --- MUI TextField props (passed to customInput) ---
		customInput={TextField}
		label={label}
		fullWidth
		// --- NumericFormat specific props ---}
		value={value}
		onValueChange={onValueChange}
		allowNegative={false}
		decimalScale={0}
		allowLeadingZeros={false}
		{...props}
	/>
);

export default CountField;
