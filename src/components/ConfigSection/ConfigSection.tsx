import React from 'react';
import { Grid, Stack, Fade } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
// import Fade from '@mui/material/Fade';

import { CountContainerTitle } from '../Styled/CountContainerTitle';

export type ConfigSectionProps = {
	title: string;
	showIcon?: boolean;
	tooltipText?: string;
	children: React.ReactNode;
};

export const ConfigSection = ({ title, showIcon = false, tooltipText, children }: ConfigSectionProps) => (
	<Grid size={{ xs: 6 }}>
		<Stack
			direction='row'
			alignItems='center'
			justifyContent='flex-start'
			spacing={1}
			sx={{ mb: 2 }}
		>
			{/* <CountContainerTitle sx={{ mb: 2 }}>{title.toUpperCase()}</CountContainerTitle> */}
			<CountContainerTitle>{title.toUpperCase()}</CountContainerTitle>
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
				>
					<InfoOutlinedIcon />
				</Tooltip>
			)}
		</Stack>
		{children}
	</Grid>
);
