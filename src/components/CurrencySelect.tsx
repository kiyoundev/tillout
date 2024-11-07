import { TextField, Autocomplete} from "@mui/material";
import { currencies } from "../assets/currencies";
import { useState, useEffect} from "react";
import { set } from "react-hook-form";

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

    // Custom display of inputValue in Autocomplete component; "- <currency.label>"
    // const displayEndAdornment = (option) => (option ? `- ${option.name}` : "");
    const displayEndAdornment = (option) => `- ${option?.name ?? ''}`;
    // const displayEndAdornment = (option) => `- ${option?.name || ''}`;

    const displayFlag = (code, container: string) => (
        <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
            src={`https://flagcdn.com/w20/${code}.png`}
            alt=""
            style={container == 'input' ? { marginLeft: '0.2em', marginRight: '0.5em' } : { marginRight: '0.5em' }}
        />        
    );

    const [selectedValue, setSelectedValue] = useState(currencies[0]);
    const [inputValue, setInputValue] = useState(selectedValue ? displayEndAdornment(selectedValue) : "");
    const [helperText, setHelperText] = useState('Please select a currency');
    const [inputFocused, setInputFocused] = useState(false);

    // console.log('selectedValue: ', selectedValue);
    // console.log('inputValue: ', inputValue);    
    // console.log('inputBlurred: ', inputBlurred);
    // console.log('inputFocused: ', inputFocused);

    // consider using React.useMemo() for focus
    // https://codesandbox.io/embed/t36437?module=/src/Demo.js&fontsize=12

    return (
        <>
            <div>{`selectedValue: ${selectedValue !== null ? `'${selectedValue.label}'` : 'null'}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div>
            <div>{`inputFocused: '${inputFocused}'`}</div>
            
        <Autocomplete
            disableClearable
            blurOnSelect
            // clearOnBlur
            // clearOnEscape
            options={currencies}
            value={selectedValue}
            onChange={(event, newValue, reason) => {
                // console.log(`****************** onChange occured! ******************`);
                // console.log(`newValue: ${newValue.label}\nreason: ${reason}`);
                setSelectedValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue, reason) => {
                // console.log(`**************** onInputChange occured! ****************`);
                // console.log(`newInputValue: ${newInputValue}\nreason: ${reason}`);
                setInputValue(newInputValue);
            }}
            getOptionLabel={(option) => displayEndAdornment(option)}
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
                        {displayFlag(option.code, "")}
                        {option.label} - {option.name}
                    </li>
                )
            }}            
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    label="Currency"
                    placeholder="Type to search"
                    helperText={helperText}
                    onFocus={ () => {
                        // console.log(`******************* onFocus occured! *******************`);
                        setInputFocused(true);``
                        setInputValue('');                   
                    }}
                    onBlur={() => {
                        // console.log(`******************* onBlur occured! *******************`);
                        setInputFocused(false)
                        if (inputValue !== "" && selectedValue) {setHelperText('');}
                    }}
                    slotProps ={{
                        input: {
                            ...params.InputProps,
                            sx: {
                                input: { color: 'gray' },
                                ...(inputFocused && {input: { color: 'black' }}),
                            },
                            startAdornment: (
                                (!inputFocused && selectedValue) && (
                                    <>
                                        {displayFlag(selectedValue.code, "input")}
                                        {selectedValue.label}
                                    </>
                                )                         
                            )
                        }
                    }}
                /> 
            )}
        />
        </>
    )
}

// const options = [
//     {
//         label: "Option 1",
//         name: "Option 1 Name"
//     },

//     {
//         label: "Option 2",
//         name: "Option 2 Name"
//     }    
// ];

// export const Test = () => {

//     // const displayCustomInput = (option) => (`Custom ${selectedValue.name}`);

//     const [selectedValue, setSelectedValue] = useState(options[0]);
//     const [inputValue, setInputValue] = useState(`This is ${selectedValue.name}`);
//     // const [inputValue, setInputValue] = useState(selectedValue ? displayCustomInput(selectedValue.name) : ""); // Initialize with custom value

//     // useEffect(() => {
//     //     console.log(`****************** useEffect occured! ******************`);
//     //     setInputValue(`This is ${selectedValue.name}`);
//     // }, [selectedValue]);

//     // console.log(`----------------- state change occured! -----------------\nselectedValue: ${selectedValue.label}\ninputValue: ${inputValue}`);
//     console.log(`selectedValue: ${selectedValue.label}\n`);
//     console.log(`inputValue: ${inputValue}`);

//     const handleChange = (event, newValue, reason) => {
//         // console.log(`****************** onChange occured! ******************`);
//         // console.log(`newValue: ${newValue.label}\nreason: ${reason}`);
//         setSelectedValue(newValue);
//     };

//     const handleInputChange = (event, newInputValue, reason) => {
//         // console.log(`****************** onInputChange occured! ******************`);
//         // console.log(`newInputValue: ${newInputValue}\nreason: ${reason}`);
//         // console.log(reason === "input");
//         // reason === "input" && setInputValue(newInputValue);
//         setInputValue(newInputValue);
//     };    

//     return (
//         <Autocomplete
//             blurOnSelect
//             clearOnBlur
//             disableClearable

//             options={options}
//             value={selectedValue}
//             onChange={handleChange}            
//             inputValue={inputValue}
//             onInputChange={handleInputChange}

//             getOptionLabel={(option) => {
//                 return (`This is ${option.name}`);
//             }}
//             // getOptionLabel={(option) => option.name} // Custom display for input value
//             renderInput={(params) => <TextField {...params} />}
//             // renderOption={(props, option)=> {
//             //     const { key, ...otherProps } = props;
//             //     <li key={key}{...otherProps}>
//             //         {option.label} - {option.name}
//             //     </li>
//             // }}
//         />
//     );
// };