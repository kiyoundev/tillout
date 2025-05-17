// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
	// <StrictMode>
	<ThemeProvider
		theme={theme}
		defaultMode='light'
	>
		<CssBaseline enableColorScheme />
		<App />
	</ThemeProvider>
	// </StrictMode>
);

// export const Form = () => {
//     return (
//         <ThemeProvider theme={theme} defaultMode='light'>
//             <CssBaseline enableColorScheme/>
//                 {/* <CurrencySelect/> */}
//                 <CurrencySelect2/>
//                 <Options/>
//                 <MainInput/>
//                 {/* <Test/> */}
//         </ThemeProvider>
//     )
// }
