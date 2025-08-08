import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { TenderCountContainer, TenderCountContainerProps } from './TenderCountContainer';
import { TENDER_TYPES } from '../../assets/currencies';
import { theme } from '../../theme/theme';

const setup = (props: Partial<TenderCountContainerProps> = {}) => {
	const mockOnDataChange = jest.fn();
	const defaultProps: TenderCountContainerProps = {
		currencyCode: 'us',
		tenderType: 'bills',
		counts: { bills: {}, coins: {}, rolls: {} },
		onDataChange: mockOnDataChange
	};

	render(
		<ThemeProvider theme={theme}>
			<TenderCountContainer {...defaultProps} {...props} />
		</ThemeProvider>
	);

	return {
		user: userEvent.setup(),
		mockOnDataChange
	};
};

describe('TenderCountContainer Component', () => {
	it('renders the correct capitalized title for the tender type', () => {
		setup();
		const expectedTitle = TENDER_TYPES.bills.toUpperCase();
		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	it('passes initial counts down to CountGrid', () => {
		const initialCounts = { bills: { '$5': 10 }, coins: {}, rolls: {} };
		setup({ counts: initialCounts });

		const fiveDollarInput = screen.getByLabelText('$5') as HTMLInputElement;
		expect(fiveDollarInput.value).toBe('10');
	});

	it('handles data changes from CountGrid correctly', async () => {
		const { user, mockOnDataChange } = setup();

		const tenDollarInput = screen.getByLabelText('$10');
		await user.type(tenDollarInput, '4');

		expect(mockOnDataChange).toHaveBeenCalledWith('$10', 4, 'bills');
	});
});
