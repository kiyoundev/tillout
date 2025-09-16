import { Grid } from '@mui/material';
import { CountField } from '@/features/entry/components/CountField/CountField';
import { getCurrency, getColumnSize } from '@/utils/util';
import { type TenderType, type Counts, type CurrencyCode } from '@/types';
import { useCurrencyCode, useCounts, useTillActions } from '@/stores/tillStore';

export type OnDataChangeHandler = (denomination: string, count: number | undefined, tenderType: TenderType) => void;

export type CountGridProps = {
	tenderType: TenderType;
	currencyCode?: CurrencyCode;
	counts?: Counts;
	onDataChange?: OnDataChangeHandler;
};

/**
 * Renders a grid of CountField components for a specific currency and tender type.
 * It is a controlled component, receiving its state via props and communicating changes via callbacks.
 * - Dynamically arranges CountField components into a responsive grid.
 * - Displays denominations for a given `currencyCode` and `tenderType` (e.g., USD bills, CAD coins).
 * - Receives the entire `counts` object and accesses the relevant slice based on `tenderType`.
 * - Reports any change in a denomination's count back to the parent via the `onDataChange` handler.
 */

export const CountGrid: React.FC<CountGridProps> = ({ tenderType, currencyCode: propCurrencyCode, counts: propCounts, onDataChange }) => {
	const storeCurrencyCode = useCurrencyCode();
	const storeCounts = useCounts();
	const { updateCount } = useTillActions();

	const currencyCode = propCurrencyCode ?? storeCurrencyCode;
	const counts = propCounts ?? storeCounts;

	const handleValueChange = (denomination: string, value: number | undefined) => {
		if (onDataChange) {
			onDataChange(denomination, value, tenderType);
		} else {
			updateCount(tenderType, denomination, value);
		}
	};
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
						onValueChange={(value) => handleValueChange(denomination, value.floatValue)}
					/>
				</Grid>
			))}
		</Grid>
	);
};
