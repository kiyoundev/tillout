import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { Box } from '@mui/material';
import { CurrencySelect, CurrencySelectProps } from './CurrencySelect';
import { getCurrencyCodeList } from '../../utils/util';

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
			options: getCurrencyCodeList(),
			description: 'The currently selected currency code',
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
	// default arg for all stories
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
