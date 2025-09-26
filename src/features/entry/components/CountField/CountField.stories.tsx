import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { CountField, type CountFieldProps } from './CountField';
import type { NumberFormatValues } from 'react-number-format';

const meta: Meta<typeof CountField> = {
	title: 'Components/CountField',
	component: CountField,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		value: {
			description: 'The current value of the input',
			control: 'number'
		},
		label: {
			description: 'The text that appears as the input label',
			control: 'text'
		},
		onValueChange: { table: { disable: true } },
		onFocus: { table: { disable: true } },
		onBlur: { table: { disable: true } }
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

export const WithValue: Story = {
	args: {
		label: '$100',
		value: 10
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
