import { TextField as MuiTextField } from '@mui/material';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { useState } from 'react';

type TextFieldBaseProps = Pick<MuiTextFieldProps, 'label' | 'color' | 'helperText' | 'onChange' | 'onFocus' | 'onBlur' | 'value'>;

export const TextField = (props: TextFieldBaseProps) => {
	return (
		<MuiTextField
			{...props}
			variant='outlined'
		/>
	);
};

export default TextField;
