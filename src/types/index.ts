export interface Currency {
	label: string;
	name: string;
	code: string;
	symbol: string;
	cashTypes: {
		bills: string[];
		coins: string[];
		rolls: string[];
	};
}

export interface SelectedCashOption {
	bills: boolean;
	coins: boolean;
	rolls: boolean;
}

export interface DisplayFlagProps {
	// code: Pick<Currency, 'code'>;
	code: Currency['code'];
	container?: 'input' | 'dropdown';
}

export interface ACTIONTYPE {
	type: 'input' | 'reset' | 'clear' | 'blur' | 'selectOption' | 'removeOption' | 'focus' | '';
	payload: string;
}

export interface InputFieldProps {
	currency: Currency;
	onFocusChange: (inputFocused: boolean) => void;
	InputProps?: object;
}

export interface CurrencySelectProps {
	currency: Currency;
	onCurrencyChange: (currency: Currency) => void;
}

export interface CashOptionSelectProps {
	selectedCashOption: SelectedCashOption;
	onCashOptionChange: (selectedCashOption: SelectedCashOption) => void;
}

export interface OpeningBalanceProp {
	currency: Currency;
}

export interface FormInputProps {
	cashTypes: Currency['cashTypes'];
	selectedCashOption: SelectedCashOption;
}

export type Tender = keyof Currency['cashTypes']; // "bills" | "coins" | "rolls"
export type Type = Currency['cashTypes'][Tender][number];
export type Data = Record<Tender, Record<Type[number], number>>;
export type Value = string;
