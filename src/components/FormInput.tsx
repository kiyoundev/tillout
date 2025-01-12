import { useRef, useState, useEffect, useMemo } from 'react';
import { TextField, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { FormInputProps, Tender, Type, Data, Value, PreData } from '../types';
import { calculateTotal } from '../utils/util';

export const FormInput: React.FC<FormInputProps> = ({ symbol, cashTypes, selectedCashOption }) => {
	const preData = useMemo<PreData>(
		() => ({
			bills: cashTypes.bills,
			coins: cashTypes.coins,
			rolls: Object.keys(cashTypes.rolls)
		}),
		[cashTypes]
	);

	const updateFormData = (tender: Tender, type: Type<typeof tender>, value: Value): void => {
		setFormData((prev) => ({
			...prev,
			[tender]: {
				...prev[tender],
				[type]: value
			}
		}));
	};

	const autoFillData = (): Data => {
		const data = {} as Data;

		(Object.keys(preData) as Array<Tender>).forEach((key) => {
			selectedCashOption[key] &&
				preData[key].forEach((type) => {
					(data[key] ||= {})[type] = formData[key]?.[type] || '0';
				});
		});

		'rolls' in data && (data['rollsFaceValue'] = cashTypes.rolls);

		return data;
	};

	const [formData, setFormData] = useState<Data>({} as Data);
	const isCalculated = useRef<boolean>(false);
	const [totalAmount, setTotalAmount] = useState<number>(0);

	useEffect(() => {
		const emptyData = {} as Data;
		if (JSON.stringify(formData) === JSON.stringify(emptyData)) return;
		setFormData(emptyData);
	}, [cashTypes]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, tender: Tender, type: Type<typeof tender>): void => {
		const value = String(Number(e.target.value));
		updateFormData(tender, type, value);
	};

	const handleFocus = (tender: Tender, type: Type<typeof tender>): void => {
		formData[tender]?.[type] === '0' && updateFormData(tender, type, '');
	};

	const handleBlur = (tender: Tender, type: Type<typeof tender>): void => {
		isCalculated.current && formData[tender]?.[type] === '' && updateFormData(tender, type, '0');
	};

	// Prevent characters like "e", ".", "-", "+" directly at the keypress level
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (['e', 'E', '-', '+', '.'].includes(e.key)) {
			e.preventDefault();
		}
	};

	const handleSubmit = (): void => {
		const data = autoFillData();
		const totalAmount = calculateTotal(data, symbol);
		setFormData(data);
		setTotalAmount(totalAmount);
		isCalculated.current = true;
	};

	const handleReset = (): void => {
		setFormData({} as Data);
		isCalculated.current = false;
	};

	return (
		<>
			<Stack>
				{(Object.keys(preData) as Array<Tender>).map((key) => {
					const tender = key as Tender;
					return (
						selectedCashOption[tender] && (
							<Grid
								container
								key={`${tender}-container`}
								spacing={2}
							>
								{Object.values(preData[tender]).map((type) => (
									<Grid key={`${tender}-${type}`}>
										<TextField
											value={formData[tender as Tender]?.[type] ?? ''}
											onChange={(e) => handleChange(e, tender, type)}
											onFocus={() => handleFocus(tender, type)}
											onBlur={() => handleBlur(tender, type)}
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
					);
				})}
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

			<Grid container>{isCalculated.current && totalAmount}</Grid>
		</>
	);
};
