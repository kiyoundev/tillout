export interface Currency {
	label: string;
	name: string;
	code: string;
	symbol: string;
	cashTypes: {
		bills: string[];
		coins: string[];
		rolls: Record<string, string>;
	};
}

export interface SelectedCashOption {
	bills: boolean;
	coins: boolean;
	rolls: boolean;
}

export interface DisplayFlagProps {
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
	symbol: Currency['symbol'];
	selectedCashOption: SelectedCashOption;
}

// formData
// {
//     "bills": {
//         "$1": 0,
//         "$2": 0,
//         "$5": 0,
//         "$10": 0,
//         "$20": 0,
//         "$50": 0,
//         "$100": 0
//     },
//     "coins": {
//         "1¢": 0,
//         "5¢": 0,
//         "10¢": 0,
//         "25¢": 0,
//         "50¢": 0,
//         "$1": 0
//     },
//     "rolls": {
//         "1¢": 0,
//         "5¢": 0,
//         "10¢": 0,
//         "25¢": 0,
//         "50¢": 0,
//         "$1": 0
//     }
// }

// "bills" | "coins" | "rolls"
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
