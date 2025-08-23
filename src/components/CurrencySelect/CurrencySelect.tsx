import { useState } from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';
import { type CurrencyCode } from '../../types/index.ts';
import { getCurrency } from '../../utils/util.ts';
import { CURRENCY_DETAILS } from '../../assets/currencies';
import { filterValues } from './CurrencySelect.utils';
import { useCurrencyCode, useTillActions } from '../../stores/tillStore.ts';

export interface CurrencySelectProps {
	helperText?: string;
}

/**
 * A specialized Autocomplete component for selecting a currency.
 * It provides a user-friendly dropdown with search and filter capabilities.
 * - Renders a list of all available currencies, showing their flag, name, and code.
 * - Allows users to filter currencies by typing the currency name or code.
 * - Displays the selected currency's flag and code when a value is chosen.
 * - Communicates the selected currency back to the parent component via the `onCurrencyChange` callback.
 */

export const CurrencySelect: React.FC<CurrencySelectProps> = ({ helperText = 'Select a currency' }) => {
	const [inputValue, setInputValue] = useState('');
	const [inputFocused, setInputFocused] = useState(false);

	const currencyCode = useCurrencyCode();
	const { updateCurrencyCode } = useTillActions();

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
			onChange={(_, newValue) => newValue && updateCurrencyCode(newValue)}
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
						<>
							<img
								loading='lazy'
								width='25'
								src={`http://flagcdn.com/${value}.svg`}
							/>
							<Box sx={{ ml: 1 }}>{currency.label}</Box>
							<Box sx={{ ml: 0.5, color: 'text.secondary' }}>{` - ${currency.name}`}</Box>
						</>
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
