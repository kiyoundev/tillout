import { create } from 'zustand';
import { type CurrencyCode, type TenderType, type Counts } from '../types';

// Define till actions
export interface TillActions {
	updateCurrencyCode: (currencyCode: CurrencyCode) => void;
	updateSelectedTender: (selectedTender: TenderType[]) => void;
	updateOpeningBalance: (openingBalance: number | undefined) => void;
	updateTotalSales: (totalSales: number | undefined) => void;
	updateCount: (tenderType: TenderType, denomination: string, count: number | undefined) => void;
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
			}))
	}
}));

// Custom Hooks
export const useCurrencyCode = () => useTillStore((state) => state.currencyCode);
export const useSelectedTender = () => useTillStore((state) => state.selectedTender);
export const useOpeningBalance = () => useTillStore((state) => state.openingBalance);
export const useTotalSales = () => useTillStore((state) => state.totalSales);
export const useCounts = () => useTillStore((state) => state.counts);
export const useTillActions = () => useTillStore((state) => state.actions);
