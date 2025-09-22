// External Libraries
import Big from 'big.js';

// Material-UI Components
import { Stack, Typography, Divider, List, ListItem, ListItemIcon } from '@mui/material';

// Material-UI Icons
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// Internal Components
import { DateTime } from '@/components/DateTime/DateTime';
import { VarianceDial } from '@/features/summary/components/VarianceDial/VarianceDial';
import { ActionButtons } from '@/components/ActionButtons/ActionButtons';

// State Management & Hooks
import { useCounts, useCurrencyCode, useOpeningBalance, useTotalSales } from '@/stores/tillStore';

// Utilities
import { calculateDeposit, calculateTotal, calculateVariance, formatAmount } from '@/utils/util';
import { generateVarianceSuggestions, VarianceSuggestion } from '@/utils/suggestionEngine';

// Types
import { TenderType, DepositBreakdown, DepositSubtotals, DepositAction, CurrencyCode } from '@/types';

// Assets & Theme
import { TENDER_TYPES } from '@/constants/currencies';
import { theme } from '@/styles/theme';
import { UICONSTANTS } from '@/styles/UIConstants';

type BreakdownHeaderProps = {
	label: string;
	amount: string;
};

type BreakdownRowProps = {
	label: string;
	quantity: number;
};

type BreakdownTenderProps = {
	tenderType: string;
	amount: string;
	items: DepositBreakdown[TenderType];
};

type BreakdownContentProps = {
	breakdown: DepositBreakdown;
	subtotals: DepositSubtotals;
	currencyCode: CurrencyCode;
};

type SummarySectionProps = {
	variance: Big;
	countedTotal: Big;
	openingBalance: number;
	totalSales: number;
	totalDeposit: Big;
	breakdown: DepositBreakdown;
	subtotals: DepositSubtotals;
	actions: DepositAction[];
	suggestions: VarianceSuggestion[];
	currencyCode: CurrencyCode;
};

/**
 * Renders a header for a breakdown section, displaying a title and a corresponding amount.
 * @param label The title of the section (e.g., 'BILLS').
 * @param amount The formatted monetary amount for the section (e.g., '$150.00').
 */

const BreakdownHeader = ({ label, amount }: BreakdownHeaderProps) => (
	<Stack
		direction='row'
		justifyContent='space-between'
		alignItems='center'
	>
		<Typography
			variant='heading_medium'
			sx={{ fontSize: '22px' }}
		>
			{label}
		</Typography>
		<Typography
			variant='heading_medium'
			color={theme.palette.text.gray}
			sx={{ fontSize: '20px' }}
		>
			{amount}
		</Typography>
	</Stack>
);

/**
 * Renders a detail row for a single denomination, displaying its name and quantity.
 * @param label The denomination identifier (e.g., '$20').
 * @param quantity The count for that specific denomination.
 */
const BreakdownRow = ({ label, quantity }: BreakdownRowProps) => (
	<Stack
		direction='row'
		justifyContent='space-between'
		alignItems='center'
		// sx={{ mb: 0.5 }}
	>
		<Typography
			variant='body_regular'
			sx={{ fontSize: '22px' }}
		>
			{label}
		</Typography>
		<Typography
			variant='body_regular'
			sx={{ fontSize: '20px' }}
		>
			{quantity}
		</Typography>
	</Stack>
);

/**
 * Renders the complete breakdown for a single tender type (e.g., 'BILLS').
 * It uses a `BreakdownHeader` for the tender type's subtotal and maps over its
 * denominations to render a `BreakdownRow` for each.
 * @param tenderType The name of the tender type (e.g., 'BILLS').
 * @param amount The formatted subtotal for this tender type.
 * @param items An object containing the denominations and their quantities.
 */
const BreakdownTender = ({ tenderType, amount, items }: BreakdownTenderProps) => {
	// if the items object is empty, prevent rendering the component
	if (!items || Object.keys(items).length === 0) {
		return null;
	}

	return (
		<Stack
			direction='column'
			spacing={2} // spacing between header and content rows: 16px
		>
			<BreakdownHeader
				label={tenderType}
				amount={amount}
			/>
			<Stack
				direction='column'
				spacing={0.5} // spacing between rows: 4px
			>
				{Object.entries(items).map(([denomKey, quantity]) => (
					<BreakdownRow
						key={denomKey}
						label={denomKey}
						quantity={quantity}
					/>
				))}
			</Stack>
		</Stack>
	);
};

