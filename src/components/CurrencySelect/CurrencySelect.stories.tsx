import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Box } from '@mui/material';
import { useArgs } from 'storybook/preview-api';
import { CurrencySelect } from '@/components/CurrencySelect/CurrencySelect';
import { CURRENCY_CODES } from '@/constants/currencies';
import { storeHooks } from '@/stores/tillStore';
import type { CurrencyCode } from '@/types';

// Save originals at the module level
const originalUseCurrencyCode = storeHooks.useCurrencyCode;
const originalUseTillActions = storeHooks.useTillActions;

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
			description: 'The currency code for the select component.'
		}
	},
	args: {
		currencyCode: 'us'
	}
};

export default meta;

type Story = StoryObj<typeof CurrencySelect>;

export const Default: Story = {
	decorators: [
		(Story) => {
			const [{ currencyCode }, updateArgs] = useArgs();

			// Mock the hooks
			storeHooks.useCurrencyCode = () => currencyCode as CurrencyCode;
			storeHooks.useTillActions = () => ({
				updateCurrencyCode: (newCode: string) => updateArgs({ currencyCode: newCode }),
				updateCount: () => {},
				updateOpeningBalance: () => {},
				updateTotalSales: () => {},
				updateSelectedTender: () => {},
				resetCount: () => {}
			});

			// Restore originals on unmount
			React.useEffect(() => {
				return () => {
					storeHooks.useCurrencyCode = originalUseCurrencyCode;
					storeHooks.useTillActions = originalUseTillActions;
				};
			}, []);

			return <Story />;
		}
	]
};
