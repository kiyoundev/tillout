import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { CashOptionSelectProps } from '../types/index.ts';

export const CashOptionSelect: React.FC<CashOptionSelectProps> = ({ selectedCashOption, onCashOptionChange }) => {
	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		onCashOptionChange({ ...selectedCashOption, [name]: checked });
	};

	return (
		<FormGroup>
			<FormControlLabel
				label='Banknotes'
				control={
					<Checkbox
						name='bills'
						checked={selectedCashOption.bills}
						onChange={handleCheckboxChange}
					/>
				}
			/>
			<FormControlLabel
				label='Coins'
				control={
					<Checkbox
						name='coins'
						checked={selectedCashOption.coins}
						onChange={handleCheckboxChange}
					/>
				}
			/>
			<FormControlLabel
				label='Rolled Coins'
				control={
					<Checkbox
						name='rolls'
						checked={selectedCashOption.rolls}
						onChange={handleCheckboxChange}
					/>
				}
			/>
		</FormGroup>
	);
};
