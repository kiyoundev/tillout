import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, TextField } from '@mui/material';
// import {TextFieldInput} from './components/texfield.tsx'
import InputAdornment from '@mui/material/InputAdornment';

import { Controller, useForm } from "react-hook-form";
// const { register, handleSubmit, reset, control, setValue } = useForm();

// export const colorSchemes = {
//     light: {
//         palette: {
//             background: {
//                 default: 'hsl(0, 0%, 99%)',
//             },
//         },
//     },
// }

// const theme = createTheme({
//     cssVariables: {
//       colorSchemeSelector: 'data-mui-color-scheme',
//       cssVarPrefix: 'template',
//     },
//     colorSchemes,
// });

// createRoot(document.getElementById('root')!).render(
//     <StrictMode>
//         <ThemeProvider theme={theme}>
//             <CssBaseline enableColorScheme />
//                 <TextFieldInput/>
//         </ThemeProvider>
//     </StrictMode>
// )

export const Test = () => {
    const {control} = useForm();

    return (
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            // console.log(field),
            <TextField 
              {...field}
              label="Label"
              fullWidth
              InputProps = {{
                startAdornment: (
                  // <InputAdornment position="start" sx={{ color: 'black' }}>
                  //   USD
                  // </InputAdornment>
                  <span>USD</span>             
                ),
                sx: {
                  input: { color: 'gray' } // Styles the main input text gray
                }                
              }}
              value = " - US Dollar"
            />
          )}
        />
    );
}