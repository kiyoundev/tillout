import React from 'react';
import { Stack, Button } from '@mui/material';
import { UICONSTANTS } from '@/styles/UIConstants';
import { useNavigate } from 'react-router-dom';
import { useResetCount } from '@/stores/tillStore';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

export type ActionButtonsProps = {
	page: 'entry' | 'summary';
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

// const ExportButton = () => (
// 	<Button
// 		variant='primary'
// 		endIcon={<FileUploadOutlinedIcon />}
// 	>
// 		Export
// 	</Button>
// );

export const ActionButtons: React.FC<ActionButtonsProps> = ({ page }) => {
	const resetCount = useResetCount();
	const navigate = useNavigate();

	return (
		<Stack
			direction='row'
			spacing={{ xs: UICONSTANTS.Button.spacing_xs, sm: UICONSTANTS.Button.spacing }}
			justifyContent='flex-end'
		>
			{page === 'entry' && (
				<>
					<ResetButton onReset={resetCount} />
					<SubmitButton onSubmit={() => navigate('/summary')} />
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
};
