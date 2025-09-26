import { useState } from 'react';
import { TextField, Autocomplete, Box, Stack, Typography } from '@mui/material';
import { getCurrency } from '@/utils/util';
import { CURRENCY_DETAILS } from '@/constants/currencies';
import { filterValues } from './CurrencySelect.utils';
import { useCurrencyCode, useUpdateCurrencyCode } from '@/stores/tillStore';
import type { CurrencyCode } from '@/types';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export interface CurrencySelectProps {
	helperText?: string;
	currencyCode?: CurrencyCode;
}

/**
 * A specialized Autocomplete component for selecting a currency.
 * It provides a user-friendly dropdown with search and filter capabilities.
 * - Renders a list of all available currencies, showing their flag, name, and code.
 * - Allows users to filter currencies by typing the currency name or code.
 * - Displays the selected currency's flag and code when a value is chosen.
 * - Updates the global currency state through the till store when a new currency is selected.
 */

export const CurrencySelect: React.FC<CurrencySelectProps> = ({ helperText = 'Select a currency' }) => {
	const [inputValue, setInputValue] = useState('');
	const [inputFocused, setInputFocused] = useState(false);

	const currencyCode = useCurrencyCode();
	const updateCurrencyCode = useUpdateCurrencyCode();

	const breakpoint = useBreakpoint();

	return (
		<Autocomplete
			slotProps={{
				popupIndicator: { disableRipple: true } // disable down arrow icon ripple
			}}
			disableClearable // hide clear button
			blurOnSelect // blur upon selected
			clearOnEscape // allow clearing inputValue via escape key
			openOnFocus // open dropdown upon focus
			options={Object.keys(CURRENCY_DETAILS) as CurrencyCode[]}
			value={currencyCode}
			onChange={(_, newValue) => updateCurrencyCode(newValue)}
			inputValue={inputValue}
			onInputChange={(_, newInputValue, reason) => {
				// upon selecting a new option followed by automatic blur, clear the input value
				if (reason === 'blur' || reason === 'selectOption') {
					setInputValue('');
				} else {
					setInputValue(newInputValue);
				}
			}}
			filterOptions={(options, state) => filterValues(options, state.inputValue)}
			renderValue={(value) => {
				const currency = getCurrency(value);
				return (
					// Only display currency when input is not focused
					value &&
					!inputFocused && (
						<Stack
							direction='row'
							alignItems='center'
							sx={{ ml: 0.5 }}
							spacing={1}
						>
							<img
								loading='lazy'
								width='25'
								src={`http://flagcdn.com/${value}.svg`}
							/>

							<Stack
								direction='row'
								alignItems='center'
								spacing={0.5}
							>
								<Typography>{currency.label}</Typography>
								{!['xxs', 'xs'].includes(breakpoint) && <Typography>-</Typography>}
								{!['xxs', 'xs'].includes(breakpoint) && <Typography color='text.secondary'>{currency.name}</Typography>}
							</Stack>
						</Stack>
					)
				);
			}}
			renderInput={(props) => (
				<TextField
					{...props}
					variant='outlined'
					placeholder={inputFocused ? 'Type to search...' : ''}
					helperText={helperText}
					onFocus={() => setInputFocused(true)}
					onBlur={() => setInputFocused(false)}
				/>
			)}
			renderOption={(props, option) => {
				const currency = getCurrency(option);
				return (
					<li
						{...props}
						key={option}
					>
						<img
							loading='lazy'
							width='25'
							src={`http://flagcdn.com/${option}.svg`}
						/>
						<Box sx={{ ml: 1 }}>
							{currency.label} {currency.name}
						</Box>
					</li>
				);
			}}
		/>
	);
};
