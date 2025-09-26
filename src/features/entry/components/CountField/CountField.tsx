import { TextField, type TextFieldProps } from '@mui/material';
import { NumericFormat, type OnValueChange } from 'react-number-format';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export type CountFieldProps = Pick<TextFieldProps, 'label' | 'onFocus' | 'onBlur'> & {
	value: number | undefined;
	onValueChange: OnValueChange;
};

/**
 * A specialized TextField for inputting the count of currency denominations.
 * It uses react-number-format for formatting and input constraints, and Material-UI for styling.
 * - Label is provided by the parent (e.g., "$100", "€50").
 * - Allows 0 as a minimum value, no explicit maximum.
 * - Disallows negative numbers and decimals.
 * - Disallows leading zeros.
 */

export const CountField = ({ value, onValueChange, label, ...props }: CountFieldProps) => {
	const breakpoint = useBreakpoint();

	return (
		<NumericFormat
			// --- MUI TextField props (passed to customInput) ---
			customInput={TextField}
			label={label}
			fullWidth
			slotProps={breakpoint === 'xxs' ? { inputLabel: { shrink: true } } : {}}
			// --- NumericFormat specific props ---}
			value={value === undefined ? '' : value}
			onValueChange={onValueChange}
			allowNegative={false}
			decimalScale={0}
			allowLeadingZeros={false}
			{...props}
		/>
	);
};

export default CountField;
