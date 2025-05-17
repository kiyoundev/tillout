import { CashOptionSelect } from '../components/TenderSelect';
import { render, screen, fireEvent } from '@testing-library/react';

describe('CashOptionSelect', () => {
	// Test 1: Rendering with props
	test('renders correctly with provided props', () => {
		render(
			<CashOptionSelect
				selectedCashOption={defaultSelectedCashOption}
				onCashOptionChange={mockOnCashOptionChange}
			/>
		);

		// Check for the labels and initial states of the checkboxes
		expect(screen.getByLabelText('Banknotes')).toBeInTheDocument();
		expect(screen.getByLabelText('Banknotes')).toBeChecked();

		expect(screen.getByLabelText('Coins')).toBeInTheDocument();
		expect(screen.getByLabelText('Coins')).not.toBeChecked();

		expect(screen.getByLabelText('Rolled Coins')).toBeInTheDocument();
		expect(screen.getByLabelText('Rolled Coins')).not.toBeChecked();
	});
});
