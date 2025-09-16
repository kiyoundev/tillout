import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { LabeledSection, LabeledSectionProps } from './LabeledSection';
import { theme } from '@/styles/theme';

const setup = (props: LabeledSectionProps) => {
	render(
		<ThemeProvider theme={theme}>
			<LabeledSection {...props} />
		</ThemeProvider>
	);
};

describe('LabeledSection Component', () => {
	it('renders the title in uppercase and its children', () => {
		const testTitle = 'Test Section';
		const childText = 'This is the child content';

		setup({ title: testTitle, children: <div>{childText}</div> });

		// Check for the capitalized title
		expect(screen.getByText(testTitle.toUpperCase())).toBeInTheDocument();

		// Check for the child content
		expect(screen.getByText(childText)).toBeInTheDocument();
	});

	it('displays the divider when showDivider is true', () => {
		setup({ title: 'With Divider', showDivider: true, children: <div /> });

		// MUI Divider has a role of 'separator'
		expect(screen.getByRole('separator')).toBeInTheDocument();
	});

	it('does not display the divider when showDivider is false', () => {
		setup({ title: 'No Divider', showDivider: false, children: <div /> });

		expect(screen.queryByRole('separator')).not.toBeInTheDocument();
	});

	it('does not display the divider by default', () => {
		setup({ title: 'Default No Divider', children: <div /> });

		expect(screen.queryByRole('separator')).not.toBeInTheDocument();
	});
});
