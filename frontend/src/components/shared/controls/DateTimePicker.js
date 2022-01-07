import React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';

export default function DateTime(props) {

    const { name, label, value, onChange } = props
    const [value1, setValue1] = React.useState(value);

    const handleChange = (newValue) => {
        setValue1(newValue);
        onChange({
            target: {
                name, value: value1
            }
        })
    };
    
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                label={label}
                name={name}
                value={value1}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}