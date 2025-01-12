import { Currency } from '../types';
export const currencies: Currency[] = [
	{
		label: 'USD',
		name: 'US Dollar',
		code: 'us',
		symbol: '$',
		cashTypes: {
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
	{
		label: 'CAD',
		name: 'Canadian Dollar',
		code: 'ca',
		symbol: '$',
		cashTypes: {
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
	{
		label: 'AUD',
		name: 'Australian Dollar',
		code: 'au',
		symbol: '$',
		cashTypes: {
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
	{
		label: 'NZD',
		name: 'New Zealand Dollar',
		code: 'nz',
		symbol: '$',
		cashTypes: {
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
	{
		label: 'EUR',
		name: 'Euro',
		code: 'eu',
		symbol: '€',
		cashTypes: {
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
	{
		label: 'GBP',
		name: 'British Pound Sterling',
		code: 'gb',
		symbol: '£',
		cashTypes: {
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
];
