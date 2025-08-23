import './assets/fonts/fonts.css';
import { TenderCountContainer } from './components/TenderCountContainer/TenderCountContainer.tsx';
import { Config } from './components/Config/Config.tsx';
import { useSelectedTender } from './stores/tillStore.ts';

export const App: React.FC = () => {
	const selectedTender = useSelectedTender();

	return (
		<>
			<Config />
			{selectedTender.includes('bills') && <TenderCountContainer tenderType='bills' />}
			{selectedTender.includes('coins') && <TenderCountContainer tenderType='coins' />}
			{selectedTender.includes('rolls') && <TenderCountContainer tenderType='rolls' />}
		</>
	);
};
