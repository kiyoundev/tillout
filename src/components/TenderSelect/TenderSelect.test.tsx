import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TenderSelect } from './TenderSelect';
import { type TenderType } from '../../types';
import * as tillStore from '../../stores/tillStore';

describe('TenderSelect Component', () => {
	// Mock the entire store module to spy on its hooks.
	const useSelectedTenderMock = jest.spyOn(tillStore, 'useSelectedTender');
	const useTillActionsMock = jest.spyOn(tillStore, 'useTillActions');
	// Create a mock object for the store's actions.
	const mockActions: Partial<jest.Mocked<tillStore.TillActions>> = {
		// Only mock the action used by the component under test.
		updateSelectedTender: jest.fn()
	};

	// Create a setup function to prepare the mock for each test.
	const setup = (initialTenders: TenderType[] = []) => {
		// For each test, we define what our mocked hooks should return.
		useSelectedTenderMock.mockReturnValue(initialTenders);
		useTillActionsMock.mockReturnValue(mockActions as tillStore.TillActions);

		render(<TenderSelect />);

		return {
			user: userEvent.setup()
		};
	};

	// Reset all mocks before each test to prevent state leakage.
	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Write the tests using the setup function.
	it('renders with initial selections from the store', () => {
		setup(['bills', 'coins']);

		expect(screen.getByText('Banknotes')).toBeInTheDocument();
		expect(screen.getByText('Coins')).toBeInTheDocument();
	});

	it('renders with no initial selections', () => {
		setup();
		// Check for the helper text to ensure it rendered
		expect(screen.getByText('Select Tender Types')).toBeInTheDocument();
		// Check that no chips (selected items) are rendered
		expect(screen.queryAllByRole('button')).toHaveLength(1); // Only the dropdown arrow
	});

	it('renders the helper text', () => {
		setup();
		expect(screen.getByText('Select Tender Types')).toBeInTheDocument();
	});

	it('calls updateSelectedTender when a new option is clicked', async () => {
		const { user } = setup(['bills']);

		const input = screen.getByRole('combobox');
		await user.click(input);

		const coinsOption = await screen.findByRole('option', { name: 'Coins' });
		await user.click(coinsOption);

		expect(mockActions.updateSelectedTender).toHaveBeenCalledWith(['bills', 'coins']);
		expect(mockActions.updateSelectedTender).toHaveBeenCalledTimes(1);
	});

	it('removes a selection when an existing option is clicked', async () => {
		const { user } = setup(['bills', 'coins']);

		const input = screen.getByRole('combobox');
		await user.click(input);

		const coinsOption = await screen.findByRole('option', { name: 'Coins' });
		await user.click(coinsOption);

		expect(mockActions.updateSelectedTender).toHaveBeenCalledWith(['bills']);
		expect(mockActions.updateSelectedTender).toHaveBeenCalledTimes(1);
	});

	it('removes a selection when a chip is deleted', async () => {
		const { user } = setup(['bills', 'coins']);

		const banknotesChip = screen.getByRole('button', { name: 'Banknotes' });
		const deleteIcon = within(banknotesChip).getByTestId('CancelIcon');

		await user.click(deleteIcon);

		expect(mockActions.updateSelectedTender).toHaveBeenCalledWith(['coins']);
		expect(mockActions.updateSelectedTender).toHaveBeenCalledTimes(1);
	});

	it('removes all selections when the clear icon is clicked', async () => {
		const { user } = setup(['bills', 'coins']);

		const clearButton = screen.getByLabelText('Clear');
		await user.click(clearButton);

		expect(mockActions.updateSelectedTender).toHaveBeenCalledWith([]);
	});

	it('filters options when user types in the input', async () => {
		const { user } = setup();
		const input = screen.getByRole('combobox');

		await user.type(input, 'Coin');

		const options = await screen.findAllByRole('option');
		expect(options).toHaveLength(2); // 'Coins' and 'Coin Rolls'
		expect(screen.getByRole('option', { name: 'Coins' })).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'Rolled Coins' })).toBeInTheDocument();
		expect(screen.queryByRole('option', { name: 'Banknotes' })).not.toBeInTheDocument();
	});

	it('selects an option using the keyboard', async () => {
		const { user } = setup();
		const input = screen.getByRole('combobox');

		await user.click(input);
		await user.keyboard('{arrowdown}'); // Highlight first option ('Banknotes')
		await user.keyboard('{enter}'); // Select it

		expect(mockActions.updateSelectedTender).toHaveBeenCalledWith(['bills']);
		expect(mockActions.updateSelectedTender).toHaveBeenCalledTimes(1);
	});
});
