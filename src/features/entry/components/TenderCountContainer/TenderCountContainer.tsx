import React from 'react';
import { Divider, Typography, Stack } from '@mui/material';
import { PaperContainer } from '@/components/Styled/PaperContainer';
import { CountGrid } from '@/features/entry/components/CountGrid/CountGrid';
import { TENDER_TYPES } from '@/constants/currencies';
import type { TenderType } from '@/types';
import { UICONSTANTS } from '@/styles/UIConstants';

export type TenderCountContainerProps = {
	tenderType: TenderType;
};

/**
 * A container component that renders a complete section for counting a specific type of tender (bills, coins, or rolls).
 * It includes a title, a divider, and a grid of input fields for each denomination.
 *
 * - Displays the tender type as a capitalized title (e.g., "BILLS").
 * - Renders a `CountGrid` component, passing down the necessary props to handle the actual counting interface.
 * - Acts as a structural component to group related counting elements together.
 *
 * @param currencyCode The currency code (e.g., 'us') to determine which denominations to display.
 * @param tenderType The type of tender ('bills', 'coins', 'rolls') to be counted in this container.
 * @param counts An object containing the current counts for each denomination.
 * @param onDataChange Callback function that is fired when the count for any denomination changes.
 */

export const TenderCountContainer: React.FC<TenderCountContainerProps> = ({ tenderType }) => (
	<PaperContainer>
		<Stack
			direction='row'
			alignItems='center'
		>
			<Typography variant='tenderCountTitle'>{TENDER_TYPES[tenderType].toUpperCase()}</Typography>
		</Stack>
		<Divider
			sx={{
				mt: {
					xxs: UICONSTANTS.TenderCountContainer.spacing_title_divider_xs,
					sm: UICONSTANTS.TenderCountContainer.spacing_title_divider
				},
				mb: {
					xxs: UICONSTANTS.TenderCountContainer.spacing_title_countgrid_xs,
					sm: UICONSTANTS.TenderCountContainer.spacing_title_countgrid
				}
			}}
		/>
		<CountGrid tenderType={tenderType} />
	</PaperContainer>
);
