import { Autocomplete, TextField } from '@mui/material';
import { TENDER_TYPES } from '../../assets/currencies';
import { type TenderType } from '../../types';
import { filterValues } from './TenderSelect.utils';
import { useTillActions, useSelectedTender } from '../../stores/tillStore';

// export interface TenderSelectProps {
// 	selectedTender: TenderType[];
// 	onTenderChange: (selectedTender: TenderType[]) => void;
// }

/**
 * A multi-select Autocomplete component for selecting tender types (e.g., Bills, Coins, Rolls).
 * It allows users to choose which types of tender they want to count.
 *
 * - Renders a list of available tender types.
 * - Allows users to select one or more tender types.
 * - The dropdown remains open after a selection to facilitate multiple choices.
 * - Communicates the array of selected tenders back to the parent component via the `onTenderChange` callback.
 *
 * @param selectedTender An array of the currently selected tender types.
 * @param onTenderChange Callback function fired when the selection of tender types changes.
 */

export const TenderSelect = () => {
	const selectedTender = useSelectedTender();
	const { updateSelectedTender } = useTillActions();

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
