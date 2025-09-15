import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
	day: 'numeric',
	month: 'long',
	year: 'numeric'
};

const TIME_OPTIONS: Intl.DateTimeFormatOptions = {
	hour: 'numeric',
	minute: '2-digit',
	hour12: true
};

export const DateTime: React.FC = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime(new Date());
		}, 60000);

		return () => clearInterval(intervalId);
	}, []);

	const formattedDate = new Intl.DateTimeFormat(undefined, DATE_OPTIONS).format(currentTime);
	const formattedTime = new Intl.DateTimeFormat(undefined, TIME_OPTIONS).format(currentTime);

	return (
		<Stack
			direction='row'
			spacing={1}
			sx={{ mb: 2 }}
		>
			<Typography
				variant='heading_secondary'
				color='text.secondary'
				sx={{ fontSize: '24px' }}
			>
				{formattedDate}
			</Typography>
			<Typography
				variant='heading_secondary'
				color='text.secondary'
				sx={{ fontSize: '24px' }}
			>
				{formattedTime}
			</Typography>
		</Stack>
	);
};
