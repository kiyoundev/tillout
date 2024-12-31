import { useRef, useState, useEffect, useMemo } from 'react';
import { TextField, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { FormInputProps } from '../types';
import { removeLeadingZero } from '../utils/util';

export const FormInput: React.FC<FormInputProps> = ({ cashTypes, selectedCashOption }) => {
	const initializeData = () => {
		let data = {};
		Object.keys(selectedCashOption).forEach((key) => {
			Object.values(cashTypes[key] ?? cashTypes['coins']).forEach((type) => {
				(data[key] ||= {})[type] = 0;
			});
		});
		return data;
	};

	const updateFormData: void = (tender, type, value) => {
		setFormData((prev) => ({
			...prev,
			[tender]: {
				...prev[tender],
				[type]: value
			}
		}));
	};

	const mergeFormData = () => {
		let updatedData = {};
		for (const key of Object.keys(refData.current)) {
			selectedCashOption[key] &&
				(updatedData[key] = {
					...refData.current[key],
					...formData[key]
				});
		}
		return updatedData;
	};

	const [formData, setFormData] = useState({});
	const refData = useRef(useMemo(() => initializeData(), [cashTypes]));
	const isCalculated = useRef(false);

	const handleChange = (e, tender, type) => {
		const value = removeLeadingZero(e);
		updateFormData(tender, type, value);
	};

	const handleFocus = (e, tender, type) => {
		if (e.target.value === '0') {
			updateFormData(tender, type, '');
		}
	};

	const handleBlur = (e, tender, type) => {
		isCalculated.current && e.target.value === '' && updateFormData(tender, type, '0');
	};

	// Prevent characters like "e", ".", "-", "+" directly at the keypress level
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (['e', 'E', '-', '+', '.'].includes(e.key)) {
			e.preventDefault();
		}
	};

	const handleSubmit = () => {
		setFormData(mergeFormData());
		isCalculated.current = true;
	};

	const handleReset = () => {
		setFormData({});
		isCalculated.current = false;
	};

	console.log('refData.current', refData.current);
	console.log('formData', formData);

	return (
		<>
			<Stack>
				{Object.keys(selectedCashOption).map(
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
