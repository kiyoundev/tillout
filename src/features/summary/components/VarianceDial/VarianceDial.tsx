import Big from 'big.js';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { animate, cubicBezier } from 'motion';
import { motion, useMotionValue, useTransform, useReducedMotion, useMotionTemplate } from 'motion/react';
import { theme } from '@/styles/theme';
import { getCircleProps } from './VarianceDial.utils';

export const COLORS = {
	BG_TRACK_COLOR: 'rgba(199,204,214,0.4)',
	PROG_GREAT: 'rgba(19, 246, 91, 0.5)',
	PROG_GOOD: 'rgba(255, 153, 20, 0.5)',
	PROG_BAD: 'rgba(255, 61, 22, 0.5)',
	PROG_OVER: 'rgba(255, 153, 20, 1)'
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
	},
	OPACITY: {
		inputRange: [0, 0.001],
		outputRange: [0, 1]
	}
};

const PROPS = {
	SIZE: 250,
	THICKNESS: 4
};

type VarianceDialProps = {
	variance: Big;
};

export const VarianceDial: React.FC<VarianceDialProps> = ({ variance: varianceBig }) => {
	const variance = varianceBig.toNumber();
	const { viewBox, ...circleProps } = getCircleProps(PROPS.THICKNESS);

	// Pick color based on variance
	const progressColor = variance < 0.75 ? COLORS.PROG_BAD : variance <= 0.9 ? COLORS.PROG_GOOD : COLORS.PROG_GREAT;

	const reducedMotion = useReducedMotion();

	// Motion values
	const progress = useMotionValue(ANIMATION_CONFIG.PROGRESS.from);
	const blur = useMotionValue(ANIMATION_CONFIG.BLUR.from);

	// Derived values
	const baseProgress = useTransform(progress, (v) => Math.min(v, 1));
	const overageProgress = useTransform(progress, (v) => Math.max(0, v - 1));
	const roundedProgress = useTransform(progress, (v) => Math.round(v * 100));

	const overageOpacity = useTransform(overageProgress, ANIMATION_CONFIG.OPACITY.inputRange, ANIMATION_CONFIG.OPACITY.outputRange);
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
				display: 'inline-flex',
				width: `${PROPS.SIZE}px`,
				height: `${PROPS.SIZE}px`
			}}
		>
			<svg
				data-testid='variance-dial-svg'
				width={PROPS.SIZE}
				height={PROPS.SIZE}
				viewBox={viewBox}
				style={{ transform: 'rotate(-90deg)' }}
			>
				{/* Background Track */}
				<circle
					{...circleProps}
					strokeWidth={PROPS.THICKNESS}
					stroke={COLORS.BG_TRACK_COLOR}
				/>
				{/* Base Circle */}
				<motion.circle
					{...circleProps}
					data-testid='progress-circle'
					strokeWidth={PROPS.THICKNESS}
					stroke={progressColor}
					style={{ pathLength: baseProgress }}
					visibility={variance > 0 ? 'visible' : 'hidden'}
				/>
				{/* Overage Circle */}
				{variance > 1 && (
					<motion.circle
						{...circleProps}
						strokeWidth={PROPS.THICKNESS}
						stroke={COLORS.PROG_OVER}
						style={{
							pathLength: overageProgress,
							opacity: overageOpacity
						}}
					/>
				)}
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
					pointerEvents: 'none'
				}}
			>
				<motion.span style={{ filter }}>{percentageText}</motion.span>
			</Typography>
		</Box>
	);
};
