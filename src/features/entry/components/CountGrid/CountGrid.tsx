import { Grid } from '@mui/material';
import { CountField } from '@/features/entry/components/CountField/CountField';
import { getCurrency, getColumnSize } from '@/utils/util';
import { type TenderType, type Counts, type CurrencyCode } from '@/types';
import { useCurrencyCode, useCounts, useUpdateCount } from '@/stores/tillStore';

export type CountGridProps = {
	tenderType: TenderType;
	currencyCode?: CurrencyCode;
	counts?: Counts;
};

/**
 * Renders a grid of `CountField` inputs for the requested `tenderType`.
 * State for `currencyCode`, `counts`, and the `updateCount` action is sourced directly from the till store (Zustand).
 *
 * - Computes layout and denomination labels from the active currency in the store.
 * - Reads count values for the current tender from `useCounts()`.
 * - Persists user edits by invoking `useUpdateCount()`.
 */

export const CountGrid: React.FC<CountGridProps> = ({ tenderType }) => {
	const currencyCode = useCurrencyCode();
	const counts = useCounts();
	const updateCount = useUpdateCount();

	const columnSize = getColumnSize(currencyCode);
	const currency = getCurrency(currencyCode);
	const denominations = tenderType === 'rolls' ? Object.keys(currency.denomination[tenderType]) : currency.denomination[tenderType];

	return (
		<Grid
			container
			spacing={1}
		>
			{denominations.map((denomination) => (
				<Grid
					key={denomination}
					size={columnSize}
				>
					<CountField
						label={denomination}
						value={counts?.[tenderType]?.[denomination]}
						onValueChange={(value) => updateCount(tenderType, denomination, value.floatValue)}
					/>
				</Grid>
			))}
		</Grid>
	);
};
