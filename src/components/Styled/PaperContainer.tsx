import { Box, styled } from '@mui/material';

export const PaperContainer = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.PaperContainer.background,
	border: `1.5px solid ${theme.palette.PaperContainer.border}`,
	borderRadius: '10px',
	padding: theme.spacing(3)
}));
