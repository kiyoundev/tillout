import { CurrencySelect } from './components/CurrencySelect.tsx'
import { CashOptions } from './components/CashOptions.tsx'
import { MainInput } from './components/MainInput.tsx'
import { FormInput } from './components/FormInput.tsx'
import { currencies, Currency } from './assets/currencies.ts'
import { useState } from 'react'
import { Stack } from '@mui/material'

export const App = () : JSX.Element => {
    const [currency, setCurrency] = useState<Currency>(currencies[0]);

    // const handleCurrencyChange = () => {
    //     console.log('handleCurrencyChange');
    // }


    return (
        <>
        <Stack>
            <CurrencySelect currency={currency} onCurrencyChange={setCurrency}/>
            {/* <MainInput currency={currency}/> */}
            {/* <CashOptions/> */}
        </Stack>
        {/* <Stack>
            <FormInput selectedCurrency={selectedCurrency} cashOptions={cashOptions} />
        </Stack> */}
        </>
    );
}