import { TextField, Autocomplete} from "@mui/material";
import { currencies } from "../assets/currencies";
import { useState, useEffect} from "react";

// export const CurrencySelect = () => {
//     const { control } = useForm();
//     const [selectedOption, setSelectedOption] = useState(null); // Store the selected option object
//     const [inputValue, setInputValue] = useState(''); // Store the input value

//     return (
//         <Controller
//             name="Currency"
//             control={control}
//             defaultValue={currencies[0]}
//             render={({ field: {onChange, ...field}, fieldState: {invalid} }) => (
//             // render={({ field }) => (
//                 // console.log('field: ', field),
//                 <Autocomplete
//                     {...field}
//                     clearOnEscape
//                     disableClearable
//                     options={currencies}
//                     onChange={(_, data) => onChange(data)}
//                     getOptionLabel={(option) => `- ${option.name}`}
//                     renderOption={(props, option) => {
//                         const {key, ...optionProps} = props;
//                         return (
//                             <li key={key} {...optionProps}>
//                                 <img
//                                     loading="lazy"
//                                     width="20"
//                                     srcSet={`https://flagcdn.com/w40/${option.code}.png 2x`}
//                                     src={`https://flagcdn.com/w20/${option.code}.png`}
//                                     alt=""
//                                     style={{ marginRight: '0.5em' }}
//                                 />
//                                 {option.label} - {option.name}
//                             </li>
//                         )
//                     }}
//                     renderInput={(params) => (
//                         // console.log(`params: `, params),
//                         <TextField 
//                             {...params} 
//                             label="Currency"
//                             value="ALWAYS THIS"
//                         />
//                     )}
//                 />
//             )}
//         />
//     );
// };

export const CurrencySelect2 = () => {
    const [selectedValue, setSelectedValue] = useState(currencies[0]);
    const [inputValue, setInputValue] = useState(selectedValue ? ` - ${selectedValue.name}` : "");
    const [helperText, setHelperText] = useState('Please select a currency');
    const [inputFocused, setInputFocused] = useState(false);
    const [inputBlurred, setInputBlurred] = useState(true);

    // console.log('selectedValue: ', selectedValue);
    // console.log('inputValue: ', inputValue);    
    // console.log('inputBlurred: ', inputBlurred);
    // console.log('inputFocused: ', inputFocused);

    // consider using React.useMemo() for focus
    // https://codesandbox.io/embed/t36437?module=/src/Demo.js&fontsize=12

    useEffect(() => {
        setInputBlurred(!inputFocused);
    }, [inputFocused]);

    useEffect(() => {
        selectedValue ? setInputValue(` - ${selectedValue.name}`) : setInputValue('');
    }, [selectedValue]);


    const handleInputChange = (_, newInputValue) => {
        setInputValue(newInputValue);
    };

    const handleBlur = () => {
        setInputFocused(false);
    };

    const handleFocus = () => {
        setInputFocused(true);
        if (selectedValue) { setInputValue(''); }
    };

    return (
        <>
            {/* <div>{`selectedValue: ${selectedValue !== null ? `'${selectedValue.label}'` : 'null'}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div>
            <div>{`inputFocused: '${inputFocused}'`}</div>
            <div>{`inputBlurred: '${inputBlurred}'`}</div> */}
            
        <Autocomplete
            options={currencies}
            filterOptions={(options, params) => {
                const filteredOptions = options.filter((option) => {
                    const inputValue = params.inputValue.toLowerCase();
                    return option.name.toLowerCase().includes(inputValue) || option.label.toLowerCase().includes(inputValue);
                });
                return filteredOptions;                
            }}
            value={selectedValue}
            onChange={(_, newValue) => {
                setSelectedValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            blurOnSelect
            disableClearable
            clearOnBlur
            clearOnEscape
            getOptionLabel={(option) => option ? `- ${option.name}` : ''}
            renderOption={(props, option) => {
                const {key, ...optionProps} = props;
                return (
                    <li key={key} {...optionProps}>
                        <img
                            loading="lazy"
                            width="20"
                            srcSet={`https://flagcdn.com/w40/${option.code}.png 2x`}
                            src={`https://flagcdn.com/w20/${option.code}.png`}
                            alt=""
                            style={{ marginRight: '0.5em' }}
                        />
                        {option.label} - {option.name}
                    </li>
                )
            }}            
            renderInput={(params) => (
                // console.log(`params: `, params),
                <TextField 
                    {...params} 
                    label="Currency"
                    placeholder="Type to search"
                    helperText={helperText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    InputProps = {{
                        ...params.InputProps,
                        sx: {
                            input: { color: 'gray' },
                            ...(inputFocused && {input: { color: 'black' }}),
                        },
                        startAdornment: (
                            (!inputFocused && inputValue !== "") && selectedValue && (
                                <>
                                    <img
                                        loading="lazy"
                                        width="20"
                                        srcSet={`https://flagcdn.com/w40/${selectedValue.code}.png 2x`}
                                        src={`https://flagcdn.com/w20/${selectedValue.code}.png`}
                                        alt=""
                                        style={{ marginLeft: '0.2em', marginRight: '0.5em' }}
                                    />
                                    {selectedValue.label}
                                </>
                            )                         
                        )
                    }}
                /> 
            )}
        />
        </>
    )
}