import { create } from 'zustand';
import { type CurrencyCode, type TenderType, type Counts } from '../types';

// Define the shape of a single till
// export interface Till {
// 	id: string;
// 	name: string; // e.g., "Register 1"
// 	counts: { [denomination: string]: number }; // e.g., { '20': 5, '10': 10 }
// 	openingBalance: number;
// 	cashSales: number;
// }

// Define till actions
export interface TillActions {
	updateCurrencyCode: (currencyCode: CurrencyCode) => void;
	updateSelectedTender: (selectedTender: TenderType[]) => void;
	updateOpeningBalance: (openingBalance: number | undefined) => void;
	updateTotalSales: (totalSales: number | undefined) => void;
	updateCount: (tenderType: TenderType, denomination: string, count: number | undefined) => void;
	// addTill: (name: string) => void;
	// setActiveTill: (id: string) => void;
	// updateTillValue: (tillId: string, denomination: string, count: number) => void;
	// setCurrency: (currency: 'USD' | 'CAD' | 'EUR') => void;
	// setSelectedTenders: (tenders: { bills: boolean; coins: boolean; rolls: boolean }) => void;
	// updateFinancials: (tillId: string, openingBalance: number, cashSales: number) => void;
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

// Create the store
// export const useTillStore = create<TillState & TillActions>((set) => ({
// 	// initial state

// 	// post-mvp
// 	// tills: [],
// 	// activeTillId: null,

// 	// Actions implementation
// 	// addTill: (name) =>
// 	// 	set((state) => {
// 	// 		const newTill: Till = {
// 	// 			id: `till-${Date.now()}`,
// 	// 			name,
// 	// 			counts: {},
// 	// 			openingBalance: 0,
// 	// 			cashSales: 0
// 	// 		};
// 	// 		return { tills: [...state.tills, newTill], activeTillId: newTill.id };
// 	// 	}),

// 	// setActiveTill: (id) => set({ activeTillId: id }),

// 	// updateTillValue: (tillId, denomination, count) =>
// 	// 	set((state) => {
// 	// 		const updatedTills = state.tills.map((till) => {
// 	// 			if (till.id === tillId) {
// 	// 				return {
// 	// 					...till,
// 	// 					counts: {
// 	// 						...till.counts,
// 	// 						[denomination]: count
// 	// 					}
// 	// 				};
// 	// 			}
// 	// 			return till;
// 	// 		});
// 	// 		return { tills: updatedTills };
// 	// 	}),

// 	// setCurrency: (currency) => set({ currency }),

// 	// setSelectedTenders: (tenders) => set({ selectedTenders: tenders }),

// 	// updateFinancials: (tillId, openingBalance, cashSales) =>
// 	// 	set((state) => {
// 	// 		const updatedTills = state.tills.map((till) => {
// 	// 			if (till.id === tillId) {
// 	// 				return { ...till, openingBalance, cashSales };
// 	// 			}
// 	// 			return till;
// 	// 		});
// 	// 		return { tills: updatedTills };
// 	// 	})
// }));
