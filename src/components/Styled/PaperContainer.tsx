import { Box, styled } from '@mui/material';
import { UICONSTANTS } from '@/styles/UIConstants';

export const PaperContainer = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.PaperContainer.background,
	border: `1.5px solid ${theme.palette.PaperContainer.border}`,
	borderRadius: '10px',
	padding: theme.spacing(UICONSTANTS.ConfigSection.padding),
	[theme.breakpoints.down('xs')]: {
		padding: theme.spacing(UICONSTANTS.ConfigSection.padding_xs)
	}
}));
