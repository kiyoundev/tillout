import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { SelectedTender } from '../types/index.ts';

interface TenderSelectProps {
	selectedTender: SelectedTender;
	setSelectedTender: (options: SelectedTender) => void;
}

export const TenderSelect: React.FC<TenderSelectProps> = ({ selectedTender, setSelectedTender }) => {
	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		setSelectedTender({ ...selectedTender, [name]: checked });
	};

	return (
		<FormGroup>
			<FormControlLabel
				label='Banknotes'
				control={
					<Checkbox
						name='bills'
						checked={selectedTender.bills}
						onChange={handleCheckboxChange}
					/>
				}
			/>
			<FormControlLabel
				label='Coins'
				control={
					<Checkbox
						name='coins'
						checked={selectedTender.coins}
						onChange={handleCheckboxChange}
					/>
				}
			/>
			<FormControlLabel
				label='Rolled Coins'
				control={
					<Checkbox
						name='rolls'
						checked={selectedTender.rolls}
						onChange={handleCheckboxChange}
					/>
				}
			/>
		</FormGroup>
	);
};
