import './assets/fonts/fonts.css';
import { useState } from 'react';
import { TenderCountContainer } from './components/TenderCountContainer/TenderCountContainer.tsx';
import { type CurrencyCode, type Counts, type TenderType } from './types/index.ts';
import { Config } from './components/Config/Config.tsx';

export const App: React.FC = () => {
	const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('us');
	const [selectedTender, setSelectedTender] = useState<TenderType[]>([]);
	const [openingBalance, setOpeningBalance] = useState<number | undefined>();
	const [totalSales, setTotalSales] = useState<number | undefined>();
	const [counts, setCounts] = useState<Counts>({
		bills: {},
		coins: {},
		rolls: {}
	});

	console.log(
		`Currency Code: ${currencyCode}\nSelected Tender: ${selectedTender}\nOpening Balance: ${openingBalance}\nTotal Sales: ${totalSales}\nCounts: ${JSON.stringify(
			counts
		)}`
	);

	const handleDataChange = (denomination: string, count: number | undefined, tenderType: TenderType) => {
		setCounts((prevCounts) => ({
			...prevCounts,
			[tenderType]: {
				...prevCounts[tenderType],
				[denomination]: count
			}
		}));
	};

	return (
		<>
			<Config
				currencyCode={currencyCode}
				onCurrencyChange={setCurrencyCode}
				selectedTender={selectedTender}
				onTenderChange={setSelectedTender}
				openingBalance={openingBalance}
				onOpeningBalanceChange={setOpeningBalance}
				totalSales={totalSales}
				onTotalSalesChange={setTotalSales}
			/>
			{selectedTender.includes('bills') && (
				<TenderCountContainer
					currencyCode={currencyCode}
					tenderType='bills'
					counts={counts}
					onDataChange={handleDataChange}
				/>
			)}
			{selectedTender.includes('coins') && (
				<TenderCountContainer
					currencyCode={currencyCode}
					tenderType='coins'
					counts={counts}
					onDataChange={handleDataChange}
				/>
			)}
			{selectedTender.includes('rolls') && (
				<TenderCountContainer
					currencyCode={currencyCode}
					tenderType='rolls'
					counts={counts}
					onDataChange={handleDataChange}
				/>
			)}
		</>
	);
};
