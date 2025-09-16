import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CountGrid, CountGridProps } from './CountGrid';
import { getCurrency } from '@/utils/util';
import { type Counts, type CurrencyCode, type TenderType } from '@/types';
import * as tillStore from '@/stores/tillStore';

const useCurrencyCodeMock = jest.spyOn(tillStore, 'useCurrencyCode');
const useCountsMock = jest.spyOn(tillStore, 'useCounts');
const useTillActionsMock = jest.spyOn(tillStore, 'useTillActions');

describe('CountGrid Component', () => {
	const mockActions: Partial<jest.Mocked<tillStore.TillActions>> = {
		updateCount: jest.fn()
	};

	const setup = (props: CountGridProps, initialCounts: Counts, initialCurrencyCode: CurrencyCode) => {
		// For each test, we define what our mocked hooks should return.
		useCurrencyCodeMock.mockReturnValue(initialCurrencyCode);
		useTillActionsMock.mockReturnValue(mockActions as tillStore.TillActions);
		useCountsMock.mockReturnValue(initialCounts);

		render(<CountGrid {...props} />);

		return {
			user: userEvent.setup()
		};
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	const testCases: { currencyCode: CurrencyCode; tenderType: TenderType }[] = [
		{ currencyCode: 'us', tenderType: 'bills' },
		{ currencyCode: 'us', tenderType: 'coins' },
		{ currencyCode: 'us', tenderType: 'rolls' },
		{ currencyCode: 'ca', tenderType: 'bills' }
	];

	it.each(testCases)('renders the correct denominations for each currencyCode and tenderType', ({ currencyCode, tenderType }) => {
		const initialCounts: Counts = { bills: {}, coins: {}, rolls: {} };
		setup({ tenderType }, initialCounts, currencyCode); // setup configures the spies for this test

		// Check that each denomination has a corresponding input field with label
		const currency = getCurrency(currencyCode);
		const denominations = tenderType === 'rolls' ? Object.keys(currency.denomination[tenderType]) : currency.denomination[tenderType];

		denominations.forEach((denomination: string) => {
			expect(screen.getByLabelText(denomination)).toBeInTheDocument();
		});

		// Ensure no extra fields are rendered
		const inputs = screen.getAllByRole('textbox');
		expect(inputs.length).toBe(denominations.length);
	});

	it('maps initial counts to inputs correctly', () => {
		const initialCounts: Counts = {
			bills: { $20: 3 },
			coins: {},
			rolls: {}
		};

		setup({ tenderType: 'bills' }, initialCounts, 'us');

		const twentyDollarInput = screen.getByLabelText('$20') as HTMLInputElement;
		expect(twentyDollarInput.value).toBe('3');
	});

	it('handles data changes correctly on user input', async () => {
		const { user } = setup({ tenderType: 'bills' }, { bills: {}, coins: {}, rolls: {} }, 'us');

		const fiftyDollarInput = screen.getByLabelText('$50');
		await user.type(fiftyDollarInput, '5');

		expect(mockActions.updateCount).toHaveBeenLastCalledWith('bills', '$50', 5);
	});
});
