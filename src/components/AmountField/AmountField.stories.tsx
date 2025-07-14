import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { NumberFormatValues } from 'react-number-format';
import { AmountField } from './AmountField';
import { CURRENCY_CODES } from '../../assets/currencies';

const meta: Meta<typeof AmountField> = {
	title: 'Components/AmountField',
	component: AmountField,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		onValueChange: {
			table: {
				disable: true
			}
		},
		currencyCode: {
			control: 'select',
			options: CURRENCY_CODES,
			description: 'The selected currency code',
			table: {
				defaultValue: { summary: 'us' }
			}
		},
		value: {
			description: 'The current value of the input'
		},
		label: {
			description: 'The text that appears as the input label'
		},
		helperText: {
			description: 'Additional text displayed below the input to guide the user'
		}
	}
};

export default meta;

type Story = StoryObj<typeof AmountField>;

export const Default: Story = {
	args: {
		currencyCode: 'us',
		label: 'Amount',
		helperText: 'Enter the amount',
		value: undefined
	},

	render: (args) => {
		const [{ value }, updateArgs] = useArgs();
		return (
			<AmountField
				{...args}
				value={value}
				onValueChange={(values: NumberFormatValues) => updateArgs({ value: values.floatValue })}
			/>
		);
	}
};
