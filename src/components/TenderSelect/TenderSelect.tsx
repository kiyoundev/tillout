import { Autocomplete, TextField } from '@mui/material';

type Tender = 'bills' | 'coins' | 'rolls';

const TENDER_OPTIONS: Record<Tender, string> = {
	bills: 'Banknotes',
	coins: 'Coins',
	rolls: 'Rolled Coins'
};

export interface TenderSelectProps {
	selectedTender: Tender[];
	onTenderChange: (selectedTender: Tender[]) => void;
}

export const filterValues = (options: Tender[], inputValue: string) => {
	return options.filter(
		(option) => option.toLowerCase().includes(inputValue.toLowerCase()) || TENDER_OPTIONS[option].toLowerCase().includes(inputValue.toLowerCase())
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
			options={Object.keys(TENDER_OPTIONS) as Tender[]}
			// display the label of the option
			renderOption={(props, option) => (
				<li
					{...props}
					key={option}
				>
					{TENDER_OPTIONS[option]}
				</li>
			)}
			getOptionLabel={(option) => TENDER_OPTIONS[option]}
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
