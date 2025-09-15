import Big from 'big.js';

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

// export interface SelectedTender {
// 	bills: boolean;
// 	coins: boolean;
// 	rolls: boolean;
// }

// export interface ACTIONTYPE {
// 	type: 'input' | 'reset' | 'clear' | 'blur' | 'selectOption' | 'removeOption' | 'focus' | '';
// 	payload: string;
// }

// export interface CashOptionSelectProps {
// 	selectedCashOption: SelectedCashOption;
// 	onCashOptionChange: (selectedCashOption: SelectedCashOption) => void;
// }

// export interface SalesAmountInputProp {
// 	currency: Currency;
// }

// export interface FormInputProps {
// 	cashTypes: Currency['denomination'];
// 	symbol: Currency['symbol'];
// 	selectedCashOption: SelectedCashOption;
// }

// export type Type<T extends Tender> = T extends 'rolls'
// 	? keyof Currency['cashTypes']['rolls']
// 	: T extends 'bills' | 'coins'
// 	? Currency['cashTypes'][T][number]
// 	: never;
// export type Data = { [T in Tender]: Record<Type<T>, Value> } & { rollsFaceValue: Record<string, string> };
// export type Value = string;
// export type Symbol = Currency['symbol'];
// export type PreData = Omit<Currency['cashTypes'], 'rolls'> & {
// 	rolls: string[];
// };
