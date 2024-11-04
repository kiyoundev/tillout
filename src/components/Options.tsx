import { FormControl, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

export const Options = () => {
    const [notesChecked, setNotesChecked] = useState(true);
    const [coinsChecked, setCoinsChecked] = useState(false);
    const [rollsChecked, setRollsChecked] = useState(false);

    return (
        <>
        {/* <div>{`notesChecked: '${notesChecked}'`}</div>
        <div>{`coinsChecked: '${coinsChecked}'`}</div>
        <div>{`rollsChecked: '${rollsChecked}'`}</div> */}
        <FormGroup>
            <FormControlLabel
                label="Banknotes" 
                control={
                    <Checkbox 
                        checked={notesChecked}
                        onChange={(event) => setNotesChecked(event.target.checked)}
                    />
                }
            />
            <FormControlLabel
                label="Coins" 
                control={
                    <Checkbox 
                        checked={coinsChecked}
                        onChange={(event) => setCoinsChecked(event.target.checked)}
                    />
                }
            />
            <FormControlLabel
                label="Rolled Coins" 
                control={
                    <Checkbox 
                        checked={rollsChecked}
                        onChange={(event) => setRollsChecked(event.target.checked)}
                    />
                }
            />
        </FormGroup>
        </>
    );
}