import { useState, useReducer } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { CurrencyCode, Currency, ACTIONTYPE } from '../types/index.ts';
import { getCurrency } from '../utils/util';
import { CURRENCY_DETAILS } from '../assets/currencies.ts';

interface CurrencySelectProps {
	currencyCode: CurrencyCode;
	setCurrencyCode: (currencyCode: CurrencyCode) => void;
}

interface FlagIMGProps {
	currencyCode: CurrencyCode;
	container?: 'input' | 'dropdown';
}

interface InputFieldProps {
	currency: Currency;
	currencyCode: CurrencyCode;
	onFocusChange: (inputFocused: boolean) => void;
	InputProps?: object;
}

interface OptionFieldProps {
	currencyCode: CurrencyCode;
}

// list of currencyCode
export const getCurrencyCodeList = (): (keyof typeof CURRENCY_DETAILS)[] => Object.keys(CURRENCY_DETAILS) as (keyof typeof CURRENCY_DETAILS)[];

// display value for the selected option
export const displayValue = (currencyCode: CurrencyCode): string => `- ${CURRENCY_DETAILS[currencyCode].name}`;

export const filterValues = (options: (keyof typeof CURRENCY_DETAILS)[], value: string) => {
	const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '');
	const inputValue = normalize(value);

	return options.filter(
		(option) => normalize(CURRENCY_DETAILS[option].label).includes(inputValue) || normalize(CURRENCY_DETAILS[option].name).includes(inputValue)
	);
};

export const FlagIMG: React.FC<FlagIMGProps> = ({ currencyCode, container = 'input' }) => (
	<img
		loading='lazy'
		width='25'
		srcSet={`https://flagcdn.com/w40/${currencyCode}.png 2x`}
		src={`https://flagcdn.com/w40/${currencyCode}.png`}
		style={container == 'input' ? { marginLeft: '0.5em', marginRight: '0.5em' } : { marginRight: '0.5em' }}
	/>
);

export const OptionField: React.FC<OptionFieldProps> = ({ currencyCode, ...props }) => {
	const currency = CURRENCY_DETAILS[currencyCode];
	if (!currency) {
		throw new Error(`Invalid currency code: ${currencyCode}`);
	}
	return (
		<li
			{...props}
			key={currencyCode}
		>
			<FlagIMG
				currencyCode={currencyCode}
				container='dropdown'
			/>
			{currency.label} {currency.name}
		</li>
	);
};

export const InputField: React.FC<InputFieldProps> = (props) => {
	const { onFocusChange, currency, currencyCode, ...restProps } = props;
	const [inputFocused, setInputFocused] = useState<boolean>(false);

	const toggleInputFocused = (): void => {
		setInputFocused((prevFocused) => {
			onFocusChange(!prevFocused);
			return !prevFocused;
		});
	};

	return (
		<TextField
			{...restProps}
			label='Currency'
			placeholder='Type to search...'
			onFocus={toggleInputFocused}
			onBlur={toggleInputFocused}
			slotProps={{
				input: {
					...restProps.InputProps,
					sx: {
						input: {
							color: inputFocused ? 'black' : 'gray'
						}
					},
					startAdornment: !inputFocused && (
						<>
							<FlagIMG currencyCode={currencyCode} />
							{currency.label}
						</>
					)
				}
			}}
		/>
	);
};

const reducer = (state: string, action: ACTIONTYPE): string => {
	switch (action.type) {
		// Autocomplete's blurOnSelect causes inputValue to be reverted back to original value, causing re-render
		// Re-render only when inputValue's state changes from empty string to action.payload
		case 'blur':
			return state && state !== action.payload ? state : action.payload;
		default:
			return action.payload;
	}
};

export const CurrencySelect: React.FC<CurrencySelectProps> = ({ currencyCode, setCurrencyCode }) => {
	const currency: Currency = getCurrency(currencyCode);
	const [inputValue, dispatch] = useReducer(reducer, currency ? displayValue(currencyCode) : '');

	const handleFocusChange = (inputFocused: boolean): void => {
		inputFocused && dispatch({ type: 'focus', payload: '' });
	};

	return (
		<Autocomplete
			disableClearable
			blurOnSelect
			clearOnEscape
			options={getCurrencyCodeList()} // list of currencyCode
			value={currencyCode}
			onChange={(_, newValue) => setCurrencyCode(newValue)}
			inputValue={inputValue}
			onInputChange={(_, newInputValue, reason) => dispatch({ type: reason, payload: newInputValue })}
			getOptionLabel={(option) => displayValue(option)}
			filterOptions={(options, props) => filterValues(options, props.inputValue)}
			renderOption={(props, option) => (
				<OptionField
					{...props} // MUI-provided props
					key={option} // explicitly unique key passed as prop
					currencyCode={option}
				/>
			)}
			renderInput={(props) => (
				<InputField
					{...props}
					onFocusChange={handleFocusChange}
					currency={currency}
					currencyCode={currencyCode}
				/>
			)}
		/>
	);
};
