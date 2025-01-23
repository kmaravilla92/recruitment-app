import dayjs from 'dayjs'

import {
    FormGroup,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
} from '@mui/material'

import {
    MobileDatePicker,
} from '@mui/x-date-pickers/MobileDatePicker';

export default function({
    inputType,
    customValue,
    onChange,
    selectOptions,
    ...props
}) {
    inputType = inputType || 'text'

    function handleOnChange(e) {
        if (['text', 'password', 'select'].includes(inputType)) {
            onChange(e.target.value)
        } else if (['datepicker'].includes(inputType)) {
            onChange(e.format('YYYY-MM-DD'))
        } else if (['switch'].includes(inputType)) {
            onChange(e.target.checked)
        }
    }
    
    if (['text', 'password'].includes(inputType)) {
        return (
            <TextField
                {...props}
                type={inputType}
                fullWidth
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
                slotProps={{
                    textField: {
                        fullWidth: true,
                        variant: props.variant,
                        error: props.error,
                        helperText: props.helperText,
                    }
                }}
            />
        )
    }

    if ('switch' == inputType) {
        return (
            <FormGroup row>
                <FormControlLabel
                    label={props.label}
                    control={
                        <Switch
                            defaultChecked={null !== customValue && "" !== customValue}
                            onChange={handleOnChange}
                        />
                    }
                />
            </FormGroup>
        )
    }

    if ('select' == inputType) {
        console.log({ props })
        return (
            <FormControl
                fullWidth
                error={props.error}
            >
                <InputLabel>
                    {props.label}
                </InputLabel>
                <Select
                    defaultValue={customValue}
                    onChange={handleOnChange}
                    label={props.label}
                >
                    {selectOptions.map((option, i) => {
                        return (
                            <MenuItem
                                key={i}
                                value={option.value}
                            >
                                {option.label}
                            </MenuItem>
                        )
                    })}
                </Select>
                <FormHelperText>{props.helperText}</FormHelperText>
            </FormControl>
        )
    }
}