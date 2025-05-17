// import { useState } from "react";
import { TextField, InputAdornment } from '@mui/material';
import { getCurrency } from '../utils/util';
import { CurrencyCode } from '../types';
// import { OpeningBalanceInputProp } from '../types';

export interface OpeningBalanceInputProp {
	currencyCode: CurrencyCode;
}

// User input field for the default amount of cash to be used for next day operation
export const OpeningBalanceInput: React.FC<OpeningBalanceInputProp> = ({ currencyCode }) => (
	<TextField
		fullWidth
		type='number'
		helperText='helpertext'
		label='Opening Balance'
		slotProps={{
			input: {
				startAdornment: <InputAdornment position='start'>{getCurrency(currencyCode).symbol}</InputAdornment>
			}
		}}
	/>
);
