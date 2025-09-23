import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Box } from '@mui/material';
import { useArgs } from 'storybook/preview-api';
import { TenderSelect } from './TenderSelect';
import { TENDER_TYPES } from '@/constants/currencies';
import { storeHooks } from '@/stores/tillStore';
import type { TenderType } from '@/types';

// Save originals at module level
const originalUseSelectedTender = storeHooks.useSelectedTender;
const originalUseTillActions = storeHooks.useTillActions;

const meta: Meta<typeof TenderSelect> = {
	title: 'Components/TenderSelect',
	component: TenderSelect,
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
		selectedTender: {
			control: { type: 'multi-select' },
			options: Object.keys(TENDER_TYPES),
			description: 'The currently selected tender options',
			table: {
				defaultValue: { summary: '[]' }
			}
		}
	},
	args: {
		selectedTender: []
	}
};

export default meta;
type Story = StoryObj<typeof TenderSelect>;

export const Default: Story = {
	decorators: [
		(Story) => {
			const [{ selectedTender }, updateArgs] = useArgs();

			// Mock the store hooks
			storeHooks.useSelectedTender = () => selectedTender as TenderType[];
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
					storeHooks.useSelectedTender = originalUseSelectedTender;
					storeHooks.useTillActions = originalUseTillActions;
				};
			}, []);

			return <Story />;
		}
	]
};
