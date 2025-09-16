import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { TenderCountContainer, TenderCountContainerProps } from './TenderCountContainer';
import { TENDER_TYPES } from '@/constants/currencies';
import { theme } from '@/styles/theme';
import { TenderType } from '@/types';
import { CountGrid } from '@/features/entry/components/CountGrid/CountGrid';

// Mock the child component to isolate the container's logic.
// This ensures the test focuses only on the TenderCountContainer's behavior.
jest.mock('@/features/entry/components/CountGrid/CountGrid', () => ({
	// The 'any' type is used here because we are mocking the component and don't need to match its real prop types.
	CountGrid: jest.fn((props: any) => (
		<div
			data-testid='mock-count-grid'
			data-tendertype={props.tenderType}
		/>
	))
}));

const setup = (props: TenderCountContainerProps) => {
	render(
		<ThemeProvider theme={theme}>
			<TenderCountContainer {...props} />
		</ThemeProvider>
	);
};

describe('TenderCountContainer Component', () => {
	// Use describe.each to run the same tests for all tender types, reducing code duplication.
	describe.each(['bills', 'coins', 'rolls'] as TenderType[])('for tenderType="%s"', (tenderType) => {
		beforeEach(() => {
			// Clear mock history before each test to ensure clean assertions between test cases.
			(CountGrid as jest.Mock).mockClear();
			setup({ tenderType });
		});

		it('renders the correct capitalized title', () => {
			const expectedTitle = TENDER_TYPES[tenderType].toUpperCase();
			expect(screen.getByText(expectedTitle)).toBeInTheDocument();
		});

		it('renders CountGrid and passes the correct tenderType prop', () => {
			// Verify that the mocked CountGrid is rendered.
			expect(screen.getByTestId('mock-count-grid')).toBeInTheDocument();

			// Verify that CountGrid was called with the correct props.
			expect(CountGrid).toHaveBeenCalledWith({ tenderType }, {});
		});
	});
});
