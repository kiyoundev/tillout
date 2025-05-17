import { useRef, useState, useEffect, useMemo } from 'react';
import { TextField, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { FormInputProps, Tender, Type, Data, Value, PreData, CurrencyCode } from '../types';
import { calculateTotal, getCurrency } from '../utils/util';
import { SelectedTender } from '../types/index.ts';

// export const FormInput: React.FC<FormInputProps> = ({ symbol, cashTypes, selectedCashOption }) => {
// 	const preData = useMemo<PreData>(
// 		() => ({
// 			bills: cashTypes.bills,
// 			coins: cashTypes.coins,
// 			rolls: Object.keys(cashTypes.rolls)
// 		}),
// 		[cashTypes]
// 	);

// 	const updateFormData = (tender: Tender, type: Type<typeof tender>, value: Value): void => {
// 		setFormData((prev) => ({
// 			...prev,
// 			[tender]: {
// 				...prev[tender],
// 				[type]: value
// 			}
// 		}));
// 	};

// const autoFillData = (): Data => {
// 	const data = {} as Data;

// 	(Object.keys(preData) as Array<Tender>).forEach((key) => {
// 		selectedCashOption[key] &&
// 			preData[key].forEach((type) => {
// 				(data[key] ||= {})[type] = formData[key]?.[type] || '0';
// 			});
// 	});

// 	'rolls' in data && (data['rollsFaceValue'] = cashTypes.rolls);

// 	return data;
// };

// 	const [formData, setFormData] = useState<Data>({} as Data);
// 	const isCalculated = useRef<boolean>(false);
// 	const [totalAmount, setTotalAmount] = useState<number>(0);

// 	useEffect(() => {
// 		const emptyData = {} as Data;
// 		if (JSON.stringify(formData) === JSON.stringify(emptyData)) return;
// 		setFormData(emptyData);
// 		isCalculated.current = false;
// 	}, [cashTypes]);

// 	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, tender: Tender, type: Type<typeof tender>): void => {
// 		const value = String(Number(e.target.value));
// 		updateFormData(tender, type, value);
// 	};

// 	const handleFocus = (tender: Tender, type: Type<typeof tender>): void => {
// 		formData[tender]?.[type] === '0' && updateFormData(tender, type, '');
// 	};

// 	const handleBlur = (tender: Tender, type: Type<typeof tender>): void => {
// 		isCalculated.current && formData[tender]?.[type] === '' && updateFormData(tender, type, '0');
// 	};

// 	// Prevent characters like "e", ".", "-", "+" directly at the keypress level
// 	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
// 		if (['e', 'E', '-', '+', '.'].includes(e.key)) {
// 			e.preventDefault();
// 		}
// 	};

// 	const handleSubmit = (): void => {
// 		const data = autoFillData();
// 		const totalAmount = calculateTotal(data, symbol);
// 		setFormData(data);
// 		setTotalAmount(totalAmount);
// 		isCalculated.current = true;
// 	};

// 	const handleReset = (): void => {
// 		setFormData({} as Data);
// 		isCalculated.current = false;
// 	};

// 	return (
// 		<>
// 			<Stack>
// 				{(Object.keys(preData) as Array<Tender>).map((key) => {
// 					const tender = key as Tender;
// 					return (
// 						selectedCashOption[tender] && (
// 							<Grid
// 								container
// 								key={`${tender}-container`}
// 								spacing={2}
// 							>
// 								{Object.values(preData[tender]).map((type) => (
// 									<Grid key={`${tender}-${type}`}>
// 										<TextField
// 											value={formData[tender as Tender]?.[type] ?? ''}
// 											onChange={(e) => handleChange(e, tender, type)}
// 											onFocus={() => handleFocus(tender, type)}
// 											onBlur={() => handleBlur(tender, type)}
// 											onKeyDown={handleKeyDown}
// 											variant='outlined'
// 											id={`${tender}-${type}`}
// 											label={type}
// 											type='number'
// 										/>
// 									</Grid>
// 								))}
// 							</Grid>
// 						)
// 					);
// 				})}
// 			</Stack>

// 			<Grid
// 				container
// 				spacing={2}
// 			>
// 				<Button
// 					disableRipple
// 					variant='contained'
// 					onClick={handleSubmit}
// 				>
// 					Calculate!
// 				</Button>
// 				<Button
// 					disableRipple
// 					variant='contained'
// 					onClick={handleReset}
// 				>
// 					Reset
// 				</Button>
// 			</Grid>

// 			<Grid container>{isCalculated.current && totalAmount}</Grid>
// 		</>
// 	);
// };

// const CashInput = ({ type, values, options }) => {
// 	if (!selectedCashOption[type]) return null;

// 	return (
// 		<Grid
// 			container
// 			spacing={2}
// 		>
// 			{options.map((item) => (
// 				<TextField
// 					key={item}
// 					value={values?.[item] ?? ''}
// 					type='number'
// 					onChange={(e) => handleChange(e.target.value, type, item)}
// 					label={item}
// 				/>
// 			))}
// 		</Grid>
// 	);
// };

interface Props {
	currencyCode: CurrencyCode;
	selectedTender: SelectedTender;
}

export const FormInput: React.FC<Props> = ({ currencyCode, selectedTender }) => {
	const currency = getCurrency(currencyCode);
	const preData = {
		bills: currency.cashTypes.bills,
		coins: currency.cashTypes.coins,
		rolls: Object.keys(currency.cashTypes.rolls)
	};

	const [formData, setFormData] = useState<Data>({} as Data);
	const [isCalculated, setIsCalculated] = useState<boolean>(false);
	const [totalAmount, setTotalAmount] = useState<number>(0);

	console.log(totalAmount);

	useEffect(() => {
		setFormData({} as Data);
	}, [currencyCode]);

	// Update formData based on selectedTender
	useEffect(() => {
		setFormData((prevData) => {
			const updatedData = { ...prevData };

			!selectedTender.bills && delete updatedData.bills;
			!selectedTender.coins && delete updatedData.coins;
			!selectedTender.rolls && delete updatedData.rolls;

			return updatedData;
		});
	}, [selectedTender]);

	console.log('formData: ', formData);

	const handleChange = (value: string, tender: Tender, type: string) => {
		updateFormData(tender, type, String(Number(value)));
	};

	const handleFocus = (tender: Tender, type: string) => {
		const value = formData.bills?.[type] ?? '';

		// If value is already 0, empty the input field
		isCalculated && value === '0' && updateFormData(tender, type, '');
	};

	const handleBlur = (tender: Tender, type: string) => {
		isCalculated && formData[tender]?.[type] === '' && updateFormData(tender, type, '0');
	};

	// Prevent characters like "e", ".", "-", "+" directly at the keypress level
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (['e', 'E', '-', '+', '.'].includes(e.key)) {
			e.preventDefault();
		}
	};

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
			selectedTender[key] &&
				preData[key].forEach((type) => {
					(data[key] ||= {})[type] = formData[key]?.[type] || '0';
				});
		});

		// 'rolls' in data && (data['rollsFaceValue'] = cashTypes.rolls);

		return data;
	};

	const handleSubmit = () => {
		const data = autoFillData();
		setFormData(data);
		setIsCalculated(true);
		setTotalAmount(calculateTotal(formData, currency));
	};

	const handleReset = (): void => {
		setFormData({} as Data);
		setIsCalculated(false);
	};

	const showBanknotesInput = () =>
		selectedTender.bills && (
			<Grid
				container
				spacing={2}
			>
				{currency.cashTypes.bills.map((bill) => (
					<TextField
						value={formData.bills?.[bill] ?? ''}
						key={bill}
						type='number'
						onChange={(e) => handleChange(e.target.value, 'bills', bill)}
						onFocus={() => handleFocus('bills', bill)}
						onBlur={() => handleBlur('bills', bill)}
						onKeyDown={handleKeyDown}
						label={bill}
					/>
				))}
			</Grid>
		);

	const showCoinsInput = () =>
		selectedTender.coins && (
			<Grid
				container
				spacing={2}
			>
				{currency.cashTypes.coins.map((coin) => (
					<TextField
						value={formData.coins?.[coin] ?? ''}
						key={coin}
						type='number'
						onChange={(e) => handleChange(e.target.value, 'coins', coin)}
						onFocus={() => handleFocus('coins', coin)}
						onBlur={() => handleBlur('coins', coin)}
						label={coin}
					/>
				))}
			</Grid>
		);

	const showRollsInput = () =>
		selectedTender.rolls && (
			<Grid
				container
				spacing={2}
			>
				{Object.keys(currency.cashTypes.rolls).map((roll) => (
					<TextField
						value={formData.rolls?.[roll] ?? ''}
						key={roll}
						type='number'
						onChange={(e) => handleChange(e.target.value, 'rolls', roll)}
						onFocus={() => handleFocus('rolls', roll)}
						onBlur={() => handleBlur('rolls', roll)}
						label={roll}
					/>
				))}
			</Grid>
		);

	return (
		<>
			<Stack>
				{showBanknotesInput()}
				{showCoinsInput()}
				{showRollsInput()}
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
