import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/styles/theme';
import { ConfigComponent } from './ConfigComponent';

describe('ConfigComponent Component', () => {
	it('renders the title and children correctly', () => {
		render(
			<ThemeProvider theme={theme}>
				<ConfigComponent title='Test Title'>
					<div>Child Content</div>
				</ConfigComponent>
			</ThemeProvider>
		);

		expect(screen.getByText('TEST TITLE')).toBeInTheDocument();
		expect(screen.getByText('Child Content')).toBeInTheDocument();
	});

	it('does not show the tooltip icon when showIcon is false', () => {
		render(
			<ThemeProvider theme={theme}>
				<ConfigComponent
					title='Test Title'
					showIcon={false}
				>
					<div>Child Content</div>
				</ConfigComponent>
			</ThemeProvider>
		);

		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
	});

	it('shows the tooltip icon and text when showIcon is true', async () => {
		const user = userEvent.setup();
		render(
			<ThemeProvider theme={theme}>
				<ConfigComponent
					title='Test Title'
					showIcon
					tooltipText='My Tooltip'
				>
					<div>Child Content</div>
				</ConfigComponent>
			</ThemeProvider>
		);

		const icon = screen.getByTestId('InfoOutlinedIcon');
		await user.hover(icon);

		expect(await screen.findByText('My Tooltip')).toBeInTheDocument();
	});

	it('passes through data-testid', () => {
		render(
			<ThemeProvider theme={theme}>
				<ConfigComponent
					title='Test Title'
					data-testid='config-section-test'
				>
					<div>Child Content</div>
				</ConfigComponent>
			</ThemeProvider>
		);

		expect(screen.getByTestId('config-section-test')).toBeInTheDocument();
	});
});
