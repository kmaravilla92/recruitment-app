import dayjs from 'dayjs'

import {
    TextField,
} from '@mui/material'

import {
    MobileDatePicker,
} from '@mui/x-date-pickers/MobileDatePicker';

export default function({
    inputType,
    customValue,
    onChange,
    ...props
}) {
    function handleOnChange(e) {
        if ('text' == inputType) {
            onChange(e.target.value)
        } else if ('datepicker' == inputType) {
            onChange(e.format('YYYY-MM-DD'))
        }
    }
    
    if ('text' == inputType) {
        return (
            <TextField
                {...props}
                defaultValue={customValue}
                onChange={handleOnChange}
            />
        )
    }

    if ('datepicker' == inputType) {
        return (
            <MobileDatePicker
                {...props}
                defaultValue={dayjs(customValue)}
                onChange={handleOnChange}
            />
        )
    }
}