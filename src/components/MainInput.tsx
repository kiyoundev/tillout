import { useState } from "react";
import {Box, TextField, Stack, Input, InputAdornment} from "@mui/material";

export const MainInput = (props) => {
    const {currency} = props;
    return (
        <TextField
            fullWidth
            label="label"
            type="number"
            slotProps={{
                input: {
                    startAdornment: <InputAdornment position="start">{currency.symbol}</InputAdornment>
                }
            }}
        />
    )
}

