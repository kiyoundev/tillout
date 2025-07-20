import React from 'react';
import { Divider } from '@mui/material';
import { CountContainerTitle } from '../Styled/CountContainerTitle';
import { PaperContainer } from '../Styled/PaperContainer';
import { CountGrid } from '../CountGrid/CountGrid';
import { TENDER_TYPES } from '../../assets/currencies';
import { CurrencyCode, Counts, TenderType } from '../../types';

export type TenderCountContainerProps = {
	currencyCode: CurrencyCode;
	tenderType: TenderType;
	counts: Counts;
	onDataChange: (denomination: string, count: number | undefined, tenderType: TenderType) => void;
};

export const TenderCountContainer: React.FC<TenderCountContainerProps> = ({ currencyCode, tenderType, counts, onDataChange }) => (
	<PaperContainer>
		<CountContainerTitle>{TENDER_TYPES[tenderType].toUpperCase()}</CountContainerTitle>

		<Divider sx={{ mt: 2, mb: 3 }} />

		<CountGrid
			currencyCode={currencyCode}
			tenderType={tenderType}
			counts={counts}
			onDataChange={onDataChange}
		/>
	</PaperContainer>
);
