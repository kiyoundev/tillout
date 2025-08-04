import { Grid } from '@mui/material';
import React from 'react';

import { CountContainerTitle } from '../Styled/CountContainerTitle';

export type ConfigSectionProps = {
	title: string;
	children: React.ReactNode;
};

export const ConfigSection = ({ title, children }: ConfigSectionProps) => (
	<Grid size={{ xs: 6 }}>
		<CountContainerTitle sx={{ mb: 2 }}>{title.toUpperCase()}</CountContainerTitle>
		{children}
	</Grid>
);
