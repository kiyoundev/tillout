import Grid from '@mui/material/Grid';
import { AmountField } from '@/components/AmountField/AmountField';
import { CurrencySelect } from '@/components/CurrencySelect/CurrencySelect';
import { ConfigComponent } from '@/features/entry/components/ConfigComponent/ConfigComponent';
import { PaperContainer } from '@/components/Styled/PaperContainer';
import { TenderSelect } from '@/components/TenderSelect/TenderSelect';
import { useTillActions, useOpeningBalance, useTotalSales } from '@/stores/tillStore';
import { UICONSTANTS } from '@/styles/UIConstants';

export const ConfigSection = () => {
	const openingBalance = useOpeningBalance();
	const totalSales = useTotalSales();
	const { updateOpeningBalance, updateTotalSales } = useTillActions();

	return (
		<PaperContainer>
			<Grid
				container
				rowSpacing={{ xxs: UICONSTANTS.ConfigSection.spacing_xs, sm: UICONSTANTS.ConfigSection.spacing }}
				columnSpacing={UICONSTANTS.ConfigSection.spacing}
			>
				<ConfigComponent title='CURRENCY'>
					<CurrencySelect />
				</ConfigComponent>
				<ConfigComponent title='TENDER'>
					<TenderSelect />
				</ConfigComponent>
				<ConfigComponent
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
				</ConfigComponent>
				<ConfigComponent
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
				</ConfigComponent>
			</Grid>
		</PaperContainer>
	);
};
