import type { Preview } from "@storybook/react";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";

// import { lightTheme, darkTheme } from '../path/to/themes';
import { theme } from "../src/theme/theme";

// const preview: Preview = {
// 	parameters: {
// 		controls: {
// 			matchers: {
// 				color: /(background|color)$/i,
// 				date: /Date$/i,
// 			},
// 		},
// 	},
// 	decorators: [
// 		withThemeFromJSXProvider({
// 			GlobalStyles: CssBaseline,
// 			Provider: ThemeProvider,
// 			themes: {
// 				// Provide your custom themes here
// 				light: theme,
// 				dark: theme,
// 			},
// 			defaultTheme: "light",
// 		}),
// 	],
// };

// export default preview;

export const decorators = [
	withThemeFromJSXProvider({
		themes: {
			light: theme,
			dark: theme,
		},
		defaultTheme: "light",
		Provider: ThemeProvider,
		GlobalStyles: CssBaseline,
	}),
];

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		expanded: true, // Adds the description and default columns
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
