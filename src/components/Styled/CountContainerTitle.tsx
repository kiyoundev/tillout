import { Typography, styled } from '@mui/material';

export const CountContainerTitle = styled(Typography)(({ theme }) => ({
	fontFamily: 'Helvetica Neue, Helvetica',
	fontWeight: 400,
	letterSpacing: 0,
	lineHeight: '18px',
	fontSize: '20px',
	color: theme.palette.text.primary
}));
