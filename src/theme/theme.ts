import { createTheme, Shadows } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Palette {
		input: {
			outlinedEnabledBorder: string;
			outlinedHoveredBorder: string;
			outlinedFocusedBorder: string;
		};
		PaperContainer: {
			background: string;
			border: string;
		};
	}

	interface PaletteOptions {
		input?: {
			outlinedEnabledBorder?: string;
			outlinedHoveredBorder?: string;
			outlinedFocusedBorder?: string;
		};
		PaperContainer?: {
			background?: string;
			border?: string;
		};
	}

	interface Theme {
		customBorders: {
			focusedBorderWidth: string;
		};
	}

	interface ThemeOptions {
		customBorders?: {
			focusedBorderWidth?: string;
		};
	}
}

export const theme = createTheme({
	palette: {
		mode: 'light',
		background: {
			default: '#FFFFFF'
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.6)'
		},
		input: {
			outlinedEnabledBorder: '#E2E2E2',
			outlinedHoveredBorder: '#BDBDBD',
			outlinedFocusedBorder: '#000000'
		},
		PaperContainer: {
			background: '#FAFAFA',
			border: ' #E8EDED'
		}
	},
	customBorders: {
		focusedBorderWidth: '1.35px'
	},
	shape: {
		borderRadius: 4
	},
	shadows: [...Array(24).fill('none'), '0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 5px -1px rgba(0, 0, 0, 0.10)'] as Shadows,
	components: {
		MuiTextField: {
			defaultProps: {
				variant: 'outlined'
			},
			styleOverrides: {
				root: ({ theme }) => ({
					'& label.Mui-focused': {
						color: theme.palette.input.outlinedFocusedBorder
					}
				})
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: ({ theme }) => ({
					borderRadius: theme.shape.borderRadius,
					backgroundColor: theme.palette.background.default,
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.input.outlinedEnabledBorder
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.input.outlinedHoveredBorder
					},
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.input.outlinedFocusedBorder,
						borderWidth: theme.customBorders.focusedBorderWidth,
						boxShadow: theme.shadows[24]
					}
				})
			}
		},
		MuiDivider: {
			styleOverrides: {
				root: ({ theme }) => ({
					backgroundColor: theme.palette.input.outlinedEnabledBorder
				})
			}
		}
		// MuiButton: {
		// 	// styleOverrides: {
		// 	// 	root: ({ theme }) => ({
		// 	// 		backgroundColor: theme.palette.primary.main,
		// 	// 		color: theme.palette.primary.contrastText
		// 	// 	})
		// 	// },
		// 	variants: [
		// 		{
		// 			// Define the props that trigger this variant
		// 			props: { variant: 'primary' },
		// 			// Define the style for this variant
		// 			style: {
		// 				backgroundColor: '#d32f2f', // A danger red
		// 				color: '#fff',
		// 				'&:hover': {
		// 					backgroundColor: '#c62828'
		// 				}
		// 			}
		// 		}
		// 	]
		// }
	}
});
