import type { Meta, StoryObj } from "@storybook/react";
import TenderInput from "./TenderInput";

const meta: Meta<typeof TenderInput> = {
	title: "Components/TenderInput",
	component: TenderInput,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TenderInput>;

export const Default: Story = {
	args: {
		// label: "Label",
		// helperText: "helperText",
	},
};
