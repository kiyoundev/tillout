import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { Config, ConfigProps } from './Config';
import { theme } from '../../theme/theme';

const setup = (props: Partial<ConfigProps> = {}) => {
	const defaultProps: ConfigProps = {
		currencyCode: 'us',
		onCurrencyChange: jest.fn(),
		selectedTender: ['bills', 'coins'],
		onTenderChange: jest.fn(),
		openingBalance: 100.5,
		onOpeningBalanceChange: jest.fn(),
		totalSales: 250.75,
		onTotalSalesChange: jest.fn()
	};

	render(
		<ThemeProvider theme={theme}>
			<Config {...defaultProps} {...props} />
		</ThemeProvider>
	);
};

describe('Config Component', () => {
	beforeEach(() => {
		setup();
	});

	it('renders all section titles', () => {
		expect(screen.getByText('CURRENCY')).toBeInTheDocument();
		expect(screen.getByText('TENDER')).toBeInTheDocument();
		expect(screen.getByText('OPENING BALANCE')).toBeInTheDocument();
		expect(screen.getByText('TOTAL SALES')).toBeInTheDocument();
	});

	it('renders all child input components', () => {
		// CurrencySelect and TenderSelect both render a combobox
		const comboBoxes = screen.getAllByRole('combobox');
		expect(comboBoxes).toHaveLength(2);

		// AmountFields render a textbox. We find them by their helper text.
		const openingBalanceInput = screen.getByText('Enter Opening Balance');
		const totalSalesInput = screen.getByText('Enter Total Sales Amount');
		expect(openingBalanceInput).toBeInTheDocument();
		expect(totalSalesInput).toBeInTheDocument();
	});

	it('displays the initial opening balance and total sales correctly', () => {
		// The AmountField formats the number, so we check for the formatted string.
		expect(screen.getByDisplayValue('100.50')).toBeInTheDocument();
		expect(screen.getByDisplayValue('250.75')).toBeInTheDocument();
	});
});
