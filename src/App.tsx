import './assets/fonts/fonts.css';
import { useState } from 'react';
import { CurrencySelect } from './components/CurrencySelect/CurrencySelect.tsx';
import { TenderSelect } from './components/TenderSelect/TenderSelect.tsx';
import { Tender } from './types/index.ts';
import { AmountField } from './components/AmountField/AmountField.tsx';
import { type CurrencyCode } from './types/index.ts';

export const App: React.FC = () => {
	const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('us');
	const [selectedTender, setSelectedTender] = useState<Tender[]>([]);
	const [openingBalance, setOpeningBalance] = useState<number | undefined>();
	const [salesAmount, setSalesAmount] = useState<number | undefined>();

	console.log(openingBalance);

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
		</>
	);
};
