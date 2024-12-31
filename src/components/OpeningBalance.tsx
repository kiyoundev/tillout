// import { useState } from "react";
import {TextField, InputAdornment} from "@mui/material";
import { OpeningBalanceProp } from "../types";

// User input field for the default amount of cash to be used for next day operation
export const OpeningBalance : React.FC<OpeningBalanceProp> = ({currency}) => {

    return (
        <TextField
            fullWidth
            type="number"
            helperText="helpertext"
            label="Opening Balance"
            slotProps={{
                input: {
                    startAdornment: <InputAdornment position="start">{currency.symbol}</InputAdornment>
                }
            }}
        />
    )
}