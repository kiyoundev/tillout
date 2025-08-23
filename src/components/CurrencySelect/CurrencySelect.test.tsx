import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CurrencySelect } from './CurrencySelect';
import * as tillStore from '../../stores/tillStore';
import { type CurrencyCode } from '../../types';

describe('CurrencySelect Component', () => {
	const useCurrencyCodeMock = jest.spyOn(tillStore, 'useCurrencyCode');
	const useTillActionsMock = jest.spyOn(tillStore, 'useTillActions');
	const mockActions: Partial<jest.Mocked<tillStore.TillActions>> = {
		updateCurrencyCode: jest.fn()
	};

	// Create a setup function to prepare the mock for each test.
	const setup = (initialCurrencyCode: CurrencyCode) => {
		// For each test, we define what our mocked hooks should return.
		useCurrencyCodeMock.mockReturnValue(initialCurrencyCode);
		useTillActionsMock.mockReturnValue(mockActions as tillStore.TillActions);

		render(<CurrencySelect />);

		return {
			user: userEvent.setup()
		};
	};

	// Reset all mocks before each test to prevent state leakage.
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it('renders with the initial currency code correctly', () => {
		setup('us');

		// Check for the rendered value, which includes the label and name
		expect(screen.getByText('USD')).toBeInTheDocument();
		expect(screen.getByText('- US Dollar')).toBeInTheDocument();
	});

	it('updates the currency code when a new currency is selected', async () => {
		const { user } = setup('us');

		// Find the autocomplete input field
		const input = screen.getByRole('combobox');

		// Click the input to open the dropdown
		await user.click(input);

		// Find and click the 'Euro' option in the listbox that appears
		const euroOption = await screen.findByText('EUR Euro');
		await user.click(euroOption);

		// Verify that the callback was called with the correct new currency code
		expect(mockActions.updateCurrencyCode).toHaveBeenCalledWith('eu');
		expect(mockActions.updateCurrencyCode).toHaveBeenCalledTimes(1);
	});

	it('renders correctly with helper text', () => {
		setup('us');

		expect(screen.getByText('Select a currency')).toBeInTheDocument();
	});

	it('renders correctly with placeholder when focused', async () => {
		const { user } = setup('us');

		const input = screen.getByRole('combobox');
		await user.click(input);

		expect(screen.getByPlaceholderText('Type to search...')).toBeInTheDocument();
	});
});
