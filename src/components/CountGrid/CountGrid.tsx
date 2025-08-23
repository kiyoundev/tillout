import { Grid } from '@mui/material';
import { CountField } from '../CountField/CountField';
import { getCurrency } from '../../utils/util';
import { type TenderType } from '../../types/index.ts';
import { useCurrencyCode, useCounts, useTillActions } from '../../stores/tillStore';
import { getColumnSize } from '../../utils/util';

export type CountGridProps = {
	tenderType: TenderType;
};

/**
 * Renders a grid of CountField components for a specific currency and tender type.
 * It is a controlled component, receiving its state via props and communicating changes via callbacks.
 * - Dynamically arranges CountField components into a responsive grid.
 * - Displays denominations for a given `currencyCode` and `tenderType` (e.g., USD bills, CAD coins).
 * - Receives the entire `counts` object and accesses the relevant slice based on `tenderType`.
 * - Reports any change in a denomination's count back to the parent via the `onDataChange` handler.
 */

export const CountGrid: React.FC<CountGridProps> = ({ tenderType }) => {
	const currencyCode = useCurrencyCode();
	const counts = useCounts();
	const { updateCount } = useTillActions();
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
