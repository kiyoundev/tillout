import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';
import { ActionButtons } from './ActionButtons';
import { createTillStore, StoreProvider } from '@/stores/tillStore';

const meta: Meta<typeof ActionButtons> = {
	title: 'Components/ActionButtons',
	component: ActionButtons,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	decorators: [
		(Story) => {
			const storeRef = React.useRef(createTillStore());
			return (
				<MemoryRouter initialEntries={['/']}>
					<StoreProvider store={storeRef.current}>
						<Box sx={{ width: 400 }}>
							<Story />
						</Box>
					</StoreProvider>
				</MemoryRouter>
			);
		}
	],
	argTypes: {
		page: {
			control: 'radio',
			options: ['entry', 'summary']
		}
	}
};

export default meta;
type Story = StoryObj<typeof ActionButtons>;

export const Default: Story = {
	args: {
		page: 'entry'
	},
	render: ({ page }) => <ActionButtons page={page} />
};

export const Entry: Story = {
	args: { page: 'entry' }
};

export const Summary: Story = {
	args: { page: 'summary' }
};
