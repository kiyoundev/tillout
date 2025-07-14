import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { CountGrid } from './CountGrid';
import { CURRENCY_CODES, TENDER_TYPES } from '../../assets/currencies';
import { type CountGridProps, type OnDataChangeHandler } from './CountGrid';

/**
 * A grid of CountFields for inputting currency denomination counts.
 * It's a controlled component that displays fields based on the selected currency and tender type.
 */
const meta: Meta<typeof CountGrid> = {
	title: 'Components/CountGrid',
	component: CountGrid,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A grid of input fields for counting specific denominations of currency (e.g., all USD bills, all CAD coins). This component is controlled, receiving its state from a parent.'
			}
		}
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
			options: TENDER_TYPES,
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
		}
	}
};

export default meta;

type Story = StoryObj<typeof CountGrid>;

export const Default: Story = {
	args: {
		currencyCode: 'us',
		tenderType: 'bills',
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
