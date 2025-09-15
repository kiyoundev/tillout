import { generateVarianceSuggestions } from './suggestionEngine';
import type { SuggestionEngineParams } from './suggestionEngine';

describe('Variance Suggestion Engine Scenarios', () => {
	it('Scenario 1: Single-Item Error (Shortage)', () => {
		const params: SuggestionEngineParams = {
			discrepancy: 20.0,
			isShortage: true,
			currencyCode: 'us',
			tenderCounts: { bills: { $1: 10, $10: 5, $20: 4 }, coins: {}, rolls: {} }
		};
		const suggestions = generateVarianceSuggestions(params);
		expect(suggestions[0].type).toBe('SINGLE_ITEM');
		expect(suggestions[0].message).toContain('$20');
	});

	it('Scenario 2: Single-Item Error (Overage)', () => {
		const params: SuggestionEngineParams = {
			discrepancy: 5.0,
			isShortage: false,
			currencyCode: 'us',
			tenderCounts: { bills: { $5: 6, $10: 5 }, coins: {}, rolls: {} }
		};
		const suggestions = generateVarianceSuggestions(params);
		expect(suggestions[0].type).toBe('SINGLE_ITEM');
		expect(suggestions[0].message).toContain('$5');
	});

	it('Scenario 3: Denomination Swap Error', () => {
		const params: SuggestionEngineParams = {
			discrepancy: 9.0,
			isShortage: true,
			currencyCode: 'us',
			tenderCounts: { bills: { $1: 11, $10: 4 }, coins: {}, rolls: {} }
		};
		const suggestions = generateVarianceSuggestions(params);
		expect(suggestions[0].type).toBe('DENOMINATION_SWAP');
		expect(suggestions[0].message).toContain('$10');
	});

	it('Scenario 4: Multi-Item Error', () => {
		const params: SuggestionEngineParams = {
			discrepancy: 40.0,
			isShortage: true,
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
			discrepancy: 20.0,
			isShortage: false,
			currencyCode: 'us',
			tenderCounts: { bills: { $1: 5, $20: 0 }, coins: {}, rolls: {} }
		};
		const suggestions = generateVarianceSuggestions(params);
		const hasTwentyDollarSuggestion = suggestions.some((s) => s.message.includes('$20'));
		expect(hasTwentyDollarSuggestion).toBe(false);
	});

	it('Scenario 6: Context-Aware Filtering (Swap)', () => {
		const params: SuggestionEngineParams = {
			discrepancy: 9.0,
			isShortage: true,
			currencyCode: 'us',
			tenderCounts: { bills: { $1: 5, $10: 0 }, coins: {}, rolls: {} }
		};
		const suggestions = generateVarianceSuggestions(params);
		expect(suggestions.find((s) => s.type === 'DENOMINATION_SWAP')).toBeUndefined();
	});

	it('Scenario 7: Fallback Suggestion', () => {
		const params: SuggestionEngineParams = {
			discrepancy: 1.37,
			isShortage: true,
			currencyCode: 'us',
			tenderCounts: { bills: { $1: 5 }, coins: {}, rolls: {} }
		};
		const suggestions = generateVarianceSuggestions(params);
		expect(suggestions[0].type).toBe('INPUT_ERROR');
	});
});
