import Big from 'big.js';
import { getFlattenedDenominations } from './util';
import type { CurrencyCode, TenderType, Counts } from '@/types';
import { numToWord } from './util';

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
// export interface SuggestionEngineParams {
// 	discrepancy: number;
// 	isShortage: boolean;
// 	tenderCounts: Counts;
// 	currencyCode: CurrencyCode;
// 	primaryInputKeys?: string[];
// }

export interface SuggestionEngineParams {
	countedTotal: number;
	openingBalance: number;
	totalSales: number;
	currencyCode: CurrencyCode;
	tenderCounts: Counts;
	primaryInputKeys?: string[];
}

const getSingularTenderType = (tender: TenderType): string => {
	if (tender.endsWith('s')) {
		return tender.slice(0, -1);
	}
	return tender; // Return as-is if not plural (e.g., for future-proofing)
};

// --- CANDIDATE GENERATION LOGIC --- //

/**
 * Finds suggestions where the discrepancy exactly matches a single denomination.
 * This is the highest-priority and most common type of error.
 */
const findSingleItemCandidates = (discrepancy: Big, denominations: CurrencyDenomination[]): VarianceSuggestion[] => {
	return denominations
		.filter((denom) => denom.value.eq(discrepancy)) // Use .eq() for comparison
		.map((denom) => {
			const singularTender = getSingularTenderType(denom.tender);
			return {
				type: 'SINGLE_ITEM',
				message: `{isShortage|${numToWord(1)} missing ${denom.denom} ${singularTender}|${numToWord(1)} extra ${
					denom.denom
				} ${singularTender}}`, // Placeholder
				denominationsToHighlight: [denom.key],
				priority: 1 + denom.basePriority
			};
		});
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
				const tenderName = count > 1 ? denom.tender : getSingularTenderType(denom.tender);
				candidates.push({
					type: 'MULTI_ITEM',
					message: `{isShortage|${numToWord(count)} missing ${denom.denom} ${tenderName}|${numToWord(count)} extra ${
						denom.denom
					} ${tenderName}}`,
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
					message: `Swapped ${smaller.denom} for ${larger.denom}`,
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
	const { countedTotal, openingBalance, totalSales, tenderCounts, currencyCode, primaryInputKeys = ['Opening Balance', 'Total Sales'] } = params;

	const discrepancy = openingBalance + totalSales - countedTotal;
	const isShortage = discrepancy > 0;

	const discrepancyBig = new Big(discrepancy);
	if (discrepancyBig.eq(0)) {
		return [];
	}

	const denominations = getFlattenedDenominations(currencyCode);
	let candidates: VarianceSuggestion[] = [];

	// 1. Candidate Generation
	const absoluteDiscrepancy = discrepancyBig.abs();
	candidates.push(...findSingleItemCandidates(absoluteDiscrepancy, denominations));
	candidates.push(...findMultiItemCandidates(absoluteDiscrepancy, denominations));
	candidates.push(...findDenominationSwapCandidates(absoluteDiscrepancy, denominations));

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

	// 3. Ranking & Final Message Formatting
	const sortedCandidates = filteredCandidates.sort((a, b) => a.priority - b.priority);

	const formattedSuggestions = sortedCandidates.map((s) => {
		const messageTemplate = s.message;
		let finalMessage = messageTemplate;

		const match = messageTemplate.match(/{isShortage\|([^|]+)\|([^}]+)}/);
		if (match) {
			finalMessage = isShortage ? match[1] : match[2];
		}

		return {
			...s,
			message: finalMessage
		};
	});

	// 4. Add Fallback Suggestion
	if (formattedSuggestions.length === 0) {
		formattedSuggestions.push({
			type: 'INPUT_ERROR',
			message: `Please double-check the ${primaryInputKeys.join(' and ')} figures`,
			denominationsToHighlight: primaryInputKeys,
			priority: 99
		});
	}

	// 5. Return Top 3 Suggestions
	return formattedSuggestions.slice(0, 3);
};
