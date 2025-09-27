import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CountField, type CountFieldProps } from './CountField';

describe('CountField Component', () => {
	const mockOnValueChange = jest.fn();

	// Helper function to render the component with default and overridden props
	const setup = (props: Partial<CountFieldProps> = {}) => {
		const defaultProps: CountFieldProps = {
			label: 'Count',
			value: undefined,
			onValueChange: mockOnValueChange
		};

		const result = render(
			<CountField
				{...defaultProps}
				{...props}
			/>
		);

		return {
			user: userEvent.setup(),
			mockOnValueChange,
			...result
		};
	};

	beforeEach(() => {
		// Reset mocks before each test
		mockOnValueChange.mockClear();
	});

	it('renders correctly with a given value', () => {
		setup({ value: 10 });
		const inputWithValue = screen.getByRole('textbox', { name: /count/i }) as HTMLInputElement;
		expect(inputWithValue.value).toBe('10');
	});

	it('handles valid input correctly', async () => {
		const { user, mockOnValueChange } = setup();
		const input = screen.getByRole('textbox', { name: /count/i });
		await user.type(input, '12');

		// The last call should have the complete number
		expect(mockOnValueChange).toHaveBeenLastCalledWith({ formattedValue: '12', value: '12', floatValue: 12 }, expect.any(Object));
		expect(mockOnValueChange).toHaveBeenCalledTimes(2);
	});

	it('disallows negative numbers', async () => {
		const { user, mockOnValueChange } = setup();
		const input = screen.getByRole('textbox', { name: /count/i }) as HTMLInputElement;
		await user.type(input, '-5');

		expect(input.value).toBe('5');
		expect(mockOnValueChange).toHaveBeenLastCalledWith({ formattedValue: '5', value: '5', floatValue: 5 }, expect.any(Object));
	});

	it('disallows decimal points', async () => {
		const { user, mockOnValueChange } = setup();
		const input = screen.getByRole('textbox', { name: /count/i }) as HTMLInputElement;
		await user.type(input, '1.5');

		expect(input.value).toBe('15'); // The decimal point is ignored
		expect(mockOnValueChange).toHaveBeenLastCalledWith({ formattedValue: '15', value: '15', floatValue: 15 }, expect.any(Object));
	});

	it('disallows non-numeric characters', async () => {
		const { user, mockOnValueChange } = setup();
		const input = screen.getByRole('textbox', { name: /count/i }) as HTMLInputElement;
		await user.type(input, 'a1b');

		expect(input.value).toBe('1');
		expect(mockOnValueChange).toHaveBeenCalledTimes(1);
		expect(mockOnValueChange).toHaveBeenCalledWith({ formattedValue: '1', value: '1', floatValue: 1 }, expect.any(Object));
	});

	it('handles empty/cleared input correctly', async () => {
		const { user, mockOnValueChange } = setup({ value: 42 });
		const input = screen.getByRole('textbox', { name: /count/i }) as HTMLInputElement;

		// Clear the input
		await user.clear(input);

		expect(input.value).toBe('');
		expect(mockOnValueChange).toHaveBeenCalledWith({ formattedValue: '', value: '', floatValue: undefined }, expect.any(Object));
	});
});
