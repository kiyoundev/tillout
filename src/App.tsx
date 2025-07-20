import './assets/fonts/fonts.css';
import { useState } from 'react';
import { CurrencySelect } from './components/CurrencySelect/CurrencySelect.tsx';
import { TenderSelect } from './components/TenderSelect/TenderSelect.tsx';
import { TenderType } from './types/index.ts';
import { AmountField } from './components/AmountField/AmountField.tsx';
import { TenderCountContainer } from './components/TenderCountContainer/TenderCountContainer.tsx';
import { type CurrencyCode, type Counts } from './types/index.ts';

export const App: React.FC = () => {
	const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('us');
	const [selectedTender, setSelectedTender] = useState<TenderType[]>([]);
	const [openingBalance, setOpeningBalance] = useState<number | undefined>();
	const [salesAmount, setSalesAmount] = useState<number | undefined>();
	const [counts, setCounts] = useState<Counts>({
		bills: {},
		coins: {},
		rolls: {}
	});

	console.log(
		`Currency Code: ${currencyCode}\nSelected Tender: ${selectedTender}\nOpening Balance: ${openingBalance}\nSales Amount: ${salesAmount}\nCounts: ${JSON.stringify(
			counts
		)}`
	);

	const handleDataChange = (denomination: string, count: number | undefined, tenderType: TenderType) => {
		setCounts((prevCounts) => ({
			...prevCounts,
			[tenderType]: {
				...prevCounts[tenderType],
				[denomination]: count
			}
		}));
	};

	return (
		<>
			<CurrencySelect
				currencyCode={currencyCode}
				onCurrencyChange={(currencyCode) => setCurrencyCode(currencyCode)}
			/>
			<TenderSelect
				selectedTender={selectedTender}
				onTenderChange={(selectedTender) => setSelectedTender(selectedTender)}
			/>
			{/* Opening Balance */}
			<AmountField
				currencyCode={currencyCode}
				value={openingBalance}
				onValueChange={({ floatValue }) => setOpeningBalance(floatValue)}
				label='Opening Balance'
				helperText='Enter Opening Balance'
			/>
			{/* Sales Amount */}
			<AmountField
				currencyCode={currencyCode}
				label='Sales Amount'
				value={salesAmount}
				onValueChange={({ floatValue }) => setSalesAmount(floatValue)}
				helperText='Enter Sales Amount'
			/>

			{/* Tender Count */}

			{/* Bills */}
			{selectedTender.includes('bills') && (
				<TenderCountContainer
					currencyCode={currencyCode}
					tenderType='bills'
					counts={counts}
					onDataChange={(denomination, count, tenderType) => handleDataChange(denomination, count, tenderType)}
				/>
			)}

			{/* Coins */}
			{selectedTender.includes('coins') && (
				<TenderCountContainer
					currencyCode={currencyCode}
					tenderType='coins'
					counts={counts}
					onDataChange={(denomination, count, tenderType) => handleDataChange(denomination, count, tenderType)}
				/>
			)}

			{/* Rolls */}
			{selectedTender.includes('rolls') && (
				<TenderCountContainer
					currencyCode={currencyCode}
					tenderType='rolls'
					counts={counts}
					onDataChange={(denomination, count, tenderType) => handleDataChange(denomination, count, tenderType)}
				/>
			)}
		</>
	);
};
