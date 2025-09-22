import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { TenderCountContainer, TenderCountContainerProps } from './TenderCountContainer';
import { CURRENCY_CODES, TENDER_TYPES } from '@/constants/currencies';
import { Counts, TenderType } from '@/types';

const meta: Meta<typeof TenderCountContainer> = {
	title: 'Components/TenderCountContainer',
	component: TenderCountContainer,
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
		}
	}
};

export default meta;

type Story = StoryObj<typeof TenderCountContainer>;

export const Default: Story = {
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/design/18zXNs33NLGTaGuqrOjELQ/TillOut?node-id=2284-44129&t=O5tqYnrIhdsLrRlY-4'
		}
	},
	args: {
		currencyCode: 'us',
		tenderType: 'bills',
		counts: {
			bills: {},
			coins: {},
			rolls: {}
		}
	},
	render: function Render(args: TenderCountContainerProps) {
		const [{ counts }, updateArgs] = useArgs();

		const handleDataChange = (denomination: string, count: number | undefined, tenderType: TenderType) => {
			const currentCounts = counts || { bills: {}, coins: {}, rolls: {} };
			const newCounts = {
				...currentCounts,
				[tenderType]: {
					...(currentCounts[tenderType] || {}),
					[denomination]: count
				}
			};
			updateArgs({ counts: newCounts });
		};

		return (
			<TenderCountContainer
				{...args}
				counts={counts as Counts}
				onDataChange={handleDataChange}
			/>
		);
	}
};
