import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';

export const colorSchemes = {
    light: {
        palette: {
            background: {
                default: 'hsl(0, 0%, 99%)',
            },
        },
    },
}

const theme = createTheme({
    cssVariables: {
      colorSchemeSelector: 'data-mui-color-scheme',
      cssVarPrefix: 'template',
    },
    colorSchemes,
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <Box sx={(theme) => (console.log(theme.vars.palette.background.defaultChannel),
            {
                display: 'flex',
                // backgroundColor: `rgba(${theme.palette.background.default} / 1)`
                backgroundColor: `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            }
            )}>                
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quibusdam quaerat magni, at nihil aliquid, perspiciatis molestias officiis ad recusandae enim odit, nesciunt animi nostrum deleniti quia tempora quis id?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quibusdam quaerat magni, at nihil aliquid, perspiciatis molestias officiis ad recusandae enim odit, nesciunt animi nostrum deleniti quia tempora quis id?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quibusdam quaerat magni, at nihil aliquid, perspiciatis molestias officiis ad recusandae enim odit, nesciunt animi nostrum deleniti quia tempora quis id?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quibusdam quaerat magni, at nihil aliquid, perspiciatis molestias officiis ad recusandae enim odit, nesciunt animi nostrum deleniti quia tempora quis id?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quibusdam quaerat magni, at nihil aliquid, perspiciatis molestias officiis ad recusandae enim odit, nesciunt animi nostrum deleniti quia tempora quis id?
            </Box>
        </ThemeProvider>
    </StrictMode>
)