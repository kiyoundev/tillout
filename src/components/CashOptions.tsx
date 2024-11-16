import { FormControl, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
// import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

export const CashOptions = () => {
    const [cashOptions, setCashOptions] = useState({
        notesChecked: true,
        coinsChecked: false,
        rollsChecked: false
    })

    const handleCheckboxChange = () => {
        const {name, checked} = event.target;
        setCashOptions({...cashOptions, [name]: checked})
    }

    return (
        <>
        <FormGroup>
            <FormControlLabel
                label="Banknotes" 
                control={
                    <Checkbox
                        name="notesChecked" 
                        checked={cashOptions.notesChecked}
                        onChange={handleCheckboxChange}
                    />
                }
            />
            <FormControlLabel
                label="Coins" 
                control={
                    <Checkbox 
                        name="coinsChecked"
                        checked={cashOptions.coinsChecked}
                        onChange={handleCheckboxChange}
                    />
                }
            />
            <FormControlLabel
                label="Rolled Coins" 
                control={
                    <Checkbox
                        name="rollsChecked"
                        checked={cashOptions.rollsChecked}
                        onChange={handleCheckboxChange}
                    />
                }
            />
        </FormGroup>
        </>
    );
}