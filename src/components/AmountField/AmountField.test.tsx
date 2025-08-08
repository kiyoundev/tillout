import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AmountField, AmountFieldProps, getSeparators } from './AmountField';

describe('AmountField helpers', () => {
	describe('getSeparators', () => {
		it('should return correct separators for a US locale', () => {
			const separators = getSeparators('us');
			expect(separators.thousandSeparator).toBe(',');
			expect(separators.decimalSeparator).toBe('.');
		});

		it('should return correct separators for a Euro locale', () => {
			const separators = getSeparators('eu');
			expect(separators.thousandSeparator).toBe('.');
			expect(separators.decimalSeparator).toBe(',');
		});
	});
});

describe('AmountField Component', () => {
	const mockOnValueChange = jest.fn();

	// Helper function to render the component with default and overridden props
	const setup = (props: Partial<AmountFieldProps> = {}) => {
		const defaultProps: AmountFieldProps = {
			label: 'Amount',
			currencyCode: 'us',
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

	beforeEach(() => {
		// Reset mocks before each test
		mockOnValueChange.mockClear();
	});

	it('renders correctly with label and helper text', () => {
		setup({ label: 'Test Amount', helperText: 'Enter the amount' });
		expect(screen.getByLabelText('Test Amount')).toBeInTheDocument();
		expect(screen.getByText('Enter the amount')).toBeInTheDocument();
	});

	it('displays the correct currency symbol', () => {
		setup({ value: 100 });
		expect(screen.getByText('$')).toBeInTheDocument();
	});

	it('formats the input and calls onValueChange when the user types', async () => {
		const { user, mockOnValueChange } = setup();
		const input = screen.getByLabelText('Amount');
		await user.type(input, '123456');

		expect(mockOnValueChange).toHaveBeenCalled();
		expect(mockOnValueChange).toHaveBeenLastCalledWith(123456);
	});

	it('disallows negative sign', async () => {
		const { user, mockOnValueChange } = setup();
		const input = screen.getByLabelText('Amount');
		await user.type(input, '-123');

		expect(mockOnValueChange).toHaveBeenLastCalledWith(123);
	});

	it('disallows characters or signs other than numbers', async () => {
		const { user, mockOnValueChange } = setup();
		const input = screen.getByLabelText('Amount');
		await user.type(input, 'abc');

		expect(mockOnValueChange).not.toHaveBeenCalled();
	});

	it('handles leading zeros correctly', async () => {
		const { user, mockOnValueChange } = setup();
		const input = screen.getByLabelText('Amount');
		await user.type(input, '05');

		expect(mockOnValueChange).toHaveBeenLastCalledWith(5);
	});

	it('handles decimal values correctly', async () => {
		const { user, mockOnValueChange } = setup();
		const input = screen.getByLabelText('Amount');
		await user.type(input, '12.34');

		expect(mockOnValueChange).toHaveBeenLastCalledWith(12.34);

		// Test that it respects the decimal scale by not allowing a third decimal digit
		await user.type(input, '5'); // input is now 12.345, but should be capped
		expect(mockOnValueChange).toHaveBeenLastCalledWith(12.34);
	});

	it('calls onValueChange with undefined when the input is cleared', async () => {
		const { user, mockOnValueChange } = setup({ value: 100 }); // Start with a value
		const input = screen.getByLabelText('Amount');
		await user.clear(input);

		// The last call should be with undefined
		expect(mockOnValueChange).toHaveBeenLastCalledWith(undefined);
	});

	it('correctly formats and displays an initial numeric value', () => {
		setup({ value: 1234.5, onValueChange: () => {} }); // Provide an initial value

		// The component should format the number to two decimal places for display.
		const input = screen.getByLabelText('Amount') as HTMLInputElement;
		expect(input.value).toBe('1,234.50');
	});
});
