import { type Currency, type CurrencyCode } from '../types';

export const CURRENCY_DETAILS: Record<CurrencyCode, Currency> = {
	us: {
		label: 'USD',
		name: 'US Dollar',
		symbol: '$',
		locale: 'en-US',
		denomination: {
			bills: ['$1', '$2', '$5', '$10', '$20', '$50', '$100'],
			coins: ['1¢', '5¢', '10¢', '25¢', '50¢', '$1'],
			rolls:
				// prettier-ignore
				{
					'1¢': '$0.50',
					'5¢': '$2.00',
					'10¢': '$5.00',
					'25¢': '$10.00',
					'50¢': '$20.00',
					'$1': '$40.00'
				}
		}
	},
	ca: {
		label: 'CAD',
		name: 'Canadian Dollar',
		symbol: '$',
		locale: 'en-CA',
		denomination: {
			bills: ['$5', '$10', '$20', '$50', '$100'],
			coins: ['5¢', '10¢', '25¢', '$1', '$2'],
			rolls:
				// prettier-ignore
				{
					'5¢': '$2.00',
					'10¢': '$5.00',
					'25¢': '$10.00',
					'$1': '$25.00',
					'$2': '$50.00',
				}
		}
	},
	au: {
		label: 'AUD',
		name: 'Australian Dollar',
		symbol: '$',
		locale: 'en-AU',
		denomination: {
			bills: ['$5', '$10', '$20', '$50', '$100'],
			coins: ['5¢', '10¢', '20¢', '50¢', '$1', '$2'],
			rolls:
				// prettier-ignore
				{
					'5¢': '$2.50',
					'10¢': '$5.00',
					'20¢': '$10.00',
					'50¢': '$25.00',
					'$1': '$25.00',
					'$2': '$50.00',
				}
		}
	},
	nz: {
		label: 'NZD',
		name: 'New Zealand Dollar',
		symbol: '$',
		locale: 'en-NZ',
		denomination: {
			bills: ['$5', '$10', '$20', '$50', '$100'],
			coins: ['10¢', '20¢', '50¢', '$1', '$2'],
			rolls:
				// prettier-ignore
				{
					'10¢': '$5.00',
					'20¢': '$10.00',
					'50¢': '$25.00',
					'$1': '$50.00',
					'$2': '$50.00',
				}
		}
	},
	eu: {
		label: 'EUR',
		name: 'Euro',
		symbol: '€',
		locale: 'de-DE',
		denomination: {
			bills: ['€5', '€10', '€20', '€50', '€100'],
			coins: ['1¢', '2¢', '5¢', '10¢', '20¢', '50¢'],
			rolls:
				// prettier-ignore
				{
					'1¢': '€0.50',
					'2¢': '€1.00',
					'5¢': '€2.50',
					'10¢': '€5.00',
					'20¢': '€10.00',
					'50¢': '€25.00',
					'€1': '€25.00',
					'€2': '€50.00',
				}
		}
	},
	gb: {
		label: 'GBP',
		name: 'British Pound Sterling',
		symbol: '£',
		locale: 'en-GB',
		denomination: {
			bills: ['£5', '£10', '£20', '£50', '£100'],
			coins: ['1p', '2p', '5p', '10p', '20p', '50p'],
			rolls:
				// prettier-ignore
				{
					'1p': '£0.50',
					'2p': '£1.00',
					'5p': '£2.50',
					'10p': '£5.00',
					'20p': '£10.00',
					'50p': '£25.00',
					'£1': '£50.00',
					'£2': '£50.00',
				}
		}
	}
};

export const CURRENCY_CODES = Object.keys(CURRENCY_DETAILS) as CurrencyCode[];
export const TENDER_TYPES = ['bills', 'coins', 'rolls'];
