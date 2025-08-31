import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { animate, cubicBezier } from 'motion';
import { motion, useMotionValue, useTransform, useReducedMotion, useMotionTemplate } from 'motion/react';
import { theme } from '../../theme/theme';
import { getCircleProps } from './VarianceDial.utils';

const COLORS = {
	BG_TRACK_COLOR: 'rgba(199,204,214,0.4)',
	PROG_GREAT: 'rgba(19, 246, 91, 0.5)',
	PROG_GOOD: 'rgba(255, 153, 20, 0.5)',
	PROG_BAD: 'rgba(255, 61, 22, 0.5)'
};

const TRANSITION_CONFIG = {
	duration: 2,
	ease: cubicBezier(0.22, 1, 0.36, 1)
};

const ANIMATION_CONFIG = {
	PROGRESS: {
		from: 0,
		to: (variance: number) => variance
	},
	BLUR: {
		from: 8,
		to: 0
	}
};

const PROPS = {
	SIZE: 250,
	THICKNESS: 4
};

type VarianceDialProps = {
	variance: number;
};

export const VarianceDial: React.FC<VarianceDialProps> = ({ variance }) => {
	const { viewBox, ...circleProps } = getCircleProps(PROPS.THICKNESS);

	// Pick color based on variance
	const progressColor = variance < 0.75 ? COLORS.PROG_BAD : variance < 0.9 ? COLORS.PROG_GOOD : COLORS.PROG_GREAT;

	const reducedMotion = useReducedMotion();

	// Motion values
	const progress = useMotionValue(ANIMATION_CONFIG.PROGRESS.from);
	const blur = useMotionValue(ANIMATION_CONFIG.BLUR.from);

	// Derived values
	const roundedProgress = useTransform(progress, (v) => Math.round(v * 100));
	const percentageText = useMotionTemplate`${roundedProgress}%`;
	const filter = useMotionTemplate`blur(${blur}px)`;

	useEffect(() => {
		if (reducedMotion) {
			progress.set(ANIMATION_CONFIG.PROGRESS.to(variance));
			blur.set(ANIMATION_CONFIG.BLUR.to);
			return;
		}
		const ProgressControls = animate(progress, ANIMATION_CONFIG.PROGRESS.to(variance), TRANSITION_CONFIG);
		const BlurControls = animate(blur, ANIMATION_CONFIG.BLUR.to, TRANSITION_CONFIG);

		return () => {
			ProgressControls.stop();
			BlurControls.stop();
		};
	}, [variance, reducedMotion]);

	return (
		<Box
			sx={{
				position: 'relative',
				width: PROPS.SIZE,
				height: PROPS.SIZE,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<svg
				data-testid='variance-dial-svg'
				width={PROPS.SIZE}
				height={PROPS.SIZE}
				viewBox={viewBox}
				style={{ transform: 'rotate(-90deg)' }}
			>
				<circle
					{...circleProps}
					strokeWidth={PROPS.THICKNESS}
					stroke={COLORS.BG_TRACK_COLOR}
				/>
				<motion.circle
					{...circleProps}
					strokeWidth={PROPS.THICKNESS}
					stroke={progressColor}
					pathLength={progress}
				/>
			</svg>
			<Typography
				variant='h3'
				color={theme.palette.text.primary}
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					fontWeight: 700,
					fontSize: 48,
					textAlign: 'center',
					pointerEvents: 'none'
				}}
			>
				{/* This motion.span is responsible for handling the motion values */}
				<motion.span style={{ filter }}>{percentageText}</motion.span>
			</Typography>
		</Box>
	);
};
