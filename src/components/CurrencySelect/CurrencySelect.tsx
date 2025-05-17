import { useState } from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';
import { CurrencyCode, Currency } from '../../types/index.ts';
import { getCurrency, getCurrencyCodeList } from '../../utils/util.ts';

export interface CurrencySelectProps {
	currencyCode: CurrencyCode;
	onCurrencyChange: (currencyCode: CurrencyCode) => void;
}

export const filterValues = (options: CurrencyCode[], value: string) => {
	const searchableFields: (keyof Pick<Currency, 'label' | 'name'>)[] = ['label', 'name'];
	const normalize = (str: string): string => str.toLowerCase().replace(/\s+/g, '');

	return options.filter((option: CurrencyCode) =>
		searchableFields.some((field) => normalize(getCurrency(option)[field]).includes(normalize(value)))
	);
};

export const CurrencySelect: React.FC<CurrencySelectProps> = ({ currencyCode, onCurrencyChange }) => {
	const [inputValue, setInputValue] = useState('');
	const [inputFocused, setInputFocused] = useState(false);

	return (
		<Autocomplete
			slotProps={{
				popupIndicator: { disableRipple: true }
			}}
			disableClearable // hide clear button
			blurOnSelect // blur upon selected
			clearOnEscape // allow clearing inputValue via escape key
			openOnFocus // open dropdown upon focus
			options={getCurrencyCodeList()}
			value={currencyCode}
			onChange={(_, newValue) => newValue && onCurrencyChange(newValue)}
			inputValue={inputValue}
			onInputChange={(_, newInputValue, reason) => {
				// upon selecting a new option followed by automatic blur, clear the input value.
				if (reason === 'blur' || reason === 'selectOption') {
					setInputValue('');
				}
				newInputValue && setInputValue(newInputValue);
			}}
			filterOptions={(options, props) => filterValues(options, props.inputValue)}
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
					helperText='Select a currency'
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
