import { useRef, useState, useEffect } from 'react';
import { TextField, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { FormInputProps } from '../types';
import { removeLeadingZero } from '../utils/util';

export const FormInput: React.FC<FormInputProps> = ({ cashTypes, selectedCashOption }) => {
	const CashInput = ({ tender, type, value, onChange, onFocus, onBlur }) => (
		<TextField
			value={value}
			onChange={(e) => onChange(e, tender, type)}
			onFocus={(e) => onFocus(e, tender, type)}
			onBlur={(e) => onBlur(e, tender, type)}
			onKeyDown={handleKeyDown}
			variant='outlined'
			id={`${tender}-${type}`}
			label={type}
			type='number'
		/>
	);

	const mapInitialData = (value: 0 | '') => {
		let data = {};
		Object.keys(selectedCashOption).forEach((key) => {
			Object.values(cashTypes[key] ?? cashTypes['coins']).forEach((type) => {
				(data[key] ||= {})[type] = value;
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
	const refData = useRef(mapInitialData(0));
	const isCalculated = useRef(false);

	useEffect(() => {
		refData.current = mapInitialData(0);
	}, [selectedCashOption, cashTypes]);

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
										<CashInput
											tender={tender}
											type={type}
											value={formData?.[tender]?.[type] ?? ''}
											onChange={handleChange}
											onFocus={handleFocus}
											onBlur={handleBlur}
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
