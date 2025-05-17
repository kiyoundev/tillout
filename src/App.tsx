import './assets/fonts/fonts.css';
// import { CurrencySelect } from "./components/CurrencySelect.tsx";
import { TenderSelect } from './components/TenderSelect.tsx';
// import { OpeningBalanceInput } from './components/OpeningBalanceInput.tsx';
// import { SalesAmountInput } from './components/SalesAmountInput.tsx';
import { FormInput } from './components/FormInput.tsx';
import { SelectedTender, CurrencyCode } from './types/index.ts';
import React, { useState } from 'react';
import { Stack } from '@mui/material';

// export const App: React.FC = () => {
// 	const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('us');
// 	const [selectedTender, setSelectedTender] = useState<SelectedTender>({
// 		bills: true,
// 		coins: false,
// 		rolls: false
// 	});

// 	return (
// 		<>
// 			<Stack>
// 				<CurrencySelect
// 					currencyCode={currencyCode}
// 					setCurrencyCode={setCurrencyCode}
// 				/>
// 			</Stack>
// 			<Stack>
// 				<TenderSelect
// 					selectedTender={selectedTender}
// 					setSelectedTender={setSelectedTender}
// 				/>
// 			</Stack>
// 			<Stack>
// 				<FormInput
// 					currencyCode={currencyCode}
// 					selectedTender={selectedTender}
// 				/>
// 			</Stack>
// 		</>
// 	);
// };

import { CurrencySelect } from '../src/components/CurrencySelect/CurrencySelect.tsx';

export const App: React.FC = () => {
	const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('us');

	return (
		<CurrencySelect
			currencyCode={currencyCode}
			onCurrencyChange={(currencyCode) => setCurrencyCode(currencyCode)}
		/>
	);
};
