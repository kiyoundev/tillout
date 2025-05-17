// import { useState } from "react";
import { TextField, InputAdornment } from '@mui/material';
import { SalesAmountInputProp } from '../types';
import { CurrencyCode } from '../types';

export interface OpeningBalanceInputProp {
	currencyCode: CurrencyCode;
}

// User input field for the amount of sales in cash
export const SalesAmountInput: React.FC<SalesAmountInputProp> = ({ currency }) => (
	<TextField
		fullWidth
		type='number'
		// helperText='helpertext'
		label='Sales Amount'
		slotProps={{
			input: {
				startAdornment: <InputAdornment position='start'>{currency.symbol}</InputAdornment>
			}
		}}
	/>
);
