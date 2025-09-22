import React from 'react';
import { Stack, Button } from '@mui/material';
import { UICONSTANTS } from '@/styles/UIConstants';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useNavigate } from 'react-router-dom';

export type ActionButtonsProps = {
	page: 'entry' | 'summary';
	onReset?: () => void;
	onSubmit?: () => void;
};

const EditEntryButton = () => {
	const navigate = useNavigate();
	return (
		<Button
			variant='secondary'
			startIcon={<KeyboardBackspaceOutlinedIcon />}
			onClick={() => navigate('/')}
		>
			Edit Entry
		</Button>
	);
};

// const ExportButton = () => (
// 	<Button
// 		variant='primary'
// 		endIcon={<FileUploadOutlinedIcon />}
// 	>
// 		Export
// 	</Button>
// );

const ResetButton = ({ onReset }: { onReset: () => void }) => (
	<Button
		variant='secondary'
		onClick={onReset}
	>
		Reset
	</Button>
);

const SubmitButton = ({ onSubmit }: { onSubmit: () => void }) => (
	<Button
		variant='primary'
		onClick={onSubmit}
	>
		Calculate
	</Button>
);

export const ActionButtons: React.FC<ActionButtonsProps> = ({ page, onReset, onSubmit }) => (
	<Stack
		direction='row'
		spacing={{ xs: UICONSTANTS.Button.spacing_xs, sm: UICONSTANTS.Button.spacing }}
		justifyContent='flex-end'
	>
		{page === 'entry' && (
			<>
				<ResetButton onReset={onReset!} />
				<SubmitButton onSubmit={onSubmit!} />
			</>
		)}
		{page === 'summary' && (
			<>
				<EditEntryButton />
				{/* <ExportButton /> */}
			</>
		)}
	</Stack>
);
