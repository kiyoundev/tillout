import { Divider, BoxProps } from '@mui/material';
import React from 'react';

import { CountContainerTitle } from '../Styled/CountContainerTitle';
import { PaperContainer } from '../Styled/PaperContainer';

interface LabeledSectionProps extends BoxProps {
	title: string;
	showDivider?: boolean;
	children: React.ReactNode;
}

export const LabeledSection: React.FC<LabeledSectionProps> = ({ title, showDivider = false, children, ...props }) => (
	<PaperContainer {...props}>
		<CountContainerTitle sx={{ mb: 2 }}>{title.toUpperCase()}</CountContainerTitle>
		{showDivider && <Divider sx={{ mb: 3 }} />}
		{children}
	</PaperContainer>
);
