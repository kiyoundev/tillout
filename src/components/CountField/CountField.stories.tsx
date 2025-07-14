import type { Meta, StoryObj } from '@storybook/react';
import { CountField, type CountFieldProps } from './CountField'; // Import CountFieldProps
import { useArgs } from '@storybook/preview-api';
import type { NumberFormatValues } from 'react-number-format'; // Import NumberFormatValues

const meta: Meta<typeof CountField> = {
	title: 'Components/CountField',
	component: CountField,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		onValueChange: { table: { disable: true } },
		onFocus: { table: { disable: true } },
		onBlur: { table: { disable: true } },
		value: {
			description: 'The current value of the input'
		},
		label: {
			description: 'The text that appears as the input label'
		}
	}
};

export default meta;

type Story = StoryObj<typeof CountField>;

export const Default: Story = {
	args: {
		label: 'Label',
		value: undefined
	},
	render: (args: CountFieldProps) => {
		const [{ value }, updateArgs] = useArgs();

		return (
			<CountField
				{...args}
				value={value}
				onValueChange={(values: NumberFormatValues) => updateArgs({ value: values.floatValue })}
			/>
		);
	}
};
