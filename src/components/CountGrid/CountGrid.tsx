import { Grid } from '@mui/material';
import { CountField } from '../CountField/CountField';
import { getCurrency } from '../../utils/util';
import { type CurrencyCode, type TenderType, type Counts } from '../../types/index.ts';

export type OnDataChangeHandler = (denomination: string, count: number | undefined, tenderType: TenderType) => void;

export type CountGridProps = {
	currencyCode: CurrencyCode;
	tenderType: TenderType;
	counts: Counts;
	onDataChange: OnDataChangeHandler;
};

/**
 * Calculates the appropriate column size for a responsive grid layout.
 * Aims to fit all denominations into a two-row grid.
 */
export const getColumnSize = (denominations: string[]) => {
	const numColumns = Math.ceil(denominations.length / 2);
	return 12 / numColumns;
};

/**
 * CountGrid component
 *
 * Renders a grid of CountField components for a specific currency and tender type.
 * It is a controlled component, receiving its state via props and communicating changes via callbacks.
 * - Dynamically arranges CountField components into a responsive grid.
 * - Displays denominations for a given `currencyCode` and `tenderType` (e.g., USD bills, CAD coins).
 * - Receives the entire `counts` object and accesses the relevant slice based on `tenderType`.
 * - Reports any change in a denomination's count back to the parent via the `onDataChange` handler.
 */
export const CountGrid = ({ currencyCode, tenderType, counts, onDataChange }: CountGridProps) => {
	const currency = getCurrency(currencyCode);
	const denominations = tenderType === 'rolls' ? Object.keys(currency.denomination[tenderType]) : currency.denomination[tenderType];
	const columnSize = getColumnSize(denominations);

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
						onValueChange={(value) => {
							onDataChange(denomination, value.floatValue, tenderType);
						}}
					/>
				</Grid>
			))}
		</Grid>
	);
};
