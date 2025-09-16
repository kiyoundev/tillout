import React from 'react';
import { Grid, Stack, Fade, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import { theme } from '@/styles/theme';
// import { CountContainerTitle } from '../Styled/CountContainerTitle';

export type ConfigSectionProps = {
	title: string;
	showIcon?: boolean;
	tooltipText?: string;
	children: React.ReactNode;
};

export const ConfigSection = ({ title, showIcon = false, tooltipText, children, ...rest }: ConfigSectionProps) => (
	<Grid
		size={{ xs: 6 }}
		{...rest}
	>
		<Stack
			direction='row'
			alignItems='center'
			justifyContent='flex-start'
			spacing={1}
			sx={{ mb: 2 }}
		>
			{/* <CountContainerTitle>{title.toUpperCase()}</CountContainerTitle> */}
			<Typography
				variant='heading_secondary'
				sx={{ fontSize: '24px' }}
			>
				{title.toUpperCase()}
			</Typography>
			{showIcon && (
				<Tooltip
					title={tooltipText || 'No description available.'}
					placement='right-start'
					arrow
					slots={{
						transition: Fade
					}}
					slotProps={{
						transition: { timeout: 350 }
					}}
					sx={{ color: theme.palette.text.gray }}
				>
					<InfoOutlinedIcon />
				</Tooltip>
			)}
		</Stack>
		{children}
	</Grid>
);
