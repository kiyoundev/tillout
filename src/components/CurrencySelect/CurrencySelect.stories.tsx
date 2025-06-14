import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { Box } from '@mui/material';
import { CurrencySelect, CurrencySelectProps } from './CurrencySelect';
import { CURRENCY_DETAILS } from '../../assets/currencies';
import { CurrencyCode } from '../../types';

/**
 * A currency selector component that allows users to search and select from a list of currencies.
 * Displays currency flags, codes, and names in a dropdown.
 */

const meta: Meta<typeof CurrencySelect> = {
	title: 'Components/CurrencySelect',
	component: CurrencySelect,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Dropdown used to select a currency (e.g. USD, CAD, EUR). Used in cash register screens.'
			}
		}
	},
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
			options: Object.keys(CURRENCY_DETAILS) as CurrencyCode[],
			description: 'The selected currency code',
			table: {
				defaultValue: { summary: 'us' }
			}
		},
		onCurrencyChange: {
			description: 'Callback fired when a currency is selected',
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
