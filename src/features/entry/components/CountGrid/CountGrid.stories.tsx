import type { Meta, StoryObj } from '@storybook/react-vite';
import { CountGrid } from './CountGrid';
import { TENDER_TYPES } from '@/constants/currencies';
import * as tillStore from '@/stores/tillStore';

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
		}
	}
};

export default meta;

type Story = StoryObj<typeof CountGrid>;

export const Default: Story = {
	args: {
		tenderType: 'bills'
	},
	decorators: [
		(Story) => {
			jest.spyOn(tillStore, 'useCurrencyCode').mockReturnValue('us');
			jest.spyOn(tillStore, 'useCounts').mockReturnValue({
				bills: { '$1': 10, '$5': 5 },
				coins: { '25¢': 20 },
				rolls: {}
			});
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
