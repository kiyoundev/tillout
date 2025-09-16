import type { Meta, StoryObj } from '@storybook/react-vite';
import { CountGrid } from './CountGrid';
import { CURRENCY_CODES, TENDER_TYPES } from '@/constants/currencies';
import * as tillStore from '@/stores/tillStore';
import { Counts, CurrencyCode } from '@/types';

const meta: Meta<typeof CountGrid> = {
	title: 'Components/CountGrid',
	component: CountGrid,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		tenderType: {
			control: 'select',
			options: Object.keys(TENDER_TYPES),
			description: 'The type of tender to display (bills, coins, or rolls).'
		},
		// Args for the mock store
		currencyCode: {
			control: 'select',
			options: CURRENCY_CODES,
			description: 'The mocked currency code from the store.'
		},
		counts: {
			control: 'object',
			description: 'The mocked counts object from the store.'
		}
	}
};

export default meta;

type Story = StoryObj<typeof CountGrid>;

export const Default: Story = {
	args: {
		tenderType: 'bills',
		// Mock store initial state
		currencyCode: 'us',
		counts: {
			bills: { '$1': 10, '$5': 5 },
			coins: { '25¢': 20 },
			rolls: {}
		}
	},
	decorators: [
		(Story, context) => {
			const { currencyCode, counts } = context.args as { currencyCode: CurrencyCode; counts: Counts };

			jest.spyOn(tillStore, 'useCurrencyCode').mockReturnValue(currencyCode);
			jest.spyOn(tillStore, 'useCounts').mockReturnValue(counts);
			jest.spyOn(tillStore, 'useTillActions').mockReturnValue({
				updateCount: (tenderType, denomination, count) => {
					console.log('updateCount called:', { tenderType, denomination, count });
				},
				// Mock other actions as needed
				updateCurrencyCode: () => {},
				updateOpeningBalance: () => {},
				updateTotalSales: () => {},
				updateSelectedTender: () => {},
				resetCount: () => {}
			});

			return <Story />;
		}
	]
};