/**
 * The main container for the entire deposit breakdown section.
 * It iterates through all tender types in the breakdown and renders a `BreakdownTender`
 * component for each one that has items to display.
 * @param breakdown The complete breakdown of denominations to be deposited.
 * @param subtotals An object with the monetary subtotal for each tender type.
 * @param currencyCode The currency code for formatting amounts.
 */
const BreakdownContent = ({ breakdown, subtotals, currencyCode }: BreakdownContentProps) => {
	return (
		<Stack
			direction='column'
			spacing={3}
		>
			{Object.entries(breakdown).map(([tenderTypeKey, items]) => {
				const tenderType = tenderTypeKey as TenderType;
				if (!subtotals[tenderType]) {
					return null;
				}
				return (
					<BreakdownTender
						key={tenderType}
						tenderType={TENDER_TYPES[tenderType].toUpperCase()}
						amount={formatAmount(subtotals[tenderType]!, currencyCode)}
						items={items}
					/>
				);
			})}
		</Stack>
	);
};

/**
 * Displays the final total deposit amount.
 * @param totalDeposit The total amount to be deposited.
 * @param currencyCode The currency code for formatting the amount.
 */
const TotalDepositContent = ({ totalDeposit, currencyCode }: { totalDeposit: Big; currencyCode: CurrencyCode }) => (
	<Stack
		direction='column'
		spacing={1.5}
		sx={{ mb: 4 }}
	>
		<Typography
			variant='heading_medium'
			color={theme.palette.text.gray}
			sx={{ mb: 1.5 }}
		>
			Total Deposit Amount
		</Typography>
		<Typography
			variant='heading_semibold'
			sx={{ fontSize: '32px', mb: 4 }}
		>
			{formatAmount(totalDeposit, currencyCode)}
		</Typography>
	</Stack>
);

/**
 * Displays the counted total and the variance (discrepancy) amount when the till is not balanced.
 * @param countedTotal The total amount counted in the till.
 * @param discrepancy The variance amount (shortage or overage).
 * @param currencyCode The currency code for formatting amounts.
 */

const VarianceDetailContent = ({ countedTotal, discrepancy, currencyCode }: { countedTotal: Big; discrepancy: Big; currencyCode: CurrencyCode }) => {
	return (
		<Stack direction={{ xs: 'column', sm: 'row' }}>
			<Stack
				direction='column'
				spacing={1.5}
				sx={{ mb: 4, flexGrow: 1, width: '50%' }}
			>
				<Typography
					variant='heading_medium'
					color={theme.palette.text.gray}
					sx={{ mb: 1.5 }}
				>
					Counted Total
				</Typography>
				<Typography
					variant='heading_semibold'
					sx={{ fontSize: '32px', mb: 4 }}
				>
					{formatAmount(countedTotal, currencyCode)}
				</Typography>
			</Stack>
			<Stack
				direction='column'
				spacing={1.5}
				sx={{ mb: 4, flexGrow: 1, width: '50%' }}
			>
				<Typography
					variant='heading_medium'
					color={theme.palette.text.gray}
					sx={{ mb: 1.5 }}
				>
					Variance Amount
				</Typography>
				<Typography
					variant='heading_semibold'
					sx={{ fontSize: '32px', mb: 4 }}
				>
					{formatAmount(discrepancy, currencyCode, true)}
				</Typography>
			</Stack>
		</Stack>
	);
};

/**
 * Displays a list of suggestions to help resolve a variance.
 * It formats messages differently depending on whether the suggestions are for common counting errors or input errors.
 * @param suggestions An array of suggestion objects from the suggestion engine.
 * @param discrepancy The variance amount, used for display in the message.
 * @param currencyCode The currency code for formatting amounts.
 */

