import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionButtons } from './ActionButtons';
import { useNavigate } from 'react-router-dom';
import { useResetCount } from '@/stores/tillStore';

jest.mock('@/stores/tillStore', () => ({
	useResetCount: jest.fn()
}));

jest.mock('react-router-dom', () => {
	const actual = jest.requireActual('react-router-dom');
	return {
		...actual,
		useNavigate: jest.fn()
	};
});

describe('ActionButtons', () => {
	const mockReset = jest.fn();
	const mockNavigate = jest.fn();

	beforeEach(() => {
		mockReset.mockReset();
		mockNavigate.mockReset();
		jest.mocked(useResetCount).mockReturnValue(mockReset);
		jest.mocked(useNavigate).mockReturnValue(mockNavigate);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders entry page buttons and handles interactions', async () => {
		const user = userEvent.setup();
		render(<ActionButtons page='entry' />);

		const resetButton = screen.getByRole('button', { name: /reset/i });
		const calculateButton = screen.getByRole('button', { name: /calculate/i });

		expect(screen.queryByRole('button', { name: /edit entry/i })).toBeNull();

		await user.click(resetButton);
		expect(mockReset).toHaveBeenCalledTimes(1);

		await user.click(calculateButton);
		expect(mockNavigate).toHaveBeenCalledWith('/summary');
	});

	it('renders summary page buttons and handles navigation', async () => {
		const user = userEvent.setup();
		render(<ActionButtons page='summary' />);

		const editEntryButton = screen.getByRole('button', { name: /edit entry/i });

		expect(screen.queryByRole('button', { name: /reset/i })).toBeNull();
		expect(screen.queryByRole('button', { name: /calculate/i })).toBeNull();

		await user.click(editEntryButton);
		expect(mockNavigate).toHaveBeenCalledWith('/');
	});
});
