import { createTheme } from '@mui/material/styles';

export const colorSchemes = {
    light: {
        palette: {
            background: {
                default: 'hsl(0, 0%, 99%)',
            },
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
});