import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { DateTime } from './DateTime';

describe('DateTime', () => {
	let mockDate = 'January 1, 2024';
	let mockTime = '1:00 AM';
	let dateTimeFormatSpy: jest.SpyInstance;

	beforeEach(() => {
		jest.useFakeTimers();
		dateTimeFormatSpy = jest.spyOn(Intl, 'DateTimeFormat').mockImplementation((_, options) => {
			if (options?.hour) {
				return {
					format: () => mockTime
				} as unknown as Intl.DateTimeFormat;
			}

			return {
				format: () => mockDate
			} as unknown as Intl.DateTimeFormat;
		});
	});

	afterEach(() => {
		jest.useRealTimers();
		dateTimeFormatSpy.mockRestore();
	});

	it('renders the formatted date and time', () => {
		render(<DateTime />);

		expect(screen.getByText(mockDate)).toBeInTheDocument();
		expect(screen.getByText(mockTime)).toBeInTheDocument();
	});

	it('updates the displayed date and time after one minute', async () => {
		render(<DateTime />);

		mockDate = 'January 1, 2024 (updated)';
		mockTime = '1:01 AM';

		await act(async () => {
			jest.advanceTimersByTime(60000);
		});

		expect(screen.getByText(mockDate)).toBeInTheDocument();
		expect(screen.getByText(mockTime)).toBeInTheDocument();
	});
});
