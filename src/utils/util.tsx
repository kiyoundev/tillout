import { Currency } from '../types';

export const displayEndAdornment = (option: Currency): string => `- ${option?.name ?? ''}`;
