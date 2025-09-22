import { Typography, styled } from '@mui/material';

export const CountContainerTitle = styled(Typography)(({ theme }) => ({
	...theme.typography.heading_medium,
	fontSize: theme.typography.pxToRem(24),
	[theme.breakpoints.down('sm')]: {
		fontSize: theme.typography.pxToRem(20)
	}
}));
