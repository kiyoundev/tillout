import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { Config } from './Config';
import { theme } from '../../theme/theme';
import * as tillStore from '../../stores/tillStore';

describe('Config Component', () => {
	const useOpeningBalanceMock = jest.spyOn(tillStore, 'useOpeningBalance');
	const useTotalSalesMock = jest.spyOn(tillStore, 'useTotalSales');
	const useTillActionsMock = jest.spyOn(tillStore, 'useTillActions');
	const mockActions: Partial<jest.Mocked<tillStore.TillActions>> = {
		updateOpeningBalance: jest.fn(),
		updateTotalSales: jest.fn()
	};

	// Create a setup function to prepare the mock for each test.
	const setup = (initialState: { openingBalance?: number; totalSales?: number } = {}) => {
		useOpeningBalanceMock.mockReturnValue(initialState.openingBalance);
		useTotalSalesMock.mockReturnValue(initialState.totalSales);
		useTillActionsMock.mockReturnValue(mockActions as tillStore.TillActions);

		render(
			<ThemeProvider theme={theme}>
				<Config />
			</ThemeProvider>
		);

		const openingBalanceContainer = screen.getByTestId('opening-balance-section');
		const openingBalanceInput = within(openingBalanceContainer).getByRole('textbox');

		const totalSalesContainer = screen.getByTestId('total-sales-section');
		const totalSalesInput = within(totalSalesContainer).getByRole('textbox');

		return {
			user: userEvent.setup(),
			openingBalanceInput,
			totalSalesInput
		};
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it('renders all section titles', () => {
		setup();

		expect(screen.getByText('CURRENCY')).toBeInTheDocument();
		expect(screen.getByText('TENDER')).toBeInTheDocument();
		expect(screen.getByText('OPENING BALANCE')).toBeInTheDocument();
		expect(screen.getByText('TOTAL SALES')).toBeInTheDocument();
	});

	it('renders child input functions', () => {
		setup();

		// Two selects (CurrencySelect, TenderSelect)
		expect(screen.getAllByRole('combobox')).toHaveLength(2);

		// Two amount inputs (by helper text)
		expect(screen.getByText('Enter Opening Balance')).toBeInTheDocument();
		expect(screen.getByText('Enter Total Sales Amount')).toBeInTheDocument();
	});

	it('integrates selector functions: renders values from store', () => {
		setup({ openingBalance: 100.5, totalSales: 250.75 });

		// Assert formatted values
		expect(screen.getByDisplayValue('100.50')).toBeInTheDocument();
		expect(screen.getByDisplayValue('250.75')).toBeInTheDocument();
	});

	it('integrates selector functions: renders empty when selectors return undefined', () => {
		const { openingBalanceInput, totalSalesInput } = setup();

		// No formatted values present
		expect(screen.queryByDisplayValue('100.50')).not.toBeInTheDocument();
		expect(screen.queryByDisplayValue('250.75')).not.toBeInTheDocument();

		expect(openingBalanceInput).toHaveValue('');
		expect(totalSalesInput).toHaveValue('');
	});

	it('`updateOpeningBalance` and `updateTotalSales` are called with the correct values', async () => {
		const { user, openingBalanceInput, totalSalesInput } = setup();

		await user.type(openingBalanceInput, '100.50');
		await user.type(totalSalesInput, '1234.56');

		expect(mockActions.updateOpeningBalance).toHaveBeenCalledWith(100.5);
		expect(mockActions.updateTotalSales).toHaveBeenCalledWith(1234.56);
	});

	it('displays the correct tooltips on hover', async () => {
		const { user } = setup();

		// Define the expected tooltip texts
		const openingBalanceTooltip = 'The starting cash float for the register, to be used during the next day’s operations.';
		const totalSalesTooltip = 'The expected total cash sales recorded by the POS system for the day.';

		const openingBalanceIcon = screen.getByLabelText(openingBalanceTooltip);
		const totalSalesIcon = screen.getByLabelText(totalSalesTooltip);

		await user.hover(openingBalanceIcon);
		expect(await screen.findByText(openingBalanceTooltip)).toBeInTheDocument();
		await user.unhover(openingBalanceIcon);
		await waitForElementToBeRemoved(() => screen.queryByText(openingBalanceTooltip));

		await user.hover(totalSalesIcon);
		expect(await screen.findByText(totalSalesTooltip)).toBeInTheDocument();
		await user.unhover(totalSalesIcon);
		await waitForElementToBeRemoved(() => screen.queryByText(totalSalesTooltip));
	});
});
