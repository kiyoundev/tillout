import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import React from 'react';
import { Box } from '@mui/material';
import { CurrencySelect } from '@/components/CurrencySelect/CurrencySelect';
import { CURRENCY_CODES } from '@/constants/currencies';
import type { CurrencyCode } from '@/types';
import { StoreProvider, createTillStore } from '@/stores/tillStore';

const meta: Meta<typeof CurrencySelect> = {
	title: 'Components/CurrencySelect',
	component: CurrencySelect,
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
		currencyCode: {
			control: 'select',
			options: CURRENCY_CODES,
			description: 'The currency code for the select component.',
			table: {
				defaultValue: { summary: 'us' }
			}
		},
		helperText: {
			description: 'Additional text displayed below the input to guide the user'
		}
	}
};

export default meta;
type Story = StoryObj<typeof CurrencySelect>;

export const Default: Story = {
	args: {
		currencyCode: 'us',
		helperText: 'Select a currency'
	},
	render: (args) => {
		const [{ currencyCode }, updateArgs] = useArgs();

		// Stable store for the life of the story
		const store = React.useMemo(() => createTillStore({ currencyCode: args.currencyCode }), []);
		const actions = store.getState().actions;

		// Controls → UI: push changes from controls into the store
		React.useEffect(() => {
			const current = store.getState().currencyCode;
			if (current !== currencyCode) {
				actions.updateCurrencyCode(currencyCode);
			}
		}, [currencyCode, actions, store]);

		// UI → Controls: patch the action
		React.useEffect(() => {
			const original = actions.updateCurrencyCode;
			actions.updateCurrencyCode = (next: CurrencyCode) => {
				const prev = store.getState().currencyCode;
				original(next);
				if (prev !== next) {
					updateArgs({ currencyCode: next });
				}
			};
			return () => {
				actions.updateCurrencyCode = original;
			};
		}, [actions, store, updateArgs]);

		return (
			<StoreProvider store={store}>
				<CurrencySelect helperText={args.helperText} />
			</StoreProvider>
		);
	}
};
