
export interface Currency {
    label: string;
    name: string;
    code: string;
    symbol: string;
    bills: string[];
    coins: string[];
}

export const currencies: Currency[] = [
    {   
        label: 'USD',
        name: 'US Dollar',
        code: 'us',
        symbol: '$',
        bills: ['$1', '$5', '$10', '$20', '$50', '$100'],
        coins: ['1¢', '5¢', '10¢', '25¢', '50¢', '$1']
    },
    {   
        label: 'CAD',
        name: 'Canadian Dollar',
        code: 'ca',
        symbol: '$',
        bills: ['$5', '$10', '$20', '$50', '$100'],
        coins: ['5¢', '10¢', '25¢', '$1', '$2']        
    },
    {   
        label: 'AUD',
        name: 'Australian Dollar',
        code: 'au',
        symbol: '$',
        bills: ['$5', '$10', '$20', '$50', '$100'],
        coins: ['5¢', '10¢', '20¢', '50¢', '$1', '$2']
    },
    {   
        label: 'NZD',
        name: 'New Zealand Dollar',
        code: 'nz',
        symbol: '$',
        bills: ['$5', '$10', '$20', '$50', '$100'],
        coins: ['10¢', '20¢', '50¢', '$1', '$2']
    },
    {   
        label: 'EUR',
        name: 'Euro',
        code: 'eu',
        symbol: '€',
        bills: ['€5', '€10', '€20', '€50', '€100', '€200', '€500'],
        coins: ['1¢', '2¢', '5¢', '10¢', '20¢', '50¢', '€1', '€2']
    },
    {   
        label: 'GBP',
        name: 'British Pound',
        code: 'gb',
        symbol: '£',
        bills: ['£5', '£10', '£20', '£50', '£100'],
        coins: ['1p', '2p', '5p', '10p', '20p', '50p', '£1', '£2']
    }
]