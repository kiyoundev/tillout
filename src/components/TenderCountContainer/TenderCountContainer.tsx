import React from 'react';
import { CountGrid } from '../CountGrid/CountGrid';
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
 * - Renders a `CountGrid` component, passing down the necessary props to handle the actual counting interface.
 *
 * @param currencyCode The currency code (e.g., 'us') to determine which denominations to display.
 * @param tenderType The type of tender ('bills', 'coins', 'rolls') to be counted in this container.
 * @param counts An object containing the current counts for each denomination.
 * @param onDataChange Callback function that is fired when the count for any denomination changes.
 */

export const TenderCountContainer: React.FC<TenderCountContainerProps> = ({ currencyCode, tenderType, counts, onDataChange }) => (
	<CountGrid
		currencyCode={currencyCode}
		tenderType={tenderType}
		counts={counts}
		onDataChange={onDataChange}
		columnSize={getColumnSize(currencyCode)}
	/>
);
