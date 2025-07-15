import { Autocomplete, TextField } from '@mui/material';
import { TENDER_TYPES } from '../../assets/currencies';
import { type TenderType } from '../../types';

export interface TenderSelectProps {
	selectedTender: TenderType[];
	onTenderChange: (selectedTender: TenderType[]) => void;
}

export const filterValues = (options: TenderType[], inputValue: string) => {
	return options.filter(
		(option) => option.toLowerCase().includes(inputValue.toLowerCase()) || TENDER_TYPES[option].toLowerCase().includes(inputValue.toLowerCase())
	);
};

export const TenderSelect = ({ selectedTender, onTenderChange }: TenderSelectProps) => {
	return (
		<Autocomplete
			multiple
			disableCloseOnSelect // keep the dropdown menu open even when an option is selected
			slotProps={{
				popupIndicator: { disableRipple: true } // disable down arrow icon ripple
			}}
			options={Object.keys(TENDER_TYPES) as TenderType[]}
			// display the label of the option
			renderOption={(props, option) => (
				<li
					{...props}
					key={option}
				>
					{TENDER_TYPES[option]}
				</li>
			)}
			getOptionLabel={(option) => TENDER_TYPES[option]}
			value={selectedTender}
			onChange={(_, newValue) => onTenderChange(newValue)}
			filterOptions={(options, state) => filterValues(options, state.inputValue)}
			renderInput={(params) => (
				<TextField
					{...params}
					helperText='Select Tender Types'
				/>
			)}
		/>
	);
};

(window as any).filterValues = filterValues;
