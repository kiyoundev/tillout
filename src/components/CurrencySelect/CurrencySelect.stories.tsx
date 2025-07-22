import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Box } from '@mui/material';
import { CurrencySelect, CurrencySelectProps } from './CurrencySelect';
import { CURRENCY_CODES } from '../../assets/currencies';

const meta: Meta<typeof CurrencySelect> = {
	title: 'Components/CurrencySelect',
	component: CurrencySelect,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Box sx={{ width: '400px' }}>
				<Story />
			</Box>
		)
	],
	argTypes: {
		currencyCode: {
			control: { type: 'select' },
			options: CURRENCY_CODES,
			table: {
				defaultValue: { summary: 'us' }
			}
		},
		onCurrencyChange: {
			table: {
				type: { summary: '(currencyCode: CurrencyCode) => void' },
				disable: true
			}
		}
	},
	args: {
		currencyCode: 'us'
	}
};

export default meta;

export const Default: StoryObj<typeof CurrencySelect> = {
	render: (args: CurrencySelectProps) => {
		const [{ currencyCode }, updateArgs] = useArgs();
		return (
			<CurrencySelect
				{...args}
				currencyCode={currencyCode}
				onCurrencyChange={(currencyCode) => updateArgs({ currencyCode })}
			/>
		);
	}
};
