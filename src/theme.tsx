import { createTheme, alpha } from '@mui/material/styles';

export const shape = {
    borderRadius: 8,
};

export const gray = {
    50: 'hsl(220, 35%, 97%)',
    100: 'hsl(220, 30%, 94%)',
    200: 'hsl(220, 20%, 88%)',
    300: 'hsl(220, 20%, 80%)',
    400: 'hsl(220, 20%, 65%)',
    500: 'hsl(220, 20%, 42%)',
    600: 'hsl(220, 20%, 35%)',
    700: 'hsl(220, 20%, 25%)',
    800: 'hsl(220, 30%, 6%)',
    900: 'hsl(220, 35%, 3%)',
};

const customComponents = {
    MuiCard: {
        styleOverrides: {
            root: ({ theme }) => {
                return {
                    borderRadius: (theme.vars || theme).shape.borderRadius,
                    border: `1px solid ${((theme.vars || theme).palette.divider)}`,
                    boxShadow: 'none',
                    background: 'hsl(0, 0%, 100%)',
                }
            }
        }
    }
}

export const colorSchemes = {
    light: {
        palette: {
            background: {
                default: 'hsl(0, 0%, 99%)',
                paper: 'hsl(220, 35%, 97%)',
            },
            baseShadow:
                'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
            divider: alpha(gray[300], 0.4),
        },
    },

    dark: {
        palette: {
            background: {
                default: 'hsl(0, 0%, 0%)',
            },
        },
    }
}

export const theme = createTheme({
    cssVariables: {
      colorSchemeSelector: 'data-mui-color-scheme',
    },
    colorSchemes,
    shape,
    components: customComponents
});