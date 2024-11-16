import { useState, useReducer} from "react";
// import { set } from "react-hook-form";
import { TextField, Autocomplete} from "@mui/material";
import { currencies, Currency} from "../assets/currencies";
import { displayEndAdornment, displayFlag } from "../utils/util";


interface Action {
    type: "input" | "reset" | "clear" | "blur" | "selectOption" | "removeOption" | "focus"
    payload: string;
}

interface InputFieldProps {
    selectedValue: Currency;
    onFocusChange: (inputFocused : boolean) => void;
    InputProps?: object;
}

interface CurrencySelectProps {
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
}

export const InputField = (props: InputFieldProps) : JSX.Element => {
    const { onFocusChange, selectedValue, ...params } = props;
    const [inputFocused, setInputFocused] = useState<boolean>(false);

    const toggleInputFocused = () : void => {
        setInputFocused(prevFocused => {
            onFocusChange(!prevFocused);
            return (!prevFocused);
        })
    }
    
    return (
        <TextField 
            {...params}
            label= "Currency"
            placeholder= "Type to search..."
            onFocus= {toggleInputFocused}
            onBlur= {toggleInputFocused}
            slotProps= {{
                input: {
                    ...params.InputProps,
                    sx: {
                        input : {
                            color: inputFocused ? 'black' : 'gray'
                        }
                    },
                    startAdornment: (
                        selectedValue && !inputFocused && (
                            <>
                                {displayFlag(selectedValue.code, "input")}
                                {selectedValue.label}
                            </>
                        )                         
                    )
                }
            }}
        />
    );
}

export const CurrencySelect = ({currency, onCurrencyChange} : CurrencySelectProps) : JSX.Element => {

    const handleFocusChange = (inputFocused : boolean) : void => {
        inputFocused && dispatch({type: 'focus', payload: ""})
    }

    const reducer = (state: string, action: Action) : string => {
        switch (action.type) {
            case 'blur':
                // Autocomplete's blurOnSelect causes inputValue to be reverted back to original value, causing re-render
                // Re-render only when inputValue's state changes from empty string to action.payload
                return (state && state !== action.payload) ? state : action.payload;
            default:
                return action.payload;
        }
    }

    const [inputValue, dispatch] = useReducer(reducer, currency ? displayEndAdornment(currency) : "");

    // console.log('selectedValue: ', selectedValue);
    // console.log('inputValue: ', inputValue);
    // console.log('inputFocused: ', inputFocused);

    return (
        <Autocomplete
            disableClearable
            blurOnSelect
            clearOnEscape
            options={currencies}
            value={currency}
            onChange={(_, newValue) => {
                onCurrencyChange(newValue);
            }}
            inputValue={inputValue}
            onInputChange = {(_, newInputValue, reason) => {
                dispatch({type: reason, payload: newInputValue});
            }}
            getOptionLabel={(option) => 
                displayEndAdornment(option)
            }
            filterOptions={(options, params) => {
                const filteredOptions = options.filter((option) => {
                    const inputValue = params.inputValue.toLowerCase();
                    return option.name.toLowerCase().includes(inputValue) || option.label.toLowerCase().includes(inputValue);
                });
                return filteredOptions;                
            }}
            renderOption={(props, option) => {
                const {key, ...optionProps} = props;
                return (
                    <li key={key} {...optionProps}>
                        {displayFlag(option.code)}
                        {option.label} {option.name}
                    </li>
                )
            }}
            // renderInput callback is called twice
            renderInput={(params) => (
                <InputField 
                    {...params}
                    onFocusChange={handleFocusChange}
                    selectedValue={currency}
                />
            )}
        />
    )
}