// src/stores/tillStore.ts
import { create } from 'zustand';
import React, { createContext, useContext } from 'react';
import { type CurrencyCode, type TenderType, type Counts } from '../types';

export interface TillActions {
	updateCurrencyCode: (currencyCode: CurrencyCode) => void;
	updateSelectedTender: (selectedTender: TenderType[]) => void;
	updateOpeningBalance: (openingBalance: number | undefined) => void;
	updateTotalSales: (totalSales: number | undefined) => void;
	updateCount: (tenderType: TenderType, denomination: string, count: number | undefined) => void;
	resetCount: () => void;
}

export interface TillState {
	currencyCode: CurrencyCode;
	selectedTender: TenderType[];
	openingBalance: number | undefined;
	totalSales: number | undefined;
	counts: Counts;
	actions: TillActions;
}

interface StoreProviderProps {
	children: React.ReactNode;
	store: ReturnType<typeof createTillStore>;
}

// Factory: create a fresh store hook
export const createTillStore = (init?: Partial<TillState>) => {
	return create<TillState>((set) => ({
		currencyCode: 'us',
		selectedTender: [],
		openingBalance: undefined,
		totalSales: undefined,
		counts: { bills: {}, coins: {}, rolls: {} },
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
			resetCount: () => set({ counts: { bills: {}, coins: {}, rolls: {} } })
		},
		...init
	}));
};

// Singleton (app-wide)
export const useTillStore = createTillStore();

// Context + Provider
const StoreContext = createContext<ReturnType<typeof createTillStore> | null>(null);

export function StoreProvider({ children, store }: StoreProviderProps) {
	return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

// Selector hook to use context or fallback to singleton
export const useStoreSelector = <T,>(selector: (s: TillState) => T): T => {
	const contextStore = useContext(StoreContext);
	const storeHook = contextStore ?? useTillStore;
	return storeHook(selector);
};

// States
export const useTillActions = () => useStoreSelector((state) => state.actions);
export const useCurrencyCode = () => useStoreSelector((state) => state.currencyCode);
export const useSelectedTender = () => useStoreSelector((state) => state.selectedTender);
export const useOpeningBalance = () => useStoreSelector((state) => state.openingBalance);
export const useTotalSales = () => useStoreSelector((state) => state.totalSales);
export const useCounts = () => useStoreSelector((state) => state.counts);

// Actions
export const useUpdateCurrencyCode = () => useStoreSelector((state) => state.actions.updateCurrencyCode);
export const useUpdateSelectedTender = () => useStoreSelector((state) => state.actions.updateSelectedTender);
export const useUpdateOpeningBalance = () => useStoreSelector((state) => state.actions.updateOpeningBalance);
export const useUpdateTotalSales = () => useStoreSelector((state) => state.actions.updateTotalSales);
export const useUpdateCount = () => useStoreSelector((state) => state.actions.updateCount);
export const useResetCount = () => useStoreSelector((state) => state.actions.resetCount);
