import { useRef, useState, useEffect } from 'react';
import { TextField, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { FormInputProps, Tender, Type, Data, SelectedCashOption, Value } from '../types';

export const FormInput: React.FC<FormInputProps> = ({ cashTypes, selectedCashOption }) => {
	const initializeData = (): Data => {
		const data = {} as Data;
		(Object.keys(selectedCashOption) as Array<keyof SelectedCashOption>).forEach((key) => {
			Object.values(cashTypes[key] ?? cashTypes['coins']).forEach((type) => {
				(data[key] ||= {})[type] = 0;
			});
		});
		return data;
	};

	const updateFormData = (tender: Tender, type: Type, value: Value): void => {
		setFormData((prev) => ({
			...prev,
			[tender]: {
				...prev[tender],
				[type]: value
			}
		}));
	};

	const mergeFormData = (): Data => {
		const updatedData = {} as Data;
		for (const key of Object.keys(refData.current) as Array<keyof SelectedCashOption>) {
			selectedCashOption[key] &&
				(updatedData[key] = {
					...refData.current[key],
					...formData[key]
				});
		}
		return updatedData;
	};

	const [formData, setFormData] = useState<Data>({} as Data);
	const refData = useRef<Data>(initializeData());
	const isCalculated = useRef<boolean>(false);

	useEffect(() => {
		refData.current = initializeData();
		setFormData({} as Data);
	}, [cashTypes]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, tender: Tender, type: Type) => {
		const value = String(Number(e.target.value));
		updateFormData(tender, type, value);
	};

	const handleFocus = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, tender: Tender, type: Type) => {
		if (e.target.value === '0') {
			updateFormData(tender, type, '');
		}
	};

	const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, tender: Tender, type: Type) => {
		isCalculated.current && e.target.value === '' && updateFormData(tender, type, '0');
	};

	// Prevent characters like "e", ".", "-", "+" directly at the keypress level
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (['e', 'E', '-', '+', '.'].includes(e.key)) {
			e.preventDefault();
		}
	};

	const handleSubmit = (): void => {
		setFormData(mergeFormData());
		isCalculated.current = true;
	};

	const handleReset = (): void => {
		setFormData({} as Data);
		isCalculated.current = false;
	};

	return (
		<>
			<Stack>
				{(Object.keys(selectedCashOption) as Array<keyof SelectedCashOption>).map(
					(tender) =>
						selectedCashOption[tender] && (
							<Grid
								container
								key={`${tender}-container`}
								spacing={2}
							>
								{Object.values(cashTypes[tender] ?? cashTypes['coins']).map((type) => (
									<Grid key={`${tender}-${type}`}>
										<TextField
											value={formData?.[tender]?.[type] ?? ''}
											onChange={(e) => handleChange(e, tender, type)}
											onFocus={(e) => handleFocus(e, tender, type)}
											onBlur={(e) => handleBlur(e, tender, type)}
											onKeyDown={handleKeyDown}
											variant='outlined'
											id={`${tender}-${type}`}
											label={type}
											type='number'
										/>
									</Grid>
								))}
							</Grid>
						)
				)}
			</Stack>

			<Grid
				container
				spacing={2}
			>
				<Button
					disableRipple
					variant='contained'
					onClick={handleSubmit}
				>
					Calculate!
				</Button>
				<Button
					disableRipple
					variant='contained'
					onClick={handleReset}
				>
					Reset
				</Button>
			</Grid>
		</>
	);
};
