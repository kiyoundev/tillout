import { useState, useReducer} from "react";
// import { set } from "react-hook-form";
import { TextField, Autocomplete} from "@mui/material";
import { currencies } from "../assets/currencies";
import { CurrencySelectProps, ACTIONTYPE, InputFieldProps, DisplayFlagProps } from '../types/index.ts'
import { displayEndAdornment} from "../utils/util";

const DisplayFlag: React.FC<DisplayFlagProps> = ({code, container = 'input'}) => (
    <img
        loading="lazy"
        width="25"
        srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
        src={`https://flagcdn.com/w40/${code}.png`}
        alt=""
        style={container == 'input' ? {marginLeft: '0.5em', marginRight: '0.5em'} : {marginRight: '0.5em'}}
    />    
);

export const InputField : React.FC<InputFieldProps> = (props) => {
    const { onFocusChange, currency, ...params } = props;
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
                        currency && !inputFocused && (
                            <>
                                <DisplayFlag code={currency.code}/>
                                {currency.label}
                            </>
                        )
                    )
                }
            }}
        />
    );
}

export const CurrencySelect:React.FC<CurrencySelectProps> = ({currency, onCurrencyChange}) => {

    const handleFocusChange = (inputFocused : boolean) : void => {
        inputFocused && dispatch({type: 'focus', payload: ""})
    }   

    const reducer = (state: string, action: ACTIONTYPE) : string => {
        switch (action.type) {
            // Autocomplete's blurOnSelect causes inputValue to be reverted back to original value, causing re-render
            // Re-render only when inputValue's state changes from empty string to action.payload
            case 'blur':
                return (state && state !== action.payload) ? state : action.payload;
            default:
                return action.payload;
        }
    }

    const [inputValue, dispatch] = useReducer(reducer, currency ? displayEndAdornment(currency) : "");

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
                        <DisplayFlag code={option.code} container="dropdown"/>                       
                        {option.label} {option.name}
                    </li>
                )
            }}
            // renderInput callback is called twice
            renderInput={(params) => (
                <InputField 
                    {...params}
                    onFocusChange={handleFocusChange}
                    currency={currency}
                />
            )}
        />
    )
}