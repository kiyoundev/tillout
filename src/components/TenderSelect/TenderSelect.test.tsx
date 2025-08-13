import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TenderSelect, type TenderSelectProps } from './TenderSelect';
import { filterValues } from './TenderSelect.utils';
import { TENDER_TYPES } from '../../assets/currencies';
import { type TenderType } from '../../types';

describe('TenderSelect helpers', () => {
	describe('filterValues', () => {
		const options = Object.keys(TENDER_TYPES) as TenderType[];

		it('should filter by key', () => {
			expect(filterValues(options, 'bills')).toEqual(['bills']);
		});

		it('should filter by value and include partial matches', () => {
			// 'Coin Rolls' includes 'Coins', so both are expected
			expect(filterValues(options, 'Coins')).toEqual(['coins', 'rolls']);
		});

		it('should be case-insensitive', () => {
			expect(filterValues(options, 'rOlLs')).toEqual(['rolls']);
		});

		it('should return all options for an empty search', () => {
			expect(filterValues(options, '')).toEqual(options);
		});

		it('should return an empty array for no matches', () => {
			expect(filterValues(options, 'nonexistent')).toEqual([]);
		});
	});
});

describe('TenderSelect Component', () => {
	const mockOnTenderChange = jest.fn();

	const setup = (props: Partial<TenderSelectProps> = {}) => {
		const defaultProps: TenderSelectProps = {
			selectedTender: [],
			onTenderChange: mockOnTenderChange
		};

		render(<TenderSelect {...defaultProps} {...props} />);

		return {
			user: userEvent.setup(),
			mockOnTenderChange
		};
	};

	beforeEach(() => {
		mockOnTenderChange.mockClear();
	});

	it('renders with initial selections', () => {
		setup({ selectedTender: ['bills', 'coins'] });

		expect(screen.getByText('Banknotes')).toBeInTheDocument();
		expect(screen.getByText('Coins')).toBeInTheDocument();
	});

	it('adds a selection when a new option is clicked', async () => {
		const { user, mockOnTenderChange } = setup({ selectedTender: ['bills'] });

		const input = screen.getByRole('combobox');
		await user.click(input);

		const coinsOption = await screen.findByText('Coins');
		await user.click(coinsOption);

		expect(mockOnTenderChange).toHaveBeenCalledWith(['bills', 'coins']);
		expect(mockOnTenderChange).toHaveBeenCalledTimes(1);
	});

	it('removes a selection when a chip is deleted', async () => {
		const { user, mockOnTenderChange } = setup({ selectedTender: ['bills', 'coins'] });

		// Find the chip containing 'Banknotes', then find the delete icon within that chip.
		const banknotesChip = screen.getByRole('button', { name: 'Banknotes' });
		const deleteIcon = within(banknotesChip).getByTestId('CancelIcon');

		await user.click(deleteIcon);

		expect(mockOnTenderChange).toHaveBeenCalledWith(['coins']);
		expect(mockOnTenderChange).toHaveBeenCalledTimes(1);
	});

	it('removes all selections when the clear icon is clicked', async () => {
		const { user, mockOnTenderChange } = setup({ selectedTender: ['bills', 'coins'] });

		// The main clear button has a title of 'Clear'
		const clearButton = screen.getByTitle('Clear');
		await user.click(clearButton);

		expect(mockOnTenderChange).toHaveBeenCalledWith([]);
		expect(mockOnTenderChange).toHaveBeenCalledTimes(1);
	});
});
