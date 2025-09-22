import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Breakpoint } from '@mui/material';

/**
 * A custom hook that returns the current active MUI breakpoint key ('xs', 'sm', 'md', 'lg', 'xl').
 * This is useful for applying conditional logic based on the specific screen size tier.
 * @returns The current breakpoint key.
 */
export const useBreakpoint = (): Breakpoint => {
	const theme = useTheme();

	// Call all hooks at the top level
	// Call all hooks at the top level, in order from largest to smallest
	const matches = {
		xl: useMediaQuery(theme.breakpoints.up('xl')),
		lg: useMediaQuery(theme.breakpoints.up('lg')),
		md: useMediaQuery(theme.breakpoints.up('md')),
		sm: useMediaQuery(theme.breakpoints.up('sm')),
		xs: useMediaQuery(theme.breakpoints.up('xs'))
	};

	// Find the largest breakpoint that matches
	for (const [key, value] of Object.entries(matches)) {
		if (value) {
			return key as Breakpoint;
		}
	}

	// If nothing else matches, we're on the smallest breakpoint.
	return 'xxs';
};
