import {useState} from 'react';
import { Check } from '@mui/icons-material';
import {Stack, styled, Box, Card, TextField, Grid2, Paper, Typography, Select, MenuItem, Checkbox, InputLabel, FormControl, Divider, CardContent} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { alpha } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CurrencySelect, CurrencySelect2} from './components/CurrencySelect';
import { Options } from './components/Options';
import { MainInput } from './components/MainInput';

export const Form = () => {
    return (
        <ThemeProvider theme={theme} defaultMode='light'>
            <CssBaseline enableColorScheme/>
                {/* <CurrencySelect/> */}
                <CurrencySelect2/>
                <Options/>
                <MainInput/>
        </ThemeProvider>
    )
}


// export const Form = () => {
//     return (
//         <ThemeProvider theme={theme} defaultMode='light'>
//             <CssBaseline enableColorScheme/>
//             <Stack direction='column'>
//                 <Card>
//                     <Typography variant="h5" component="div">
//                         title
//                     </Typography>
//                     <Grid2 
//                         container 
//                         spacing = {4}
//                         sx={(theme) => ({
//                             padding: theme.spacing(4),
//                             // margin: theme.spacing(2),
//                             border: `1px solid ${((theme.vars || theme).palette.divider)}`,
//                             borderRadius: (theme.vars || theme).shape.borderRadius,
//                         })}
//                     >
//                         <Grid2 item height= '100%' direction='column' size={6} display='flex' >
//                             <TextField variant='standard' fullWidth select>
//                             </TextField>
//                             <TextField variant='standard' fullWidth>
//                             </TextField>                            
//                         </Grid2>
//                         <Grid2 item size={6} display="flex" justifyContent="center">
//                             <FormGroup>
//                                 <FormControlLabel control={<Checkbox/>} label="option1"/>
//                                 <FormControlLabel control={<Checkbox/>} label="option2"/>
//                                 <FormControlLabel control={<Checkbox/>} label="option3"/>
//                             </FormGroup>
//                         </Grid2>
//                     </Grid2>
//                 </Card>
//             </Stack>
//         </ThemeProvider>
//     );
// };


// const CustomPaper = (): JSX.Element => {
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         padding: "34px 25px",
//         borderRadius: 1,
//         border: "1px solid",
//         borderColor: "palette.divider",
//       }}
//     >
//       <Box sx={{ width: 220 }}>
//         <FormControl fullWidth variant="standard">
//           <InputLabel>Currency</InputLabel>
//           <Select
//             defaultValue=""
//             IconComponent={ArrowDropDownIcon}
//             label="Currency"
//           >
//             <MenuItem value="Value">Value</MenuItem>
//             <MenuItem value="asd">asd</MenuItem>
//           </Select>
//           <Typography variant="caption" color="textSecondary">
//             Helper text
//           </Typography>
//         </FormControl>

//         <FormControl fullWidth variant="standard" sx={{ mt: 4 }}>
//           <InputLabel>Label</InputLabel>
//           <TextField defaultValue="Value" variant="standard" />
//         </FormControl>
//       </Box>

//       <Box sx={{ width: 320 }}>
//         <Typography variant="body1">Label</Typography>
//         <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//           <Checkbox icon={<Hidden />} checkedIcon={<Hidden />} />
//           <Typography variant="body1">Label</Typography>
//         </Box>
//         <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//           <Checkbox icon={<Hidden />} checkedIcon={<Hidden />} />
//           <Typography variant="body1">Label</Typography>
//         </Box>
//         <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//           <Checkbox icon={<Hidden />} checkedIcon={<Hidden />} />
//           <Typography variant="body1">Label</Typography>
//         </Box>
//         <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
//           Helper text
//         </Typography>
//       </Box>
//     </Paper>
//   );
// };

// export default CustomPaper;
