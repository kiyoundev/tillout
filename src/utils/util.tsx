import { Currency } from "../assets/currencies";

export const displayEndAdornment = (option: Currency) : string => `- ${option?.name ?? ''}`;

export const displayFlag = (code: string, container: string = 'input') : JSX.Element => (
    <img
        loading="lazy"
        width="25"
        srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
        src={`https://flagcdn.com/w40/${code}.png`}
        alt=""
        style={container != 'input' ? { marginRight: '0.5em' } : { marginLeft: '0.2em', marginRight: '0.5em' } }
    />        
);