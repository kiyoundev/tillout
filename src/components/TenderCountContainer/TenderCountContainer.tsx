import React from 'react';
import { Divider } from '@mui/material';
import { CountContainerTitle } from '../Styled/CountContainerTitle';
import { PaperContainer } from '../Styled/PaperContainer';
import { CountGrid } from '../CountGrid/CountGrid';
import { TENDER_TYPES } from '../../assets/currencies';
import { CurrencyCode, Counts, TenderType } from '../../types';
import { getColumnSize } from '../../utils/util';

export type TenderCountContainerProps = {
	currencyCode: CurrencyCode;
	tenderType: TenderType;
	counts: Counts;
	onDataChange: (denomination: string, count: number | undefined, tenderType: TenderType) => void;
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
export const TenderCountContainer: React.FC<TenderCountContainerProps> = ({ currencyCode, tenderType, counts, onDataChange }) => (
	<PaperContainer>
		<CountContainerTitle>{TENDER_TYPES[tenderType].toUpperCase()}</CountContainerTitle>

		<Divider sx={{ mt: 2, mb: 3 }} />

		<CountGrid
			currencyCode={currencyCode}
			tenderType={tenderType}
			counts={counts}
			onDataChange={onDataChange}
			columnSize={getColumnSize(currencyCode)}
		/>
	</PaperContainer>
);
