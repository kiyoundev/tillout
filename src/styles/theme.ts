import { createTheme, Shadows, PaletteMode, ShapeOptions } from '@mui/material/styles';
import { FONTSIZE } from './UIConstants';

// Create a type for the variant names we want to expose, excluding the responsive '_xs' keys
type MainTypographyVariants = Omit<
	typeof FONTSIZE,
	'sectionTitle_xs' | 'buttonLabel_xs' | 'tenderCountTitle_xs' | 'varianceDialLabel_xs' | 'dateTimeLabel_xs'
>;

// Type for defining the style properties for each variant
type CustomTypographyVariants = {
	[K in keyof MainTypographyVariants]: React.CSSProperties;
};

// Type for augmenting MUI's allowed variant props
type CustomTypographyPropsVariantOverrides = {
	[K in keyof MainTypographyVariants]: true;
};

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides extends CustomTypographyPropsVariantOverrides {}
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

	interface TypographyVariants extends CustomTypographyVariants {}
	interface TypographyVariantsOptions extends CustomTypographyVariants {}

	interface Shape {
		borderRadius: number;
		buttonRadius: number;
	}

	interface ShapeOptions {
		borderRadius?: number;
		buttonRadius?: number;
	}
}

const baseTheme = createTheme();

// palette
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

// shape: borderRadius
const shape: ShapeOptions = {
	borderRadius: 4,
	buttonRadius: 100
};

// shadows
const newShadows = [...baseTheme.shadows];
newShadows[24] = '0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 5px -1px rgba(0, 0, 0, 0.10)';

export const theme = createTheme({
	typography: {
		fontFamily: '"SF Pro Text", "Helvetica", "Arial", sans-serif',

		heading_semibold: {
			fontFamily: '"SF Pro Display", "Helvetica", "Arial", sans-serif',
			fontWeight: 600, // Semibold
			fontSize: baseTheme.typography.pxToRem(FONTSIZE.heading_semibold),
			letterSpacing: '-0.5px',
			lineHeight: '100%'
		},
		heading_medium: {
			fontFamily: '"SF Pro Display", "Helvetica", "Arial", sans-serif',
			fontWeight: 500, // Medium
			fontSize: baseTheme.typography.pxToRem(FONTSIZE.heading_medium),
			letterSpacing: '-0.5px',
			lineHeight: '100%'
		},
		body_regular: {
			fontFamily: '"SF Pro Display", "Helvetica", "Arial", sans-serif',
			fontWeight: 400, // Regular
			fontSize: baseTheme.typography.pxToRem(FONTSIZE.body_regular),
			letterSpacing: '-0.5px',
			lineHeight: '100%'
		},
		sectionTitle: {
			fontFamily: '"SF Pro Display", "Helvetica", "Arial", sans-serif',
			fontWeight: 500, // Medium
			fontSize: baseTheme.typography.pxToRem(FONTSIZE.sectionTitle),
			[baseTheme.breakpoints.down('sm')]: {
				fontSize: baseTheme.typography.pxToRem(FONTSIZE.sectionTitle_xs)
			},
			letterSpacing: '-0.5px',
			lineHeight: '100%'
		},
		tenderCountTitle: {
			fontFamily: '"SF Pro Display", "Helvetica", "Arial", sans-serif',
			fontWeight: 400, // Regular
			fontSize: baseTheme.typography.pxToRem(FONTSIZE.tenderCountTitle),
			[baseTheme.breakpoints.down('sm')]: {
				fontSize: baseTheme.typography.pxToRem(FONTSIZE.tenderCountTitle_xs)
			},
			letterSpacing: '-0.5px',
			lineHeight: '100%'
		},
		buttonLabel: {
			fontFamily: '"SF Pro Text", "Helvetica", "Arial", sans-serif',
			fontSize: baseTheme.typography.pxToRem(FONTSIZE.buttonLabel),
			[baseTheme.breakpoints.down('sm')]: {
				fontSize: baseTheme.typography.pxToRem(FONTSIZE.buttonLabel_xs)
			},
			letterSpacing: '-0.5px',
			lineHeight: '100%'
		},
		varianceDialLabel: {
			fontFamily: '"SF Pro Text", "Helvetica", "Arial", sans-serif',
			fontSize: baseTheme.typography.pxToRem(FONTSIZE.varianceDialLabel),
			[baseTheme.breakpoints.down('sm')]: {
				fontSize: baseTheme.typography.pxToRem(FONTSIZE.varianceDialLabel_xs)
			},
			letterSpacing: '-0.5px',
			lineHeight: '100%'
		},
		dateTimeLabel: {
			fontFamily: '"SF Pro Display", "Helvetica", "Arial", sans-serif',
			fontWeight: 500, // Medium
			fontSize: baseTheme.typography.pxToRem(FONTSIZE.dateTimeLabel),
			[baseTheme.breakpoints.down('sm')]: {
				fontSize: baseTheme.typography.pxToRem(FONTSIZE.dateTimeLabel_xs)
			},
			letterSpacing: '-0.5px',
			lineHeight: '100%'
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
		MuiInputLabel: {
			styleOverrides: {
				// *******DOUBLE CHECK THIS PART*********
				root: ({ theme }) => ({
					fontSize: theme.typography.pxToRem(16)
				})
				// **************************************
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
					...theme.typography.buttonLabel,
					textTransform: 'none', // Prevent uppercase styling
					borderRadius: theme.shape.buttonRadius,
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
