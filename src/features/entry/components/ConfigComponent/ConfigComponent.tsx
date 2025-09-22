import React from 'react';
import { Grid, Stack, Fade, Tooltip, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { theme } from '@/styles/theme';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { FONTSIZE, UICONSTANTS } from '@/styles/UIConstants';

export type ConfigComponentProps = {
	title: string;
	showIcon?: boolean;
	tooltipText?: string;
	children: React.ReactNode;
};

export const ConfigComponent = ({ title, showIcon = false, tooltipText, children, ...rest }: ConfigComponentProps) => {
	const breakpoint = useBreakpoint();

	return (
		<Grid
			size={{ xs: 12, md: 6 }}
			{...rest}
		>
			<Stack
				direction='column'
				spacing={{ xs: UICONSTANTS.ConfigComponent.spacing_xs, sm: UICONSTANTS.ConfigComponent.spacing }}
			>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='flex-start'
					spacing={1}
				>
					<Typography variant='sectionTitle'>{title.toUpperCase()}</Typography>

					{showIcon && (
						<Tooltip
							title={tooltipText || 'No description available.'}
							placement={breakpoint === 'xs' ? 'bottom' : 'right-start'}
							arrow
							slots={{
								transition: Fade
							}}
							slotProps={{
								transition: { timeout: 350 }
							}}
							sx={{ color: theme.palette.text.gray }}
						>
							<InfoOutlinedIcon
								sx={{
									color: theme.palette.text.gray,
									fontSize: {
										xs: theme.typography.pxToRem(FONTSIZE.sectionTitle_xs),
										sm: theme.typography.pxToRem(FONTSIZE.sectionTitle)
									}
								}}
							/>
						</Tooltip>
					)}
				</Stack>
				{children}
			</Stack>
		</Grid>
	);
};
