import { generateVarianceSuggestions } from './suggestionEngine';
import type { SuggestionEngineParams } from './suggestionEngine';

describe('Variance Suggestion Engine Scenarios', () => {
	it('Scenario 1: Single-Item Error (Shortage)', () => {
		const params: SuggestionEngineParams = {
			countedTotal: 120,
			openingBalance: 100,
			totalSales: 40,
			currencyCode: 'us',
			tenderCounts: { bills: { $1: 10, $10: 5, $20: 4 }, coins: {}, rolls: {} }
		};
		const suggestions = generateVarianceSuggestions(params);
		expect(suggestions[0].type).toBe('SINGLE_ITEM');
		expect(suggestions[0].message).toContain('$20');
	});

	it('Scenario 2: Single-Item Error (Overage)', () => {
		const params: SuggestionEngineParams = {
			countedTotal: 85,
			openingBalance: 50,
			totalSales: 30,
			currencyCode: 'us',
			tenderCounts: { bills: { $5: 6, $10: 5 }, coins: {}, rolls: {} }
		};
		const suggestions = generateVarianceSuggestions(params);
		expect(suggestions[0].type).toBe('SINGLE_ITEM');
		expect(suggestions[0].message).toContain('$5');
	});

	it('Scenario 3: Denomination Swap Error', () => {
		const params: SuggestionEngineParams = {
			countedTotal: 51,
			openingBalance: 50,
			totalSales: 10,
			currencyCode: 'us',
			tenderCounts: { bills: { $1: 11, $10: 4 }, coins: {}, rolls: {} }
		};
		const suggestions = generateVarianceSuggestions(params);
		expect(suggestions[0].type).toBe('DENOMINATION_SWAP');
		expect(suggestions[0].message).toContain('$10');
	});

	it('Scenario 4: Multi-Item Error', () => {
		const params: SuggestionEngineParams = {
			countedTotal: 60,
			openingBalance: 50,
			totalSales: 50,
			currencyCode: 'us',
			tenderCounts: { bills: { $20: 3 }, coins: {}, rolls: {} }
		};
		const suggestions = generateVarianceSuggestions(params);
		expect(suggestions[0].type).toBe('MULTI_ITEM');
		expect(suggestions[0].message).toContain('2');
		expect(suggestions[0].message).toContain('$20');
	});

	it('Scenario 5: Context-Aware Filtering (Overage)', () => {
		const params: SuggestionEngineParams = {
			countedTotal: 25,
			openingBalance: 0,
			totalSales: 5,
			currencyCode: 'us',
			tenderCounts: { bills: { $1: 5, $20: 0 }, coins: {}, rolls: {} }
		};
		const suggestions = generateVarianceSuggestions(params);
		const hasTwentyDollarSuggestion = suggestions.some((s) => s.message.includes('$20'));
		expect(hasTwentyDollarSuggestion).toBe(false);
	});

	it('Scenario 6: Context-Aware Filtering (Swap)', () => {
		const params: SuggestionEngineParams = {
			countedTotal: 5,
			openingBalance: 10,
			totalSales: 4,
			currencyCode: 'us',
			tenderCounts: { bills: { $1: 5, $10: 0 }, coins: {}, rolls: {} }
		};
		const suggestions = generateVarianceSuggestions(params);
		expect(suggestions.find((s) => s.type === 'DENOMINATION_SWAP')).toBeUndefined();
	});

	it('Scenario 7: Fallback Suggestion', () => {
		const params: SuggestionEngineParams = {
			countedTotal: 5,
			openingBalance: 5,
			totalSales: 1.37,
			currencyCode: 'us',
			tenderCounts: { bills: { $1: 5 }, coins: {}, rolls: {} }
		};
		const suggestions = generateVarianceSuggestions(params);
		expect(suggestions[0].type).toBe('INPUT_ERROR');
	});
});