const SuggestionNotification = ({
	suggestions,
	discrepancy,
	currencyCode
}: {
	suggestions: VarianceSuggestion[];
	discrepancy: Big;
	currencyCode: CurrencyCode;
}) => {
	const hasInputError = suggestions.some((suggestion) => suggestion.type === 'INPUT_ERROR');

	if (hasInputError) {
		const inputErrorMessage = suggestions[0]?.message || 'Please double-check your inputs.';

		return (
			<Stack
				direction='column'
				spacing={1}
			>
				<Stack
					direction='row'
					spacing={1}
					alignItems='center'
					sx={{ mt: 4 }}
				>
					<DangerousOutlinedIcon sx={{ color: theme.palette.text.gray }} />
					<Typography
						variant='body_regular'
						color={theme.palette.text.gray}
						sx={{ fontSize: '18px' }}
					>
						{discrepancy.lt(0)
							? `Your till is short by ${formatAmount(discrepancy.abs(), currencyCode)}.`
							: `Your till is over by ${formatAmount(discrepancy.abs(), currencyCode)}.`}
					</Typography>
				</Stack>
				<Typography
					variant='body_regular'
					color={theme.palette.text.gray}
					sx={{ fontSize: '18px', pl: 4 }}
				>
					{inputErrorMessage}
				</Typography>
			</Stack>
		);
	}

	return (
		<Stack
			direction='column'
			spacing={1}
		>
			<Stack
				direction='row'
				spacing={1}
				alignItems='center'
				sx={{ mt: 4 }}
			>
				<DangerousOutlinedIcon sx={{ color: theme.palette.text.gray }} />
				<Typography
					variant='body_regular'
					color={theme.palette.text.gray}
					sx={{ fontSize: '18px' }}
				>
					{discrepancy.lt(0)
						? `Your till is short by ${formatAmount(discrepancy.abs(), currencyCode)}. You might have: `
						: `Your till is over by ${formatAmount(discrepancy.abs(), currencyCode)}. You might have: `}
				</Typography>
			</Stack>
			<List
				dense
				sx={{ p: 0, pl: 5 }}
			>
				{suggestions.map((suggestion, index) => (
					<ListItem
						key={index}
						sx={{ p: 0, pb: 1 }}
					>
						<ListItemIcon sx={{ minWidth: 'auto', mr: 1, color: theme.palette.text.gray }}>
							<FiberManualRecordIcon sx={{ fontSize: '8px' }} />
						</ListItemIcon>
						<Typography
							variant='body_regular'
							color={theme.palette.text.gray}
							sx={{ fontSize: '18px' }}
						>
							{suggestion.message}
						</Typography>
					</ListItem>
				))}
			</List>
		</Stack>
	);
};

/**
 * Displays a notification for actions that were automatically taken during the deposit calculation, such as breaking a roll.
 * @param actions An array of action objects with messages to display.
 */
const ActionNotification = ({ actions }: { actions: DepositAction[] }) => (
	<Stack
		direction='row'
		spacing={1}
		alignItems='center'
		sx={{ mt: 4 }}
	>
		<InfoOutlinedIcon sx={{ color: theme.palette.text.gray }} />
		<Typography
			variant='body_regular'
			color={theme.palette.text.gray}
			sx={{ fontSize: '18px' }}
		>
			{actions.map((action) => action.message).join(', ')}
		</Typography>
	</Stack>
);

/**
 * The main content section of the summary page - represents the left section of the summary page.
 * It conditionally renders either the final deposit summary or the variance details based on whether the till is balanced.
 * @param variance The variance amount to determine which content to show.
 * @param countedTotal The total counted amount.
 * @param openingBalance The opening balance.
 * @param totalSales The total sales figure.
 * @param totalDeposit The calculated total deposit.
 * @param breakdown The deposit breakdown by denomination.
 * @param subtotals The deposit subtotals by tender type.
 * @param actions Any actions taken during calculation.
 * @param suggestions Any suggestions for resolving a variance.
 * @param currencyCode The currency code for formatting.
 */

