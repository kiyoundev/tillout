import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { AmountField } from '@/components/AmountField/AmountField';
import { CURRENCY_CODES } from '@/constants/currencies';
import * as tillStore from '@/stores/tillStore';
import { CurrencyCode } from '@/types';

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
		value: {
			description: 'The current value of the input'
		},
		helperText: {
			description: 'Additional text displayed below the input to guide the user'
		},
		// Arg for the mock store
		currencyCode: {
			control: 'select',
			options: CURRENCY_CODES,
			description: 'The mocked currency code from the store.'
		}
	}
};

export default meta;

type Story = StoryObj<typeof AmountField>;

export const Default: Story = {
	args: {
		helperText: 'Enter the amount',
		value: undefined,
		// Mock store initial state
		currencyCode: 'us'
	},
	decorators: [
		(Story, context) => {
			const { currencyCode } = context.args as { currencyCode: CurrencyCode };
			jest.spyOn(tillStore, 'useCurrencyCode').mockReturnValue(currencyCode);
			return <Story />;
		}
	],
	render: function Render(args) {
		const [{ value }, updateArgs] = useArgs();
		return (
			<AmountField
				{...args}
				value={value}
				onValueChange={(newValue) => updateArgs({ value: newValue })}
			/>
		);
	}
};
