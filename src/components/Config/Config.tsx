import Grid from '@mui/material/Grid'; // Grid version 2
import { AmountField, AmountFieldProps } from '../AmountField/AmountField';
import { CurrencySelect, CurrencySelectProps } from '../CurrencySelect/CurrencySelect';
import { ConfigSection } from '../ConfigSection/ConfigSection';
import { PaperContainer } from '../Styled/PaperContainer';
import { TenderSelect, TenderSelectProps } from '../TenderSelect/TenderSelect';

export type ConfigProps = {
	currencyCode: CurrencySelectProps['currencyCode'];
	onCurrencyChange: CurrencySelectProps['onCurrencyChange'];
	selectedTender: TenderSelectProps['selectedTender'];
	onTenderChange: TenderSelectProps['onTenderChange'];
	openingBalance: AmountFieldProps['value'];
	onOpeningBalanceChange: AmountFieldProps['onValueChange'];
	totalSales: AmountFieldProps['value'];
	onTotalSalesChange: AmountFieldProps['onValueChange'];
};

export const Config = ({
	currencyCode,
	onCurrencyChange,
	selectedTender,
	onTenderChange,
	openingBalance,
	onOpeningBalanceChange,
	totalSales,
	onTotalSalesChange
}: ConfigProps) => (
	<PaperContainer>
		<Grid
			container
			spacing={3}
		>
			<ConfigSection title='CURRENCY'>
				<CurrencySelect
					currencyCode={currencyCode}
					onCurrencyChange={onCurrencyChange}
				/>
			</ConfigSection>
			<ConfigSection title='TENDER'>
				<TenderSelect
					selectedTender={selectedTender}
					onTenderChange={onTenderChange}
				/>
			</ConfigSection>
			<ConfigSection
				title='OPENING BALANCE'
				showIcon
				tooltipText='The starting cash float for the register, to be used during the next day’s operations.'
			>
				<AmountField
					currencyCode={currencyCode}
					value={openingBalance}
					onValueChange={onOpeningBalanceChange}
					helperText='Enter Opening Balance'
				/>
			</ConfigSection>
			<ConfigSection
				title='TOTAL SALES'
				showIcon
				tooltipText='The expected total cash sales recorded by the POS system for the day.'
			>
				<AmountField
					currencyCode={currencyCode}
					value={totalSales}
					onValueChange={onTotalSalesChange}
					helperText='Enter Total Sales Amount'
				/>
			</ConfigSection>
		</Grid>
	</PaperContainer>
);
