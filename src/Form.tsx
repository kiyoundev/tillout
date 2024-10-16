import {useState} from 'react';
import { Check } from '@mui/icons-material';
import {Stack, styled, Box, Card, TextField, Grid2, Paper, Typography, Select, MenuItem, Checkbox, InputLabel, FormControl, Divider, CardContent} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { alpha } from '@mui/material/styles';

interface Currency {
    symbol: string;
    bills: string[];
    coins: string[];
}

interface currencyData {
    [key: string]: Currency
}

const currencyData: currencyData = {
    USD: {
        symbol: '$',
        bills: ['$1', '$5', '$10', '$20', '$50', '$100'],
        coins: ['1¢', '5¢', '10¢', '25¢', '50¢', '$1']
    },
    CAD: {
        symbol: '$',
        bills: ['$5', '$10', '$20', '$50', '$100'],
        coins: ['5¢', '10¢', '25¢', '$1', '$2']
    },
    AUD: {
        symbol: '$',
        bills: ['$5', '$10', '$20', '$50', '$100'],
        coins: ['5¢', '10¢', '20¢', '50¢', '$1', '$2']
    },
    NZD: {
        symbol: '$',
        bills: ['$5', '$10', '$20', '$50', '$100'],
        coins: ['10¢', '20¢', '50¢', '$1', '$2']
    },
    EUR: {
        symbol: '€',
        bills: ['€5', '€10', '€20', '€50', '€100', '€200', '€500'],
        coins: ['1¢', '2¢', '5¢', '10¢', '20¢', '50¢', '€1', '€2']
    }
}

export const Form = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box sx={(theme) => ({
                display: 'flex',
                overflow: 'auto',
                // backgroundColor: `rgba(${theme.vars.palette.background.defaultChannel} / 1)`,
                backgroundColor: theme.vars
                    ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                    : alpha(theme.palette.background.default, 1),
                width: '100%',
                maxWidth: { sm: '100%', md: '1700px' }
                
            })}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Hello, World!
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider>
    );
};
