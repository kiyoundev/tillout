import { render, screen } from '@testing-library/react';
// import { CurrencySelect, getCurrencyCodeList, displayValue, filterValues } from '../components/CurrencySelect';
import { CurrencySelect, getCurrencyCodeList, displayValue, filterValues, FlagIMG, OptionField } from '../components/CurrencySelect';
import { CURRENCY_DETAILS } from '../assets/currencies';
import { CurrencyCode } from '../types';

const VALID_CURRENCY_CODES: CurrencyCode[] = ['us', 'ca', 'au', 'nz', 'eu', 'gb'];

// getCurrencyCodeList function
describe('getCurrencyCodeList', () => {
	test('getCurrencyCodeList returns all the keys form CURRENCY_DETAILS', () => {
		const expectedKeys = Object.keys(CURRENCY_DETAILS);
		const actualKeys = getCurrencyCodeList();

		expect(actualKeys).toEqual(expectedKeys);
		expect(actualKeys.length).toBe(expectedKeys.length);
	});
	test('getCurrencyCodeList returns keys typed as CurrencyCode[]', () => {
		const result = getCurrencyCodeList();
		type AssertIsCurrencyCodeList = typeof result extends CurrencyCode[] ? true : false;
		const isCurrencyCodeArray: AssertIsCurrencyCodeList = true; // Type should be valid
		expect(isCurrencyCodeArray).toBe(true);
	});
});

describe('displayValue', () => {
	test('return the correct display value for valid currency codes', () => {
		// const validCodes: CurrencyCode[] = ['us', 'ca', 'au', 'nz', 'eu', 'gb'];
		VALID_CURRENCY_CODES.forEach((code) => {
			const expected = `- ${CURRENCY_DETAILS[code].name}`;
			expect(displayValue(code)).toBe(expected);
		});
	});
});

describe('filterValues', () => {
	// single match
	test('returns correct filtered options for single match', () => {
		const value = 'USD';
		const result = filterValues(VALID_CURRENCY_CODES, value);
		expect(result).toEqual(['us']);
	});
	// multiple matches
	test('returns correct filtered options for multiple matches', () => {
		const value = 'Dollar';
		const result = filterValues(VALID_CURRENCY_CODES, value);
		expect(result).toEqual(['us', 'ca', 'au', 'nz']);
	});
	// partial matches
	test('handles partial matches', () => {
		const value = 'New';
		const result = filterValues(VALID_CURRENCY_CODES, value);
		expect(result).toEqual(['nz']);
	});
	test('handles case-insensitive matches', () => {
		const value = 'uS dOLLar';
		const result = filterValues(VALID_CURRENCY_CODES, value);
		expect(result).toEqual(['us']);
	});
	test('returns all options when inputValue is empty', () => {
		const value = '';
		const result = filterValues(VALID_CURRENCY_CODES, value);
		expect(result).toEqual(VALID_CURRENCY_CODES);
	});
	test('returns an epty array when no matches are found', () => {
		const value = 'invalid';
		const result = filterValues(VALID_CURRENCY_CODES, value);
		expect(result).toEqual([]);
	});
});

describe('FlagIMG component', () => {
	test('renders correctly with the provided currencyCode and in case of default container', () => {
		render(<FlagIMG currencyCode='us' />);
		const imgElement = screen.getByRole('img');
		expect(imgElement).toBeInTheDocument();
		expect(imgElement).toHaveAttribute('src', 'https://flagcdn.com/w40/us.png');
		expect(imgElement).toHaveAttribute('srcset', 'https://flagcdn.com/w40/us.png 2x');
		expect(imgElement).toHaveStyle({ marginLeft: '0.5em', marginRight: '0.5em' });
	});

	// *****************
	// test('applies correct styles when container is "dropdown"', () => {
	// 	render(
	// 		<FlagIMG
	// 			currencyCode='us'
	// 			container='dropdown'
	// 		/>
	// 	);
	// 	const imgElement = screen.getByRole('img');
	// 	expect(imgElement).toBeInTheDocument();
	// 	expect(imgElement).toHaveAttribute('src', 'https://flagcdn.com/w40/us.png');
	// 	expect(imgElement).toHaveAttribute('srcset', 'https://flagcdn.com/w40/us.png 2x');
	// 	expect(imgElement).toHaveStyle({ marginLeft: '0.5em' });
	// });

	test('renders with the correct width attribute', () => {
		render(<FlagIMG currencyCode='gb' />);
		const imgElement = screen.getByRole('img');
		expect(imgElement).toHaveAttribute('width', '25');
	});

	test('handles invalid or missing props gracefully', () => {
		const invalidCurrencyCode = 'invalid_code' as CurrencyCode;
		render(<FlagIMG currencyCode={invalidCurrencyCode} />);
		const imgElement = screen.getByRole('img');
		expect(imgElement).toHaveAttribute('src', 'https://flagcdn.com/w40/invalid_code.png');
	});
});

describe('OptionField Component', () => {
	// Test 1: Valid currencyCode
	test('renders correctly with valid currencyCode', () => {
		render(<OptionField currencyCode='us' />);

		const optionFieldElement = screen.getByRole('listitem');
		expect(optionFieldElement).toBeInTheDocument();

		expect(screen.getByText(CURRENCY_DETAILS['us'].label)).toBeInTheDocument();
		expect(screen.getByText(CURRENCY_DETAILS['us'].name)).toBeInTheDocument();
	});

	// Test 2: Additional props passed to the <li> element
	// test('renders additional props on list item', () => {
	// 	const currencyCode = 'us';
	// 	render(
	// 		<OptionField
	// 			currencyCode={currencyCode}
	// 			className='custom-class'
	// 			data-testid='option-field'
	// 		/>
	// 	);

	// 	const listItemElement = screen.getByTestId('option-field');
	// 	expect(listItemElement).toHaveClass('custom-class');
	// });

	// Test 3: Invalid currencyCode throws an error
	test('throws error for invalid currencyCode', () => {
		const invalidCurrencyCode = 'invalid_code' as CurrencyCode;

		expect(() => {
			render(<OptionField currencyCode={invalidCurrencyCode} />);
		}).toThrow(`Invalid currency code: ${invalidCurrencyCode}`);
	});
});

describe('CurrencySelect Component', () => {
	test('renders CurrencySelect component', () => {
		render(
			<CurrencySelect
				currencyCode='us'
				onCurrencyCodeChange={() => {}}
			/>
		);
	});
});
