import Grid from '@mui/material/Grid'; // Grid version 2
import { AmountField } from '../AmountField/AmountField';
import { CurrencySelect } from '../CurrencySelect/CurrencySelect';
import { ConfigSection } from '../ConfigSection/ConfigSection';
import { PaperContainer } from '../Styled/PaperContainer';
import { TenderSelect } from '../TenderSelect/TenderSelect';

import { useTillActions, useOpeningBalance, useTotalSales } from '../../stores/tillStore';

export const Config = () => {
	const openingBalance = useOpeningBalance();
	const totalSales = useTotalSales();
	const { updateOpeningBalance, updateTotalSales } = useTillActions();

	return (
		<PaperContainer>
			<Grid
				container
				spacing={3}
			>
				<ConfigSection title='CURRENCY'>
					<CurrencySelect />
				</ConfigSection>
				<ConfigSection title='TENDER'>
					<TenderSelect />
				</ConfigSection>
				<ConfigSection
					title='OPENING BALANCE'
					showIcon
					tooltipText='The starting cash float for the register, to be used during the next day’s operations.'
					data-testid='opening-balance-section'
				>
					<AmountField
						value={openingBalance}
						onValueChange={(value) => updateOpeningBalance(value)}
						helperText='Enter Opening Balance'
					/>
				</ConfigSection>
				<ConfigSection
					title='TOTAL SALES'
					showIcon
					tooltipText='The expected total cash sales recorded by the POS system for the day.'
					data-testid='total-sales-section'
				>
					<AmountField
						value={totalSales}
						onValueChange={(value) => updateTotalSales(value)}
						helperText='Enter Total Sales Amount'
					/>
				</ConfigSection>
			</Grid>
		</PaperContainer>
	);
};
