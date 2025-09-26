import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@mui/material';
import React from 'react';
import { useArgs } from 'storybook/internal/preview-api';
import { CountGrid } from './CountGrid';
import { CURRENCY_CODES, TENDER_TYPES } from '@/constants/currencies';
import { createTillStore, StoreProvider } from '@/stores/tillStore';
import { getCurrency } from '@/utils/util';

const meta: Meta<typeof CountGrid> = {
	title: 'Components/CountGrid',
	component: CountGrid,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Box sx={{ width: 400 }}>
				<Story />
			</Box>
		)
	],
	argTypes: {
		tenderType: {
			control: 'select',
			options: Object.keys(TENDER_TYPES),
			description: 'The type of tender to display (bills, coins, or rolls).',
			table: {
				defaultValue: { summary: 'bills' }
			}
		},
		currencyCode: {
			control: 'select',
			options: CURRENCY_CODES,
			description: 'The mocked currency code from the store.',
			table: {
				defaultValue: { summary: 'us' }
			}
		},
		counts: {
			control: 'object',
			description: 'The mocked counts object from the store.',
			table: {
				defaultValue: { summary: '{ bills: {}, coins: {}, rolls: {} }' }
			}
		}
	}
};

export default meta;
type Story = StoryObj<typeof CountGrid>;

export const Default: Story = {
	args: {
		tenderType: 'bills',
		currencyCode: 'us',
		counts: {
			bills: {},
			coins: {},
			rolls: {}
		}
	},
	render: (args) => {
		const [{ currencyCode, counts }, updateArgs] = useArgs();

		const currency = getCurrency(currencyCode);
		const denominations =
			args.tenderType === 'rolls' ? Object.keys(currency.denomination[args.tenderType]) : currency.denomination[args.tenderType];

		// Stable store for the life of the story
		const store = React.useMemo(() => createTillStore(), []);

		// Controls → UI: push changes from controls into the store
		React.useEffect(() => {
			const state = store.getState();
			if (state.currencyCode !== currencyCode) {
				state.actions.updateCurrencyCode(currencyCode);
			}

			const controlCounts = counts?.[args.tenderType] ?? {};
			const storeCounts = state.counts[args.tenderType] ?? {};

			denominations.forEach((denomination) => {
				const nextValue = controlCounts[denomination];
				const currentValue = storeCounts[denomination];

				if (currentValue !== nextValue) {
					state.actions.updateCount(args.tenderType, denomination, nextValue);
				}
			});
		}, [currencyCode, counts, args.tenderType]);

		// UI → Controls: patch the action
		React.useEffect(() => {
			const actions = store.getState().actions;
			const originalUpdateCount = actions.updateCount;

			actions.updateCount = (tenderType, denomination, value) => {
				originalUpdateCount(tenderType, denomination, value);
				updateArgs({ counts: store.getState().counts });
			};

			return () => {
				actions.updateCount = originalUpdateCount;
			};
		}, [store, updateArgs]);

		return (
			<StoreProvider store={store}>
				<CountGrid tenderType={args.tenderType} />
			</StoreProvider>
		);
	}
};
