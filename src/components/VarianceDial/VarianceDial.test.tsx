import { render, screen } from '@testing-library/react';
import React from 'react';
import { useReducedMotion } from 'motion/react';
import { animate } from 'motion';
import { VarianceDial } from './VarianceDial';

// --- Mocks ---
// Mock the 'motion' and 'motion/react' libraries to control animations in tests
jest.mock('motion', () => ({
	...jest.requireActual('motion'),
	// Mock animate to instantly set the final value of the motion value
	animate: jest.fn((value, keyframes) => {
		value.set(keyframes);
		return {
			stop: jest.fn(),
			cancel: jest.fn(),
			finished: Promise.resolve({ reason: 'completed' })
		};
	})
}));

jest.mock('motion/react', () => ({
	...jest.requireActual('motion/react'),
	useReducedMotion: jest.fn(),
	// Mock the motion component to render a simple span for testing
	motion: {
		...jest.requireActual('motion/react').motion,
		span: jest.fn(({ children: motionValue, ...props }) => {
			const [value, setValue] = React.useState(motionValue.get());

			React.useEffect(() => {
				const unsubscribe = motionValue.on('change', (latest: number) => {
					setValue(latest);
				});
				return () => unsubscribe();
			}, [motionValue]);

			return <span {...props}>{value}</span>;
		}),
		circle: jest.fn((props) => <circle {...props} />)
	}
}));

// --- Test Suite ---
describe('VarianceDial Component', () => {
	const mockUseReducedMotion = useReducedMotion as jest.Mock;
	const mockAnimate = animate as jest.Mock;

	beforeEach(() => {
		// Reset mocks before each test
		jest.clearAllMocks();
		mockUseReducedMotion.mockReturnValue(false); // Default to animations enabled
	});

	it('renders the dial and initial percentage text', () => {
		render(<VarianceDial variance={0} />);
		// The initial text is '0%' because the animation starts from 0
		expect(screen.getByText('0%')).toBeInTheDocument();
		// Check for the two circles (background track and progress)
		expect(screen.getByTestId('variance-dial-svg').querySelectorAll('circle')).toHaveLength(2);
	});

	it('triggers the animation with the correct target value', () => {
		render(<VarianceDial variance={0.85} />);
		// Check that animate is called with the motion value and the target variance
		expect(mockAnimate).toHaveBeenCalledWith(expect.anything(), 0.85, expect.any(Object));
	});

	it('uses the "bad" progress color for variance below 0.75', () => {
		render(<VarianceDial variance={0.5} />);
		const progressCircle = screen.getByTestId('variance-dial-svg').querySelectorAll('circle')[1];
		expect(progressCircle).toHaveAttribute('stroke', 'rgba(255, 61, 22, 0.5)');
	});

	it('uses the "good" progress color for variance between 0.75 and 0.9', () => {
		render(<VarianceDial variance={0.8} />);
		const progressCircle = screen.getByTestId('variance-dial-svg').querySelectorAll('circle')[1];
		expect(progressCircle).toHaveAttribute('stroke', 'rgba(255, 153, 20, 0.5)');
	});

	it('uses the "great" progress color for variance above 0.9', () => {
		render(<VarianceDial variance={0.95} />);
		const progressCircle = screen.getByTestId('variance-dial-svg').querySelectorAll('circle')[1];
		expect(progressCircle).toHaveAttribute('stroke', 'rgba(19, 246, 91, 0.5)');
	});

	it('does not call animate when reduced motion is enabled', () => {
		mockUseReducedMotion.mockReturnValue(true);
		render(<VarianceDial variance={0.9} />);
		expect(mockAnimate).not.toHaveBeenCalled();
	});
});
