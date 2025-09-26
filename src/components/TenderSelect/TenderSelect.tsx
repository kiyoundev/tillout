import { Autocomplete, TextField } from '@mui/material';
import { TENDER_TYPES } from '../../constants/currencies';
import { type TenderType } from '../../types';
import { filterValues } from './TenderSelect.utils';
import { useSelectedTender, useUpdateSelectedTender } from '../../stores/tillStore';

// export interface TenderSelectProps {
// 	selectedTender?: TenderType[];
// }

/**
 * A multi-select Autocomplete component for selecting tender types (e.g., Bills, Coins, Rolls).
 * It allows users to choose which types of tender they want to count.
 *
 * - Renders a list of available tender types.
 * - Allows users to select one or more tender types.
 * - The dropdown remains open after a selection to facilitate multiple choices.
 * - Synchronises changes directly with the till store via `useUpdateSelectedTender()`.
 */

export const TenderSelect: React.FC = () => {
	const selectedTender = useSelectedTender();
	const updateSelectedTender = useUpdateSelectedTender();

	return (
		<Autocomplete
			fullWidth
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
			onChange={(_, newValue) => updateSelectedTender(newValue)}
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
