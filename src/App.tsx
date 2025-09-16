import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EntryPage } from './pages/EntryPage/EntryPage.tsx';
import { SummaryPage } from './pages/Summary/SummaryPage.tsx';

export const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<EntryPage />}
				/>
				<Route
					path='/summary'
					element={<SummaryPage />}
				/>
			</Routes>
		</Router>
	);
};
