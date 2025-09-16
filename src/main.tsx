// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './styles/theme';
import { App } from './App';
import './assets/fonts/fonts.css';

createRoot(document.getElementById('root')!).render(
	// <StrictMode>
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<App />
	</ThemeProvider>
	// </StrictMode>
);
