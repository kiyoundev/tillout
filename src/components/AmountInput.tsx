import { TextField, InputAdornment } from '@mui/material';
import { CurrencyCode } from '../types';
import { getCurrency } from '../utils/util';

interface AmountInputProps {
	currencyCode: CurrencyCode;
	label: string;
}

export const AmountInput: React.FC<AmountInputProps> = ({ currencyCode, label }) => {
	const currency = getCurrency(currencyCode); // Get currency data based on currencyCode

	return (
		<TextField
			fullWidth
			type='number'
			// helperText='helpertext'
			label={label}
			slotProps={{
				input: {
					startAdornment: <InputAdornment position='start'>{currency.symbol}</InputAdornment>
				}
			}}
		/>
	);
};
