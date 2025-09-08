import Big from 'big.js';
import { getFlattenedDenominations } from './util';
import type { CurrencyCode, TenderType, Counts } from '../types';

// --- TYPE DEFINITIONS --- //

/**
 * Represents a single, flattened denomination (e.g., a $20 bill or a 50¢ coin).
 * This standardized object is used throughout the suggestion engine.
 */
export interface CurrencyDenomination {
	key: string;
	denom: string;
	value: Big;
	tender: TenderType;
	basePriority: number; // Lower is more common (1 for bills/coins, 10 for rolls)
}

/** The specific type of error a suggestion is targeting. */
export type SuggestionType = 'SINGLE_ITEM' | 'MULTI_ITEM' | 'DENOMINATION_SWAP' | 'INPUT_ERROR';

/** Represents a single, actionable suggestion to be presented to the user. */
export interface VarianceSuggestion {
	type: SuggestionType;
	message: string;
	denominationsToHighlight: string[];
	priority: number;
}

/** The complete set of parameters required for the suggestion engine to generate advice. */
export interface SuggestionEngineParams {
	discrepancy: number;
	isShortage: boolean;
	tenderCounts: Counts;
	currencyCode: CurrencyCode;
	primaryInputKeys?: string[];
}

// --- CANDIDATE GENERATION LOGIC --- //

/**
 * Finds suggestions where the discrepancy exactly matches a single denomination.
 * This is the highest-priority and most common type of error.
 */
const findSingleItemCandidates = (discrepancy: Big, denominations: CurrencyDenomination[]): VarianceSuggestion[] => {
	return denominations
		.filter((denom) => denom.value.eq(discrepancy)) // Use .eq() for comparison
		.map((denom) => ({
			type: 'SINGLE_ITEM',
			message: `Did you miscount one **${denom.denom}**?`,
			denominationsToHighlight: [denom.key],
			priority: 1 + denom.basePriority
		}));
};

/**
 * Finds suggestions where the discrepancy is a simple multiple of a single denomination
 * (e.g., a $20 shortage could be two $10 bills).
 */
const findMultiItemCandidates = (discrepancy: Big, denominations: CurrencyDenomination[]): VarianceSuggestion[] => {
	const candidates: VarianceSuggestion[] = [];
	for (const denom of denominations) {
		// Check if discrepancy is a positive, integer multiple of the denomination
		if (denom.value.gt(0) && discrepancy.mod(denom.value).eq(0)) {
			const count = discrepancy.div(denom.value).toNumber();
			if (count > 1 && count <= 10) {
				candidates.push({
					type: 'MULTI_ITEM',
					message: `Are you off by ${count} **${denom.denom}**?`,
					denominationsToHighlight: [denom.key],
					priority: 3 + count + denom.basePriority // Prioritize smaller counts
				});
			}
		}
	}
	return candidates;
};

/**
 * Finds suggestions where the user may have swapped two different denominations
 * (e.g., counted a $10 bill as a $1 bill, resulting in a $9 variance).
 */
const findDenominationSwapCandidates = (discrepancy: Big, denominations: CurrencyDenomination[]): VarianceSuggestion[] => {
	const candidates: VarianceSuggestion[] = [];
	for (let i = 0; i < denominations.length; i++) {
		for (let j = i + 1; j < denominations.length; j++) {
			const denom1 = denominations[i];
			const denom2 = denominations[j];
			// Check if the absolute difference equals the discrepancy
			if (denom1.value.minus(denom2.value).abs().eq(discrepancy)) {
				const [larger, smaller] = denom1.value.gt(denom2.value) ? [denom1, denom2] : [denom2, denom1];
				candidates.push({
					type: 'DENOMINATION_SWAP',
					message: `Did you accidentally swap a **${smaller.denom}** for a **${larger.denom}**?`,
					denominationsToHighlight: [smaller.key, larger.key],
					priority: 2 // Swaps are a very high-priority, specific error type
				});
			}
		}
	}
	return candidates;
};

// --- CORE ENGINE (Refactored for Big.js) --- //

/**
 * The core of the suggestion engine. It takes a variance and the user's counts,
 * and runs them through a multi-stage pipeline to generate a ranked list of
 * the most likely causes for the error.
 *
 * @param params The parameters for the suggestion engine.
 * @returns A ranked array of the top 3-4 most likely `VarianceSuggestion` objects.
 */
export const generateVarianceSuggestions = (params: SuggestionEngineParams): VarianceSuggestion[] => {
	const { discrepancy, isShortage, tenderCounts, currencyCode, primaryInputKeys = ['Opening Balance', 'Total Sales'] } = params;

	const discrepancyBig = new Big(discrepancy);
	if (discrepancyBig.eq(0)) {
		return [];
	}

	const denominations = getFlattenedDenominations(currencyCode);
	let candidates: VarianceSuggestion[] = [];

	// 1. Candidate Generation
	candidates.push(...findSingleItemCandidates(discrepancyBig, denominations));
	candidates.push(...findMultiItemCandidates(discrepancyBig, denominations));
	candidates.push(...findDenominationSwapCandidates(discrepancyBig, denominations));

	// 2. Context-Aware Filtering (Logic remains the same, just uses keys)
	const filteredCandidates = candidates.filter((suggestion) => {
		for (const key of suggestion.denominationsToHighlight) {
			const denomInfo = denominations.find((d) => d.key === key);
			if (!denomInfo) continue; // Should not happen with valid keys

			const count = tenderCounts[denomInfo.tender]?.[denomInfo.denom] || 0;

			// For an overage, it's illogical to suggest adding an item the user has none of.
			if (!isShortage && count === 0) {
				return false;
			}

			// For a swap, the user must have a count of both items.
			if (suggestion.type === 'DENOMINATION_SWAP' && count === 0) {
				return false;
			}
		}
		return true;
	});

	// 3. Ranking & Formatting
	const sortedCandidates = filteredCandidates.sort((a, b) => a.priority - b.priority);
	const term = isShortage ? 'short' : 'over';
	const formattedSuggestions = sortedCandidates.map((s) => ({
		...s,
		message: `Your till is ${term} by $${discrepancyBig.toFixed(2)}. ${s.message}`
	}));

	// 4. Add Fallback Suggestion
	if (formattedSuggestions.length === 0) {
		formattedSuggestions.push({
			type: 'INPUT_ERROR',
			message: `We couldn't find a simple counting error. Could you please double-check the **${primaryInputKeys.join('** and **')}** figures?`,
			denominationsToHighlight: primaryInputKeys,
			priority: 99
		});
	}

	// 5. Return Top 3 Suggestions
	return formattedSuggestions.slice(0, 3);
};
