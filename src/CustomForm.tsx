import {useState} from 'react';
import { Check } from '@mui/icons-material';
import {Stack, styled, Box, Card, TextField, Grid2, Paper, Typography, Select, MenuItem, Checkbox, InputLabel, FormControl, Divider, CardContent, Container} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { alpha } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


// padding: theme.spacing(4),
// borderRadius: (theme.vars || theme).shape.borderRadius,
// border: `1px solid ${((theme.vars || theme).palette.divider)}`,
// boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
// background: 'hsl(0, 0%, 100%)',
// [theme.breakpoints.up('sm')]: {
//     maxWidth: '750px',
// },
// alignSelf: 'center',
// // margin: 'auto',
// width: '100%',

export const CustomForm = (): JSX.Element => {
    return(
        <Stack
            sx={(theme) => ({
                // padding: theme.spacing(4),
                backgroundColor: 'hsl(0, 0%, 99%)',
                // minHeight: '100vh',
            })}
        >
            <Paper
                variant='outlined'
                sx= { (theme) => ({
                    boxShadow: 'hsla(220, 30%, 5%, 0.04) 0px 4px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 10px 35px -5px',
                    borderRadius: 2,
                    border: '1px solid hsla(220, 20%, 80%, 0.8)',
                    padding: theme.spacing(6),
                    [theme.breakpoints.up('sm')]: {
                        maxWidth: '600px',
                    },
                    margin: 'auto',
                })}
            >
                <Typography variant="h5" sx={{mb: 2}}>title</Typography>
                <Grid2 container spacing={10}>
                    <Grid2 size={6}>
                        {/* CURRENCY */}
                        <TextField
                            select
                            fullWidth
                            helperText="helperText"
                            // size='small'
                        >
                            <MenuItem value="">option1</MenuItem>
                            <MenuItem value="">option2</MenuItem>
                            <MenuItem value="">option3</MenuItem>
                        </TextField>
                        {/* <FormControl fullWidth>
                            <InputLabel>label</InputLabel>
                            <Select fullWidth label="Currency">
                                <MenuItem value="">option1</MenuItem>
                                <MenuItem value="">option2</MenuItem>
                                <MenuItem value="">option3</MenuItem>
                            </Select>
                            <FormHelperText>With label + helper text</FormHelperText> */}
                            {/* DEFAULT TILL AMOUNT */}
                            <TextField fullWidth label="label" helperText="helperText" sx={{mt: 2}}/>                            
                        {/* </FormControl> */}
                    </Grid2>
                    <Grid2 size={6}  
                        sx={{
                            // border: '1px solid black',
                            margin: 'auto'
                            }}
                    >
                        <FormControl>                        
                            <FormGroup >
                                <FormControlLabel control={<Checkbox/>} label="Coins"/>
                                <FormControlLabel control={<Checkbox/>} label="Rolled Coins"/>
                            </FormGroup>
                        </FormControl>
                    </Grid2>
                </Grid2>
                <Divider sx={(theme) => ({my: theme.spacing(4)})}/>

                
                <Grid2 container>
                    <Grid2 size={6}>
                        <TextField fullWidth label="label" type="number"/>
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField fullWidth label="label" type="number"/>
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField fullWidth label="label" type="number"/>
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField fullWidth label="label" type="number"/>
                    </Grid2>
                </Grid2>

                <Grid2 container >
                    <Grid2 size={6}>
                        <TextField fullWidth label="label" type="number"/>
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField fullWidth label="label" type="number"/>
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField fullWidth label="label" type="number"/>
                    </Grid2>
                </Grid2>

            </Paper>
        </Stack>
    )
}