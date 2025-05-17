import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof TextField> = {
	title: 'Components/TextField',
	component: TextField,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
	args: {
		label: 'Label',
		helperText: 'helperText',
		value: ''
	},

	render: (args) => {
		const [{ value }, updateArgs] = useArgs();
		return (
			<TextField
				{...args}
				value={value}
				onChange={(e) => updateArgs({ value: e.target.value })}
			/>
		);
	}
};
