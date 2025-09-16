export const getCircleProps = (thickness: number) => {
	const baseSize = 44;
	const viewBox = `${baseSize / 2} ${baseSize / 2} ${baseSize} ${baseSize}`;
	const radius = (baseSize - thickness) / 2;

	return {
		viewBox,
		cx: baseSize,
		cy: baseSize,
		r: radius,
		strokeLinecap: 'round' as const,
		fill: 'none' as const
	};
};
