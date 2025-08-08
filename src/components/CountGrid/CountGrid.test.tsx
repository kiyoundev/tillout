import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CountGrid, CountGridProps } from './CountGrid';
import { getCurrency, getColumnSize } from '../../utils/util';

describe('CountGrid Component', () => {
	const mockOnDataChange = jest.fn();

		const setup = (props: Partial<CountGridProps> = {}) => {
		const defaultProps: CountGridProps = {
			currencyCode: 'us',
			tenderType: 'bills',
			counts: { bills: {}, coins: {}, rolls: {} },
			onDataChange: mockOnDataChange,
			columnSize: getColumnSize('us')
		};

		render(<CountGrid {...defaultProps} {...props} />);

		return {
			user: userEvent.setup()
		};
	};

	beforeEach(() => {
		mockOnDataChange.mockClear();
	});

	const testCases: { currencyCode: 'us' | 'ca'; tenderType: 'bills' | 'coins' | 'rolls' }[] = [
		{ currencyCode: 'us', tenderType: 'bills' },
		{ currencyCode: 'us', tenderType: 'coins' },
		{ currencyCode: 'us', tenderType: 'rolls' },
		{ currencyCode: 'ca', tenderType: 'bills' }
	];

	it.each(testCases)('renders the correct denominations for each currencyCode and tenderType', ({ currencyCode, tenderType }) => {
		const currency = getCurrency(currencyCode);
		const denominations = tenderType === 'rolls' ? Object.keys(currency.denomination.rolls) : currency.denomination[tenderType];

		setup({ currencyCode, tenderType, columnSize: getColumnSize(currencyCode) });

		// Check that each denomination has a corresponding input field with label
		denominations.forEach((denomination: string) => {
			expect(screen.getByLabelText(denomination)).toBeInTheDocument();
		});

		// Ensure no extra fields are rendered
		const inputs = screen.getAllByRole('textbox');
		expect(inputs.length).toBe(denominations.length);
	});

	it('maps initial counts to inputs correctly', () => {
		const initialCounts = {
			bills: { $20: 3 },
			coins: {},
			rolls: {}
		};

		setup({ counts: initialCounts });

		const twentyDollarInput = screen.getByLabelText('$20') as HTMLInputElement;
		expect(twentyDollarInput.value).toBe('3');
	});

	it('handles data changes correctly on user input', async () => {
		const { user } = setup();

		const fiftyDollarInput = screen.getByLabelText('$50');
		await user.type(fiftyDollarInput, '5');

		expect(mockOnDataChange).toHaveBeenCalledWith('$50', 5, 'bills');
	});
});
