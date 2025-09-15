import './assets/fonts/fonts.css';
import { TenderCountContainer } from './components/TenderCountContainer/TenderCountContainer.tsx';
import { Config } from './components/Config/Config.tsx';
import { useCounts, useSelectedTender, useCurrencyCode, useOpeningBalance, useTotalSales } from './stores/tillStore.ts';
import { Stack, Button } from '@mui/material';

export const App: React.FC = () => {
	const selectedTender = useSelectedTender();
	const counts = useCounts();
	const currencyCode = useCurrencyCode();
	const openingBalance = useOpeningBalance();
	const totalSales = useTotalSales();

	// const total = calculateTotal(counts, currencyCode);
	// const variance = calculateVariance(total, openingBalance, totalSales);

	return (
		<>
			<Config />
			{selectedTender.includes('bills') && <TenderCountContainer tenderType='bills' />}
			{selectedTender.includes('coins') && <TenderCountContainer tenderType='coins' />}
			{selectedTender.includes('rolls') && <TenderCountContainer tenderType='rolls' />}
			{/* <VarianceDial variance={variance} /> */}

			{/* <Summary /> */}

			<Stack
				direction='row'
				spacing={2.5}
				justifyContent='flex-end'
			>
				<Button
					variant='secondary'
					// startIcon={<KeyboardBackspaceOutlinedIcon />}
				>
					Reset
				</Button>
				{/* <Button
						variant='primary'
						endIcon={<FileUploadOutlinedIcon />}
					>
						Export
					</Button> */}
			</Stack>
		</>
	);
};
