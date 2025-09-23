import { create } from 'zustand';
import { type CurrencyCode, type TenderType, type Counts } from '../types';

// Define till actions
export interface TillActions {
	updateCurrencyCode: (currencyCode: CurrencyCode) => void;
	updateSelectedTender: (selectedTender: TenderType[]) => void;
	updateOpeningBalance: (openingBalance: number | undefined) => void;
	updateTotalSales: (totalSales: number | undefined) => void;
	updateCount: (tenderType: TenderType, denomination: string, count: number | undefined) => void;
	resetCount: () => void; // Add this line
}

export interface TillState {
	currencyCode: CurrencyCode;
	selectedTender: TenderType[];
	openingBalance: number | undefined;
	totalSales: number | undefined;
	counts: Counts;
	actions: TillActions;
}

export const useTillStore = create<TillState>((set) => ({
	// initial state
	currencyCode: 'us',
	selectedTender: [],
	openingBalance: undefined,
	totalSales: undefined,
	counts: {
		bills: {},
		coins: {},
		rolls: {}
	},

	// till actions
	actions: {
		updateCurrencyCode: (currencyCode) => set({ currencyCode }),
		updateSelectedTender: (selectedTender) => set({ selectedTender }),
		updateOpeningBalance: (openingBalance) => set({ openingBalance }),
		updateTotalSales: (totalSales) => set({ totalSales }),
		updateCount: (tenderType, denomination, count) =>
			set((state) => ({
				counts: {
					...state.counts,
					[tenderType]: {
						...state.counts[tenderType],
						[denomination]: count
					}
				}
			})),
		resetCount: () =>
			set({
				counts: {
					bills: {},
					coins: {},
					rolls: {}
				}
			})
	}
}));

// Custom Hooks - wrapped in a mutable object for mocking
export const storeHooks = {
	useCurrencyCode: () => useTillStore((state) => state.currencyCode),
	useSelectedTender: () => useTillStore((state) => state.selectedTender),
	useOpeningBalance: () => useTillStore((state) => state.openingBalance),
	useTotalSales: () => useTillStore((state) => state.totalSales),
	useCounts: () => useTillStore((state) => state.counts),
	useTillActions: () => useTillStore((state) => state.actions),
	useResetCount: () => useTillStore((state) => state.actions.resetCount)
};

export const useCurrencyCode = () => storeHooks.useCurrencyCode();
export const useSelectedTender = () => storeHooks.useSelectedTender();
export const useOpeningBalance = () => storeHooks.useOpeningBalance();
export const useTotalSales = () => storeHooks.useTotalSales();
export const useCounts = () => storeHooks.useCounts();
export const useTillActions = () => storeHooks.useTillActions();
export const useResetCount = () => storeHooks.useResetCount();
