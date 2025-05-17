import { createTheme } from '@mui/material/styles';
// import Helvetica from "../assets/fonts/Helvetica.ttf";
// import Helvetica from "../assets/fonts/Helvetica.woff2";
// import HelveticaNeue from "../assets/fonts/HelveticaNeue.ttf";
// import HelveticaNeue from "../assets/fonts/HelveticaNeue.woff2";

// const defaultTheme = createTheme();

// Add custom palette properties
declare module '@mui/material/styles' {
	interface Palette {
		input: {
			outlinedEnabledBorder: string;
			outlinedHoveredBorder: string;
			outlinedFocusedBorder: string;
		};
	}
	interface PaletteOptions {
		input?: {
			outlinedEnabledBorder?: string;
			outlinedHoveredBorder?: string;
			outlinedFocusedBorder?: string;
		};
	}
	interface TypographyVariants {
		inputValue: React.CSSProperties;
	}
	interface TypographyVariantsOptions {
		inputValue?: React.CSSProperties;
	}
}

// // Define custom colors
// const colors = {
// 	primary: {
// 		main: "#1976d2",
// 		light: "#42a5f5",
// 		dark: "#1565c0",
// 		contrastText: "#fff",
// 	},
// 	secondary: {
// 		main: "#9c27b0",
// 		light: "#ba68c8",
// 		dark: "#7b1fa2",
// 		contrastText: "#fff",
// 	},
// 	error: {
// 		main: "#d32f2f",
// 		light: "#ef5350",
// 		dark: "#c62828",
// 		contrastText: "#fff",
// 	},
// 	warning: {
// 		main: "#ed6c02",
// 		light: "#ff9800",
// 		dark: "#e65100",
// 		contrastText: "#fff",
// 	},
// 	info: {
// 		main: "#0288d1",
// 		light: "#03a9f4",
// 		dark: "#01579b",
// 		contrastText: "#fff",
// 	},
// 	success: {
// 		main: "#2e7d32",
// 		light: "#4caf50",
// 		dark: "#1b5e20",
// 		contrastText: "#fff",
// 	},
// };

// Create theme
export const theme = createTheme({
	// palette: {
	// 	primary: colors.primary,
	// 	secondary: colors.secondary,
	// 	error: colors.error,
	// 	warning: colors.warning,
	// 	info: colors.info,
	// 	success: colors.success,
	// },
	palette: {
		mode: 'light',
		background: {
			paper: 'rgba(255, 255, 255, 1)',
			default: '#fff'
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.6)'
		},
		input: {
			outlinedEnabledBorder: '#E2E2E2',
			outlinedHoveredBorder: '#989898',
			outlinedFocusedBorder: '#121212'
		}
	},
	// typography: {
	// 	fontFamily: [
	// 		"-apple-system",
	// 		"BlinkMacSystemFont",
	// 		'"Segoe UI"',
	// 		"Roboto",
	// 		'"Helvetica Neue"',
	// 		"Arial",
	// 		"sans-serif",
	// 	].join(","),
	// },
	// shadows: {
	// 	elevation: {
	// 		custom:
	// 			"0px 2px 5px -1px rgba(0, 0, 0, 0.1), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
	// 	},
	// },
	// default border radius: 4px
	// shape: {
	// 	borderRadius: 4,
	// },
	components: {
		MuiTextField: {
			defaultProps: {
				variant: 'outlined'
			},
			styleOverrides: {
				root: ({ theme }) => ({
					'& label.Mui-focused': {
						color: theme.palette.text.secondary
					}
				})
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: ({ theme }) => ({
					// borderRadius: theme.shape.borderRadius,
					borderRadius: 4,
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.input.outlinedEnabledBorder
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.input.outlinedHoveredBorder
					},
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.input.outlinedFocusedBorder,
						borderWidth: '1.4px',
						boxShadow: '0px 2px 5px -1px rgba(0, 0, 0, 0.1), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)'
					}
				})
			}
		}
	}
});
