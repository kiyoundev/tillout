import '@/assets/fonts/fonts.css';
import { TenderCountContainer } from '@/features/entry/components/TenderCountContainer/TenderCountContainer';
import { ConfigSection } from '@/features/entry/components/ConfigSection/ConfigSection';
import { useSelectedTender, useOpeningBalance, useTotalSales } from '@/stores/tillStore';
import { Stack } from '@mui/material';
import { ActionButtons } from '@/components/ActionButtons/ActionButtons';
import { UICONSTANTS } from '@/styles/UIConstants';

export const EntryPage: React.FC = () => {
	const selectedTender = useSelectedTender();
	const openingBalance = useOpeningBalance();
	const totalSales = useTotalSales();

	const isConfigComplete = selectedTender.length > 0 && openingBalance !== undefined && totalSales !== undefined;

	return (
		<Stack
			p={{ xxs: UICONSTANTS.EntryPage.padding_xs, md: UICONSTANTS.EntryPage.padding_md, lg: UICONSTANTS.EntryPage.padding }}
			spacing={UICONSTANTS.EntryPage.spacing}
		>
			<ConfigSection />

			{isConfigComplete && (
				<>
					{selectedTender.includes('bills') && <TenderCountContainer tenderType='bills' />}
					{selectedTender.includes('coins') && <TenderCountContainer tenderType='coins' />}
					{selectedTender.includes('rolls') && <TenderCountContainer tenderType='rolls' />}

					<ActionButtons page='entry' />
				</>
			)}
		</Stack>
	);
};
