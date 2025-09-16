import '@/assets/fonts/fonts.css';
import { TenderCountContainer } from '@/features/entry/components/TenderCountContainer/TenderCountContainer';
import { Config } from '@/features/entry/components/Config/Config';
import { useSelectedTender, useOpeningBalance, useTotalSales, useResetCount } from '@/stores/tillStore';
import { Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const EntryPage: React.FC = () => {
	const selectedTender = useSelectedTender();
	const openingBalance = useOpeningBalance();
	const totalSales = useTotalSales();
	const resetCount = useResetCount();
	const navigate = useNavigate();

	const isConfigComplete = selectedTender.length > 0 && openingBalance !== undefined && totalSales !== undefined;

	return (
		<Stack
			p={4}
			spacing={3.5}
		>
			<Config />

			{isConfigComplete && (
				<>
					{selectedTender.includes('bills') && <TenderCountContainer tenderType='bills' />}
					{selectedTender.includes('coins') && <TenderCountContainer tenderType='coins' />}
					{selectedTender.includes('rolls') && <TenderCountContainer tenderType='rolls' />}

					<Stack
						direction='row'
						spacing={2.5}
						justifyContent='flex-end'
					>
						<Button
							variant='secondary'
							onClick={resetCount}
						>
							Reset
						</Button>
						<Button
							variant='primary'
							onClick={() => navigate('/summary')}
						>
							Calculate
						</Button>
					</Stack>
				</>
			)}
		</Stack>
	);
};
