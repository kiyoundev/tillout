import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Box } from '@mui/material';
import { CurrencySelect } from '@/components/CurrencySelect/CurrencySelect';
import { CURRENCY_CODES } from '@/constants/currencies';
import * as tillStore from '@/stores/tillStore';

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
		// Arg for the mock store
		currencyCode: {
			control: 'select',
			options: CURRENCY_CODES,
			description: 'The mocked currency code from the store.'
		}
	},
	args: {
		currencyCode: 'us'
	}
};

export default meta;

export const Default: StoryObj<typeof CurrencySelect> = {
	decorators: [
		(Story, _context) => {
			const [{ currencyCode }, updateArgs] = useArgs();

			jest.spyOn(tillStore, 'useCurrencyCode').mockReturnValue(currencyCode);
			jest.spyOn(tillStore, 'useTillActions').mockReturnValue({
				updateCurrencyCode: (newCode) => updateArgs({ currencyCode: newCode }),
				// Mock other actions as needed
				updateCount: () => {},
				updateOpeningBalance: () => {},
				updateTotalSales: () => {},
				updateSelectedTender: () => {},
				resetCount: () => {}
			});

			return <Story />;
		}
	]
};
