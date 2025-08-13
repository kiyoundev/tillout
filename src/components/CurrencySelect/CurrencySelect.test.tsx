import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CurrencySelect, type CurrencySelectProps } from './CurrencySelect';
import { filterValues } from './CurrencySelect.utils';
import { CURRENCY_CODES } from '../../assets/currencies';

describe('CurrencySelect helpers', () => {
	describe('filterValues', () => {
		it('should filter options based on currency label (code)', () => {
			const filtered = filterValues(CURRENCY_CODES, 'gb');
			expect(filtered).toEqual(['gb']);
		});

		it('should filter options based on currency name', () => {
			// 'us' -> 'US Dollar', 'ca' -> 'Canadian Dollar'
			const filtered = filterValues(CURRENCY_CODES, 'Dollar');
			expect(filtered).toEqual(expect.arrayContaining(['us', 'ca', 'au', 'nz']));
			expect(filtered.length).toBe(4);
		});

		it('should be case-insensitive', () => {
			const filtered = filterValues(CURRENCY_CODES, 'dollar');
			expect(filtered).toEqual(expect.arrayContaining(['us', 'ca', 'au', 'nz']));
			expect(filtered.length).toBe(4);
		});

		it('should return an empty array if no match is found', () => {
			const filtered = filterValues(CURRENCY_CODES, 'nonexistent');
			expect(filtered).toEqual([]);
		});

		it('should return all options for an empty search string', () => {
			const filtered = filterValues(CURRENCY_CODES, '');
			expect(filtered).toEqual(CURRENCY_CODES);
		});
	});
});

describe('CurrencySelect Component', () => {
	const mockOnCurrencyChange = jest.fn();

	const setup = (props: Partial<CurrencySelectProps> = {}) => {
		const defaultProps: CurrencySelectProps = {
			currencyCode: 'us',
			onCurrencyChange: mockOnCurrencyChange
		};

		render(<CurrencySelect {...defaultProps} {...props} />);

		return {
			user: userEvent.setup(),
			mockOnCurrencyChange
		};
	};

	beforeEach(() => {
		mockOnCurrencyChange.mockClear();
	});

	it('renders with the initial currency code correctly', () => {
		setup();

		// Check for the rendered value, which includes the label and name
		expect(screen.getByText('USD')).toBeInTheDocument();
		expect(screen.getByText('- US Dollar')).toBeInTheDocument();
	});

	it('calls onCurrencyChange when a new currency is selected', async () => {
		const { user, mockOnCurrencyChange } = setup();

		// Find the autocomplete input field
		const input = screen.getByRole('combobox');

		// Click the input to open the dropdown
		await user.click(input);

		// Find and click the 'Euro' option in the listbox that appears
		const euroOption = await screen.findByText('EUR Euro');
		await user.click(euroOption);

		// Verify that the callback was called with the correct new currency code
		expect(mockOnCurrencyChange).toHaveBeenCalledWith('eu');
		expect(mockOnCurrencyChange).toHaveBeenCalledTimes(1);
	});

	it('renders correctly with helper text', () => {
		setup({ helperText: 'Select a currency' });

		expect(screen.getByText('Select a currency')).toBeInTheDocument();
	});

	it('renders correctly with placeholder when focused', async () => {
		const { user } = setup();

		const input = screen.getByRole('combobox');
		await user.click(input);

		expect(screen.getByPlaceholderText('Type to search...')).toBeInTheDocument();
	});
});
