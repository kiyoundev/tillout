import Grid from '@mui/material/Grid';
import { AmountField } from '@/components/AmountField/AmountField';
import { CurrencySelect } from '@/components/CurrencySelect/CurrencySelect';
import { ConfigSection } from '@/features/entry/components/ConfigSection/ConfigSection';
import { PaperContainer } from '@/components/Styled/PaperContainer';
import { TenderSelect } from '@/components/TenderSelect/TenderSelect';

import { useTillActions, useOpeningBalance, useTotalSales } from '@/stores/tillStore';

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
