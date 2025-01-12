import { CurrencySelect } from './components/CurrencySelect.tsx';
import { CashOptionSelect } from './components/CashOptionSelect.tsx';
import { OpeningBalance } from './components/OpeningBalance.tsx';
import { FormInput } from './components/FormInput.tsx';
import { currencies } from './assets/currencies.ts';
import { Currency, SelectedCashOption } from './types/index.ts';
import React, { useState } from 'react';
import { Stack } from '@mui/material';

export const App: React.FC = () => {
	const [currency, setCurrency] = useState<Currency>(currencies[0]);
	const [selectedCashOption, setSelectedCashOption] = useState<SelectedCashOption>({
		bills: true,
		coins: false,
		rolls: false
	});

	return (
		<>
			<Stack>
				<CurrencySelect
					currency={currency}
					onCurrencyChange={setCurrency}
				/>
				<OpeningBalance currency={currency} />
				<CashOptionSelect
					selectedCashOption={selectedCashOption}
					onCashOptionChange={setSelectedCashOption}
				/>
			</Stack>
			<Stack>
				<FormInput
					cashTypes={currency.cashTypes}
					symbol={currency.symbol}
					selectedCashOption={selectedCashOption}
				/>
			</Stack>
		</>
	);
};
