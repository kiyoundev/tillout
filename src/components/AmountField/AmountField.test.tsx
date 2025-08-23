import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AmountField, type AmountFieldProps } from './AmountField';
import * as tillStore from '../../stores/tillStore';
import { type CurrencyCode } from '../../types';

describe('AmountField Component', () => {
	const useCurrencyCodeMock = jest.spyOn(tillStore, 'useCurrencyCode');
	const mockOnValueChange = jest.fn();

	// Helper function to render the component with default and overridden props
	const setup = (props: Partial<AmountFieldProps> = {}, currencyCode: CurrencyCode = 'us') => {
		// Mock the currency code hook to return the specified currency
		useCurrencyCodeMock.mockReturnValue(currencyCode);

		const defaultProps: AmountFieldProps = {
			value: undefined,
			onValueChange: mockOnValueChange
		};

		render(
			<AmountField
				{...defaultProps}
				{...props}
			/>
		);

		return {
			user: userEvent.setup(),
			mockOnValueChange
		};
	};

	// Reset all mocks before each test to prevent state leakage
	beforeEach(() => {
		jest.clearAllMocks();
		mockOnValueChange.mockClear();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it('renders correctly with helper text', () => {
		setup({ helperText: 'Enter the amount' });
		expect(screen.getByText('Enter the amount')).toBeInTheDocument();
	});

	it('displays the correct currency symbol for USD', () => {
		setup({ value: 100 }, 'us');
		expect(screen.getByText(/\$/)).toBeInTheDocument();
	});

	it('displays the correct currency symbol for Euro', () => {
		setup({ value: 100 }, 'eu');
		expect(screen.getByText(/€/)).toBeInTheDocument();
	});

	it('formats the input and calls onValueChange when the user types', async () => {
		const { user, mockOnValueChange } = setup();
		const input = screen.getByRole('textbox');
		await user.type(input, '123456');

		expect(mockOnValueChange).toHaveBeenCalled();
		expect(mockOnValueChange).toHaveBeenLastCalledWith(123456);
	});

	it('disallows negative sign', async () => {
		const { user, mockOnValueChange } = setup();
		const input = screen.getByRole('textbox');
		await user.type(input, '-123');

		expect(mockOnValueChange).toHaveBeenLastCalledWith(123);
	});

	it('disallows characters or signs other than numbers', async () => {
		const { user, mockOnValueChange } = setup();
		const input = screen.getByRole('textbox');
		await user.type(input, 'abc');

		expect(mockOnValueChange).not.toHaveBeenCalled();
	});

	it('handles leading zeros correctly', async () => {
		const { user, mockOnValueChange } = setup();
		const input = screen.getByRole('textbox');
		await user.type(input, '05');

		expect(mockOnValueChange).toHaveBeenLastCalledWith(5);
	});

	it('handles decimal values correctly with US format', async () => {
		const { user, mockOnValueChange } = setup({}, 'us');
		const input = screen.getByRole('textbox');
		await user.type(input, '12.34');

		expect(mockOnValueChange).toHaveBeenLastCalledWith(12.34);

		// Test that it respects the decimal scale by not allowing a third decimal digit
		await user.type(input, '5'); // input is now 12.345, but should be capped
		expect(mockOnValueChange).toHaveBeenLastCalledWith(12.34);
	});

	it('handles decimal values correctly with Euro format', async () => {
		const { user, mockOnValueChange } = setup({}, 'eu');
		const input = screen.getByRole('textbox');
		await user.type(input, '12,34');

		expect(mockOnValueChange).toHaveBeenLastCalledWith(12.34);

		// Test that it respects the decimal scale by not allowing a third decimal digit
		await user.type(input, '5'); // input is now 12,345, but should be capped
		expect(mockOnValueChange).toHaveBeenLastCalledWith(12.34);
	});

	it('calls onValueChange with undefined when the input is cleared', async () => {
		const { user, mockOnValueChange } = setup({ value: 100 }); // Start with a value
		const input = screen.getByRole('textbox');
		await user.clear(input);

		// The last call should be with undefined
		expect(mockOnValueChange).toHaveBeenLastCalledWith(undefined);
	});

	it('displays an initial numeric value with US format', () => {
		setup({ value: 1234.5 }, 'us'); // Provide an initial value with US currency

		// The component should format the number using US format (comma as thousand separator, period as decimal)
		const input = screen.getByRole('textbox') as HTMLInputElement;
		expect(input.value).toBe('1,234.50');
	});

	it('correctly formats and displays an initial numeric value with Euro format', () => {
		setup({ value: 1234.5 }, 'eu'); // Provide an initial value with European currency

		// The component should format the number using European format (period as thousand separator, comma as decimal)
		const input = screen.getByRole('textbox') as HTMLInputElement;
		expect(input.value).toBe('1.234,50');
	});
});
