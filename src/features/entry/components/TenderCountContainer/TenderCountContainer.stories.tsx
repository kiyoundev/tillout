import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Box } from '@mui/material';
import { useArgs } from 'storybook/preview-api';
import { TenderCountContainer } from './TenderCountContainer';
import { CURRENCY_CODES, TENDER_TYPES } from '@/constants/currencies';
import { Counts, TenderType } from '@/types';
import { storeHooks } from '@/stores/tillStore';

// Save originals at module level
const originalUseCurrencyCode = storeHooks.useCurrencyCode;
const originalUseCounts = storeHooks.useCounts;
const originalUseTillActions = storeHooks.useTillActions;

const meta: Meta<typeof TenderCountContainer> = {
	title: 'Components/TenderCountContainer',
	component: TenderCountContainer,
	parameters: { layout: 'centered' },
	decorators: [
		(Story) => (
			<Box sx={{ width: '400px' }}>
				<Story />
			</Box>
		)
	],
	tags: ['autodocs'],
	argTypes: {
		currencyCode: {
			control: 'select',
			options: CURRENCY_CODES,
			description: 'The currency to display denominations for.'
		},
		tenderType: {
			control: 'select',
			options: Object.keys(TENDER_TYPES),
			description: 'The type of tender to display (bills, coins, or rolls).'
		},
		counts: {
			control: 'object',
			description: 'An object holding the count for each denomination.'
		}
	},
	args: {
		currencyCode: 'us',
		tenderType: 'bills',
		counts: {
			bills: {},
			coins: {},
			rolls: {}
		}
	}
};

export default meta;

type Story = StoryObj<typeof TenderCountContainer>;

export const Default: Story = {
	decorators: [
		(Story) => {
			const [{ currencyCode, counts }, updateArgs] = useArgs();

			// Mock the store hooks
			storeHooks.useCurrencyCode = () => currencyCode;
			storeHooks.useCounts = () => counts as Counts;
			storeHooks.useTillActions = () => ({
				updateCurrencyCode: (newCode: string) => updateArgs({ currencyCode: newCode }),
				updateCount: (tenderType: TenderType, denomination: string, count: number | undefined) => {
					const newCounts = {
						...counts,
						[tenderType]: {
							...counts[tenderType],
							[denomination]: count
						}
					};
					updateArgs({ counts: newCounts });
				},
				updateOpeningBalance: () => {},
				updateTotalSales: () => {},
				updateSelectedTender: () => {},
				resetCount: () => {}
			});

			// Restore originals on unmount
			React.useEffect(() => {
				return () => {
					storeHooks.useCurrencyCode = originalUseCurrencyCode;
					storeHooks.useCounts = originalUseCounts;
					storeHooks.useTillActions = originalUseTillActions;
				};
			}, []);

			return <Story />;
		}
	]
};
