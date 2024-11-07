import { useState } from "react";
import {Box, TextField, Stack, Input, InputAdornment} from "@mui/material";

export const MainInput = () => {
    return (
        <Stack>
            <TextField
                label="label"
                slotProps={{
                    input:{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }
                }}
            />
        </Stack>
    )
}

