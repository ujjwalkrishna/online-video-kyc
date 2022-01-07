import React from 'react';
import TextField from '@mui/material/TextField';

export default function Input(props) {
    const { name, label, value, error = null, onChange, ...other } = props;

    let isSearchBar = false;
    let inputRef;
    if (props.inputRef) {
        isSearchBar = true;
        inputRef = props.inputRef
    }
    return (
        <>
            {
                isSearchBar == true ? (<TextField
                    id="outlined-basic"
                    variant="outlined"
                    label={label}
                    name={name}
                    inputRef={inputRef}
                    value={value}
                    onChange={onChange}
                    {...other}
                    {...(error && { error: true, helperText: error })}
                />) : (
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label={label}
                        name={name}
                        value={value}
                        onChange={onChange}
                        {...other}
                        {...(error && { error: true, helperText: error })}
                    />)
            }
        </>
    )
}