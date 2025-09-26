import type Big from 'big.js';

export type CurrencyCode = 'us' | 'ca' | 'au' | 'nz' | 'eu' | 'gb';

export interface Currency {
	label: string;
	name: string;
	symbol: string;
	locale: string;
	denomination: {
		bills: string[];
		coins: string[];
		rolls: Record<string, string>;
	};
}

export type TenderType = keyof Currency['denomination'];

export type Counts = Record<TenderType, Record<string, number | undefined>>;

export type DepositAction = {
	type: 'BREAK_ROLL' | 'CHECK_COUNT';
	message: string;
	denominationsToHighlight?: string[];
};

export type DepositBreakdown = {
	[Tender in TenderType]?: { [denom: string]: number };
};

export type DepositSubtotals = {
	[Tender in TenderType]?: Big;
};

export type DepositSummary = {
	totalDeposit: Big;
	breakdown: DepositBreakdown;
	subtotals: DepositSubtotals;
	actions: DepositAction[];
};
