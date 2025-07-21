import { ThemeProvider, CssBaseline } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { theme } from '../src/theme/theme';

export const decorators = [
	withThemeFromJSXProvider({
		themes: {
			light: theme,
			dark: theme
		},
		defaultTheme: 'light',
		Provider: ThemeProvider,
		GlobalStyles: CssBaseline
	})
];

export const parameters = {
	controls: {
		expanded: true, // Adds the description and default columns
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	}
};
