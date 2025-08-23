import { act, renderHook } from '@testing-library/react';
import { useTillStore } from './tillStore';
import { type TenderType } from '../../types';

describe('useTillStore', () => {
	const initialState = useTillStore.getState();

	// Reset store before each test
	beforeEach(() => {
		act(() => {
			useTillStore.setState(initialState);
		});
	});

	it('should initialize with default values', () => {
		const { result } = renderHook(() => useTillStore());

		expect(result.current.currencyCode).toBe('us');
		expect(result.current.selectedTender).toEqual([]);
		expect(result.current.openingBalance).toBeUndefined();
		expect(result.current.totalSales).toBeUndefined();
		expect(result.current.counts).toEqual({
			bills: {},
			coins: {},
			rolls: {}
		});
	});

	it('should update currency code', () => {
		const { result } = renderHook(() => useTillStore());

		act(() => {
			result.current.actions.updateCurrencyCode('ca');
		});

		expect(result.current.currencyCode).toBe('ca');
	});

	it('should update selected tenders', () => {
		const { result } = renderHook(() => useTillStore());
		const newTenders = ['bills', 'coins'] as TenderType[];

		act(() => {
			result.current.actions.updateSelectedTender(newTenders);
		});

		expect(result.current.selectedTender).toEqual(newTenders);
	});

	it('should update opening balance', () => {
		const { result } = renderHook(() => useTillStore());

		act(() => {
			result.current.actions.updateOpeningBalance(150.75);
		});

		expect(result.current.openingBalance).toBe(150.75);
	});

	it('should update total sales', () => {
		const { result } = renderHook(() => useTillStore());

		act(() => {
			result.current.actions.updateTotalSales(899.99);
		});

		expect(result.current.totalSales).toBe(899.99);
	});

	it('should update a denomination count', () => {
		const { result } = renderHook(() => useTillStore());

		act(() => {
			result.current.actions.updateCount('bills', '20', 5);
		});

		expect(result.current.counts.bills['20']).toBe(5);

		// Ensure other counts are not affected
		expect(result.current.counts.coins).toEqual({});
	});

	it('should update multiple denomination counts correctly', () => {
		const { result } = renderHook(() => useTillStore());

		act(() => {
			result.current.actions.updateCount('bills', '20', 5);
			result.current.actions.updateCount('coins', '0.25', 10);
		});

		expect(result.current.counts.bills['20']).toBe(5);
		expect(result.current.counts.coins['0.25']).toBe(10);
	});
});
