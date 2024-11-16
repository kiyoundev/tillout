import { TextField, Grid2 } from "@mui/material";
// import { Grid } from "@mui/material/Grid2";

// const createFields = () => {
    
// }

export const FormInput = (props) => {
    const {selectedCurrency, cashOptions} = props;
    // console.log(selectedCurrency);
    // console.log(cashOptions.notesChecked);
    return (
        <Grid2 container spacing={2}>
            {selectedCurrency.bills.map((item, index) => (
                <Grid2 key={index} size="grow">
                    {cashOptions.notesChecked && 
                        <TextField
                        id={`outlined-basic-${index}`}
                        // label={`Input for ${item}`}
                        variant="outlined"
                        />                    
                    }
                </Grid2>
            ))}
        </Grid2>

    )
}