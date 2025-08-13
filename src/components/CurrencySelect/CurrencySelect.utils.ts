import { type CurrencyCode, type Currency } from '../../types';
import { getCurrency } from '../../utils/util';

export const filterValues = (options: CurrencyCode[], value: string) => {
	const searchableFields: (keyof Pick<Currency, 'label' | 'name'>)[] = ['label', 'name'];
	return options.filter((option: CurrencyCode) =>
		searchableFields.some((field) => getCurrency(option)[field].toLowerCase().includes(value.toLowerCase()))
	);
};
