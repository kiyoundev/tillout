
// interface Currency {
//     label: string;
//     flagIconClass: string;
//     bills: string[];
//     coins: string[];
// }

// export const currencyData: Record<string, Currency> = {
//     USD: {
//         label: 'US Dollar',
//         flagIconClass: 'us',
//         bills: ['$1', '$5', '$10', '$20', '$50', '$100'],
//         coins: ['1¢', '5¢', '10¢', '25¢', '50¢', '$1']
//     },
//     CAD: {
//         label: 'Canadian Dollar',
//         flagIconClass: 'ca',
//         bills: ['$5', '$10', '$20', '$50', '$100'],
//         coins: ['5¢', '10¢', '25¢', '$1', '$2']        
//     },
//     AUD: {
//         label: 'Australian Dollar',
//         flagIconClass: 'au',
//         bills: ['$5', '$10', '$20', '$50', '$100'],
//         coins: ['5¢', '10¢', '20¢', '50¢', '$1', '$2']
//     },
//     NZD: {
//         label: 'New Zealand Dollar',
//         flagIconClass: 'nz',
//         bills: ['$5', '$10', '$20', '$50', '$100'],
//         coins: ['10¢', '20¢', '50¢', '$1', '$2']
//     },
//     EUR: {
//         label: 'Euro',
//         flagIconClass: 'eu',
//         bills: ['€5', '€10', '€20', '€50', '€100', '€200', '€500'],
//         coins: ['1¢', '2¢', '5¢', '10¢', '20¢', '50¢', '€1', '€2']
//     },
// };

export const currencies = [
    {   
        label: 'USD',
        name: 'US Dollar',
        code: 'us',
        bills: ['$1', '$5', '$10', '$20', '$50', '$100'],
        coins: ['1¢', '5¢', '10¢', '25¢', '50¢', '$1']
    },
    {   
        label: 'CAD',
        name: 'Canadian Dollar',
        code: 'ca',
        bills: ['$5', '$10', '$20', '$50', '$100'],
        coins: ['5¢', '10¢', '25¢', '$1', '$2']        
    },
    {   
        label: 'AUD',
        name: 'Australian Dollar',
        code: 'au',
        bills: ['$5', '$10', '$20', '$50', '$100'],
        coins: ['5¢', '10¢', '20¢', '50¢', '$1', '$2']
    },
    {   
        label: 'NZD',
        name: 'New Zealand Dollar',
        code: 'nz',
        bills: ['$5', '$10', '$20', '$50', '$100'],
        coins: ['10¢', '20¢', '50¢', '$1', '$2']
    },
    {   
        label: 'EUR',
        name: 'Euro',
        code: 'eu',
        bills: ['€5', '€10', '€20', '€50', '€100', '€200', '€500'],
        coins: ['1¢', '2¢', '5¢', '10¢', '20¢', '50¢', '€1', '€2']
    },
]