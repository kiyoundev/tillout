import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@mui/material';
import { TenderSelect } from './TenderSelect';
import { TENDER_TYPES } from '@/constants/currencies';
import { createTillStore, StoreProvider } from '@/stores/tillStore';
import { useArgs } from 'storybook/internal/preview-api';
import React from 'react';
import type { TenderType } from '@/types';

const meta: Meta<typeof TenderSelect> = {
	title: 'Components/TenderSelect',
	component: TenderSelect,
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
		selectedTender: {
			control: { type: 'multi-select' },
			options: Object.keys(TENDER_TYPES),
			description: 'The currently selected tender options',
			table: {
				defaultValue: { summary: '[]' }
			}
		}
	}
};

export default meta;
type Story = StoryObj<typeof TenderSelect>;

export const Default: Story = {
	args: {
		selectedTender: []
	},
	render: (args) => {
		const [{ selectedTender }, updateArgs] = useArgs();

		// 1) Stable store instance for the life of the story
		const store = React.useMemo(() => createTillStore({ selectedTender: args.selectedTender }), []);

		// 2) Controls → UI: push arg into store on change
		React.useEffect(() => {
			const current = store.getState().selectedTender;
			if (current !== selectedTender) {
				store.getState().actions.updateSelectedTender(selectedTender);
			}
		}, [selectedTender]);

		// 3) UI → Controls: patch actions.updateCurrencyCode BEFORE providing to context
		React.useEffect(() => {
			const actions = store.getState().actions;
			const original = actions.updateSelectedTender;
			actions.updateSelectedTender = (next: TenderType[]) => {
				const prev = store.getState().selectedTender;
				original(next); // update store
				if (prev !== next) {
					updateArgs({ selectedTender: next });
				}
			};
			return () => {
				actions.updateSelectedTender = original;
			};
		}, [updateArgs]);

		return (
			<StoreProvider store={store}>
				<TenderSelect />
			</StoreProvider>
		);
	}
};
