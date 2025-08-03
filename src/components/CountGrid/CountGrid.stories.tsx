import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { CountGrid } from './CountGrid';
import { CURRENCY_CODES, TENDER_TYPES } from '../../assets/currencies';
import { getColumnSize } from '../../utils/util';
import { type CountGridProps, type OnDataChangeHandler } from './CountGrid';

const meta: Meta<typeof CountGrid> = {
	title: 'Components/CountGrid',
	component: CountGrid,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		currencyCode: {
			control: 'select',
			options: CURRENCY_CODES,
			description: 'The currency to display denominations for.'
		},
		tenderType: {
			control: 'select',
			options: Object.keys(TENDER_TYPES),
			description: 'The type of tender to display (bills, coins, or rolls).'
		},
		onDataChange: {
			description: 'Callback fired when any denomination count changes.',
			table: {
				type: { summary: '(denomination: string, count: number | undefined, tenderType: TenderType) => void' },
				disable: true
			}
		},
		counts: {
			control: 'object',
			description: 'An object holding the count for each denomination.'
		},
		columnSize: {
			control: 'number',
			description: 'The grid column size (e.g., 3, 4, 6). Derived from the selected currency.'
		}
	}
};

export default meta;

type Story = StoryObj<typeof CountGrid>;

export const Default: Story = {
	args: {
		currencyCode: 'us',
		tenderType: 'bills',
		columnSize: getColumnSize('us'),
		onDataChange: () => {},
		counts: {
			bills: {},
			coins: {},
			rolls: {}
		}
	},
	render: (args: CountGridProps) => {
		const [{ counts }, updateArgs] = useArgs();

		const handleDataChange: OnDataChangeHandler = (denomination, count, tenderType) => {
			const newCounts = {
				...counts,
				[tenderType]: {
					...counts[tenderType],
					[denomination]: count
				}
			};

			updateArgs({ counts: newCounts });
		};

		return (
			<CountGrid
				{...args}
				counts={counts}
				onDataChange={handleDataChange}
			/>
		);
	}
};
