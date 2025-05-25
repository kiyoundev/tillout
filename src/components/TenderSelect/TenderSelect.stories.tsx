import type { Meta, StoryObj } from '@storybook/react';
import { TenderSelect, TenderSelectProps } from './TenderSelect';
import { Box } from '@mui/material';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof TenderSelect> = {
	title: 'Components/TenderSelect',
	component: TenderSelect,
	parameters: {
		layout: 'centered'
	},
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
			options: ['bills', 'coins', 'rolls'],
			description: 'The currently selected tender options',
			table: {
				defaultValue: { summary: '[]' }
			}
		},
		onTenderChange: {
			description: 'Callback fired when a tender is selected',
			table: {
				type: { summary: '(selectedTender: Tender[]) => void' },
				disable: true
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
	render: (args: TenderSelectProps) => {
		const [{ selectedTender }, updateArgs] = useArgs();
		return (
			<TenderSelect
				{...args}
				selectedTender={selectedTender}
				onTenderChange={(selectedTender) => updateArgs({ selectedTender })}
			/>
		);
	}
};
