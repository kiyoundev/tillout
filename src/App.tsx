import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { EntryPage } from './pages/EntryPage/EntryPage.tsx';
import { SummaryPage } from './pages/Summary/SummaryPage.tsx';

import { useBreakpoint } from './hooks/useBreakpoint.ts';

// export const App: React.FC = () => (
// 	<Box sx={{ minWidth: 320 }}>
// 		<Router>
// 			<Routes>
// 				<Route
// 					path='/'
// 					element={<EntryPage />}
// 				/>
// 				<Route
// 					path='/summary'
// 					element={<SummaryPage />}
// 				/>
// 			</Routes>
// 		</Router>
// 	</Box>
// );

export const App: React.FC = () => {
	const breakpoint = useBreakpoint();
	console.log(breakpoint);
	return (
		<Box sx={{ minWidth: 320 }}>
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
		</Box>
	);
};
