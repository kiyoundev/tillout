import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from './DateTime';

const meta: Meta<typeof DateTime> = {
	title: 'Components/DateTime',
	component: DateTime,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * This is the default view of the DateTime component. It will fetch the user's timezone
 * and display the current time, updating every minute.
 */
export const Default: Story = {};
