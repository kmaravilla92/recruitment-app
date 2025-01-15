import dayjs from 'dayjs'

import {
    TextField,
} from '@mui/material'

import {
    DatePicker,
} from '@mui/x-date-pickers/DatePicker';

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
            onChange(e)
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
            <DatePicker
                {...props}
                defaultValue={dayjs(customValue)}
                onChange={handleOnChange}
            />
        )
    }
}