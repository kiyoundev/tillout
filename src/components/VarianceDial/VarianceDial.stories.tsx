import type { Meta, StoryObj } from '@storybook/react';
import { VarianceDial } from './VarianceDial';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme/theme';

const meta: Meta<typeof VarianceDial> = {
	title: 'Components/VarianceDial',
	component: VarianceDial,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		variance: {
			control: { type: 'range', min: 0, max: 2, step: 0.05 }, // Finer step
			description: 'Variance value between 0 and 2'
		}
	},
	decorators: [
		(Story) => (
			<ThemeProvider theme={theme}>
				<Story />
			</ThemeProvider>
		)
	]
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story provides an interactive dial where you can adjust the variance using the controls.
 * This is the primary story for demonstrating the component's animation and color transitions.
 */
export const Default: Story = {
	args: {
		variance: 0.85
	}
};

/**
 * This story shows the "Bad" state of the dial, which is used for variance values below 0.75.
 * The progress ring will be colored red.
 */
export const Bad: Story = {
	args: {
		variance: 0.74
	}
};

/**
 * This story shows the "Good" state of the dial, for variance values between 0.75 and 0.9.
 * The progress ring will be colored orange.
 */
export const Good: Story = {
	args: {
		variance: 0.75
	}
};

/**
 * This story shows the "Great" state of the dial, for variance values at or above 0.9.
 * The progress ring will be colored green.
 */
export const Great: Story = {
	args: {
		variance: 1
	}
};

/**
 * This story shows the "Overage" state of the dial, for variance values above 1.
 * The progress ring will be colored green, while the overage ring will be colored orange.
 */
export const Overage: Story = {
	args: {
		variance: 1.2
	}
};
