export type CurrencyCode = 'us' | 'ca' | 'au' | 'nz' | 'eu' | 'gb';

export interface Currency {
	label: string;
	name: string;
	symbol: string;
	cashTypes: {
		bills: string[];
		coins: string[];
		rolls: Record<string, string>;
	};
}

export interface SelectedTender {
	bills: boolean;
	coins: boolean;
	rolls: boolean;
}

export interface ACTIONTYPE {
	type: 'input' | 'reset' | 'clear' | 'blur' | 'selectOption' | 'removeOption' | 'focus' | '';
	payload: string;
}

export interface CashOptionSelectProps {
	selectedCashOption: SelectedCashOption;
	onCashOptionChange: (selectedCashOption: SelectedCashOption) => void;
}

export interface SalesAmountInputProp {
	currency: Currency;
}

export interface FormInputProps {
	cashTypes: Currency['cashTypes'];
	symbol: Currency['symbol'];
	selectedCashOption: SelectedCashOption;
}

export type Tender = keyof Currency['cashTypes'];
// eg. '$1' | '1¢', etc.
export type Type<T extends Tender> = T extends 'rolls'
	? keyof Currency['cashTypes']['rolls']
	: T extends 'bills' | 'coins'
	? Currency['cashTypes'][T][number]
	: never;
export type Data = { [T in Tender]: Record<Type<T>, Value> } & { rollsFaceValue: Record<string, string> };
export type Value = string;
export type Symbol = Currency['symbol'];
export type PreData = Omit<Currency['cashTypes'], 'rolls'> & {
	rolls: string[];
};
