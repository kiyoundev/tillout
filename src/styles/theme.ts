import { createTheme, Shadows, PaletteMode, ShapeOptions } from '@mui/material/styles';

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		heading_semibold: true;
		heading_secondary: true;
		body_breakdown: true;
		bodyMono: true;
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		primary: true;
		secondary: true;
	}
}

declare module '@mui/material/styles' {
	interface TypeText {
		gray: string;
	}

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
		buttonBackground: {
			primary: string;
			secondary: string;
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
		buttonBackground?: {
			primary?: string;
			secondary?: string;
		};
	}

	interface Theme {
		customBorders: {
			focusedBorderWidth: string;
		};
		shape: Shape;
	}

	interface ThemeOptions {
		customBorders?: {
			focusedBorderWidth?: string;
		};
		shape?: ShapeOptions;
	}

	interface TypographyVariants {
		heading_semibold: React.CSSProperties;
		bodyMono: React.CSSProperties;
		heading_secondary: React.CSSProperties;
		body_breakdown: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		heading_semibold?: React.CSSProperties;
		bodyMono?: React.CSSProperties;
		heading_secondary?: React.CSSProperties;
		body_breakdown?: React.CSSProperties;
	}

	interface Shape {
		borderRadius: number;
		buttonRadius: number;
	}

	interface ShapeOptions {
		borderRadius?: number;
		buttonRadius?: number;
	}
}

export const palette = {
	mode: 'light' as PaletteMode,
	background: {
		default: '#FFFFFF'
	},
	text: {
		primary: 'rgba(0, 0, 0, 0.87)',
		secondary: 'rgba(0, 0, 0, 0.6)',
		gray: '#7F7F7F'
	},
	input: {
		outlinedEnabledBorder: '#E2E2E2',
		outlinedHoveredBorder: '#BDBDBD',
		outlinedFocusedBorder: '#000000'
	},
	PaperContainer: {
		background: '#FAFAFA',
		border: ' #E8EDED'
	},
	buttonBackground: {
		primary: '#000000',
		secondary: '#FAFAFA'
	}
};

const shape: ShapeOptions = {
	borderRadius: 4,
	buttonRadius: 100
};

const baseTheme = createTheme();
const newShadows = [...baseTheme.shadows];
newShadows[24] = '0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 5px -1px rgba(0, 0, 0, 0.10)';

export const theme = createTheme({
	typography: {
		fontFamily: '"SF Pro Display", "Helvetica", "Arial", sans-serif',
		heading_semibold: {
			fontFamily: '"SF Pro Display", "Helvetica", "Arial", sans-serif',
			fontWeight: 600, // Semibold
			fontSize: '30px',
			letterSpacing: '-0.5px',
			lineHeight: '18px',
			color: palette.text.primary
		},
		heading_secondary: {
			fontFamily: '"SF Pro Display", "Helvetica", "Arial", sans-serif',
			fontWeight: 500, // Medium
			fontSize: '20px',
			letterSpacing: '-0.5px',
			lineHeight: '18px',
			color: palette.text.primary
		},
		body_breakdown: {
			fontFamily: '"SF Pro Display", "Helvetica", "Arial", sans-serif',
			fontWeight: 400, // Regular
			fontSize: '20px',
			letterSpacing: '-0.5px',
			lineHeight: '18px',
			color: palette.text.primary
		}
	},
	palette,
	customBorders: {
		focusedBorderWidth: '1.35px'
	},
	shape,
	shadows: newShadows as Shadows,
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
		},
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true
			}
		},
		MuiButton: {
			defaultProps: {
				variant: 'outlined',
				size: 'large' // Set large as the default size
			},
			styleOverrides: {
				root: ({ ownerState, theme }) => ({
					borderRadius: theme.shape.buttonRadius,
					fontFamily: '"SF Pro Text", "Helvetica", "Arial", sans-serif',
					fontSize: '16px',
					letterSpacing: '-0.5px',
					lineHeight: '18px',
					textTransform: 'none', // Prevent uppercase styling
					// Conditionally apply styles based on the size prop
					...(ownerState.size === 'large' && {
						padding: '8px 22px'
					})
				}),
				startIcon: {
					marginRight: '3px' // Adjust the spacing here
				},
				endIcon: {
					marginLeft: '6px' // Adjust the spacing here
				}
			},
			variants: [
				// primary action buttons - calculate or export/print
				{
					props: { variant: 'primary' },
					style: ({ theme }) => ({
						backgroundColor: theme.palette.buttonBackground.primary,
						color: theme.palette.getContrastText(theme.palette.buttonBackground.primary)
					})
				},
				// secondary action buttons - edit or reset counts
				{
					props: { variant: 'secondary' },
					style: ({ theme }) => ({
						backgroundColor: theme.palette.buttonBackground.secondary,
						color: theme.palette.getContrastText(theme.palette.buttonBackground.secondary),
						border: `1px solid ${theme.palette.input.outlinedEnabledBorder}`
					})
				}
			]
		}
	}
});