const SummarySection = ({
	countedTotal,
	openingBalance,
	totalSales,
	totalDeposit,
	breakdown,
	subtotals,
	actions,
	suggestions,
	currencyCode
}: SummarySectionProps) => {
	const discrepancy = countedTotal.minus(new Big(openingBalance).plus(new Big(totalSales)));
	const isVarianceMet = discrepancy.eq(0);

	return (
		<Stack
			direction='column'
			p={{ xs: UICONSTANTS.SummarySection.padding_xs, sm: UICONSTANTS.SummarySection.padding }}
			spacing={{ xs: UICONSTANTS.SummarySection.spacing_xs, sm: UICONSTANTS.SummarySection.spacing }}
			sx={{ flexGrow: 1, width: { xs: '100%', md: '50%' } }}
		>
			<Typography variant='heading_semibold'>{isVarianceMet ? 'SUMMARY' : 'DETAILS'}</Typography>

			{!isVarianceMet && (
				<>
					<VarianceDetailContent
						countedTotal={countedTotal}
						discrepancy={discrepancy}
						currencyCode={currencyCode}
					/>
					<SuggestionNotification
						suggestions={suggestions}
						discrepancy={discrepancy}
						currencyCode={currencyCode}
					/>
				</>
			)}

			{isVarianceMet && (
				<>
					<TotalDepositContent
						totalDeposit={totalDeposit}
						currencyCode={currencyCode}
					/>
					<BreakdownContent
						breakdown={breakdown}
						subtotals={subtotals}
						currencyCode={currencyCode}
					/>
					{actions.length > 0 && <ActionNotification actions={actions} />}
				</>
			)}
		</Stack>
	);
};

/**
 * Displays the variance dial component.
 * @param variance The variance amount to be visualized by the dial.
 */
export const VarianceSection = ({ variance }: { variance: Big }) => (
	<Stack
		direction='column'
		alignItems='center'
		p={{ xs: UICONSTANTS.VarianceSection.padding_xs, sm: UICONSTANTS.VarianceSection.padding }}
		sx={{ flexGrow: 1, width: { xs: '100%', md: '50%' } }}
	>
		<Typography
			variant='heading_semibold'
			sx={{ alignSelf: 'flex-start', mb: { xs: UICONSTANTS.VarianceSection.spacing_xs, sm: UICONSTANTS.VarianceSection.spacing } }}
		>
			VARIANCE
		</Typography>
		<Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
			<VarianceDial variance={variance} />
		</Stack>
	</Stack>
);

export const SummaryPage: React.FC = () => {
	// const breakpoint = useBreakpoint();

	const counts = useCounts();
	const currencyCode = useCurrencyCode();
	const openingBalance = useOpeningBalance();
	const totalSales = useTotalSales();

	const countedTotal = calculateTotal(counts, currencyCode);
	const variance = calculateVariance(countedTotal, openingBalance || 0, totalSales || 0);
	const { totalDeposit, breakdown, subtotals, actions } = calculateDeposit(counts, openingBalance || 0, currencyCode);

	const suggestions = generateVarianceSuggestions({
		countedTotal: countedTotal.toNumber(),
		openingBalance: openingBalance || 0,
		totalSales: totalSales || 0,
		currencyCode: currencyCode,
		tenderCounts: counts,
		primaryInputKeys: ['Opening Balance', 'Total Sales']
	});

	return (
		<>
			<Stack
				p={{ xs: UICONSTANTS.SummaryPage.padding_xs, sm: UICONSTANTS.SummaryPage.padding }}
				spacing={{ xs: UICONSTANTS.SummaryPage.spacing_xs, sm: UICONSTANTS.SummaryPage.spacing }}
			>
				<DateTime />

				<Stack
					direction={{ xs: 'column', md: 'row' }}
					sx={{
						border: `1px solid ${theme.palette.PaperContainer.border}`,
						borderRadius: theme.shape.borderRadius,
						boxShadow: theme.shadows[24]
					}}
				>
					<SummarySection
						variance={variance}
						countedTotal={countedTotal}
						openingBalance={openingBalance || 0}
						totalSales={totalSales || 0}
						totalDeposit={totalDeposit}
						breakdown={breakdown}
						subtotals={subtotals}
						actions={actions}
						suggestions={suggestions}
						currencyCode={currencyCode}
					/>

					<Divider
						orientation='vertical'
						flexItem
						sx={{ borderColor: theme.palette.PaperContainer.border, borderWidth: '0.75px' }}
					/>

					<VarianceSection variance={variance} />
				</Stack>

				<ActionButtons page='summary' />
			</Stack>
		</>
	);
};
