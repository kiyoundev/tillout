import { TENDER_TYPES } from '../../constants/currencies';
import { type TenderType } from '../../types';

export const filterValues = (options: TenderType[], inputValue: string) => {
	return options.filter(
		(option) => option.toLowerCase().includes(inputValue.toLowerCase()) || TENDER_TYPES[option].toLowerCase().includes(inputValue.toLowerCase())
	);
};
