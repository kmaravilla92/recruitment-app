import {
    useState,
} from 'react'

import dayjs from 'dayjs'

import {
    Checkbox,
    FormGroup,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField,
} from '@mui/material'

import {
    MobileDatePicker,
} from '@mui/x-date-pickers/MobileDatePicker'

export default function({
    inputType,
    customValue,
    onChange,
    selectOptions,
    allowNA,
    clearErrors,
    ...props
}) {
    const [value, setValue] = useState(customValue)

    inputType = inputType || 'text'

    function handleOnChange(e) {
        if (['text', 'password', 'select'].includes(inputType)) {
            onChange(e.target.value)
            setValue(e.target.value)
        } else if (['datepicker'].includes(inputType)) {
            onChange(e.format('YYYY-MM-DD'))
            setValue(e.format('YYYY-MM-DD'))
        } else if (['switch'].includes(inputType)) {
            onChange(e.target.checked)
            setValue(e.target.checked)
        }
    }

    function handleOnFocus() {
        if (props.error) {
            clearErrors()
        }
    }

    function handleNAOnChange(e) {
        let value = '';
        if (e.target.checked) {
            value = 'N/A'
            if (['datepicker'].includes(inputType)) {
                value = dayjs()
            }
        }
        onChange(value)
        setValue(value)
        clearErrors()
    }

    let naControlGroup = null
    
    if (allowNA) {
        const naCheckbox = (
            <Checkbox
                size="small"
                onChange={handleNAOnChange}
            />
        )

        naControlGroup = (
            <FormGroup
                sx={{
                    color: "#000"
                }}
            >
                <FormControlLabel
                    control={naCheckbox}
                    label="N/A"
                />
            </FormGroup>
        )
    }

    if (props.helperText || naControlGroup) {
        props.helperText = (
            <Stack
                direction="row"
                sx={{
                    justifyContent: "space-between",
                }}
            >
                <span>{props.helperText}</span>
                {naControlGroup}
            </Stack>
        )
    }

    let inputControl = null
    
    if (['text', 'password'].includes(inputType)) {
        inputControl = (
            <TextField
                {...props}
                type={inputType}
                fullWidth
                value={value}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
            />
        )
    }

    if ('datepicker' == inputType) {
        inputControl = (
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
                        onFocus: handleOnFocus
                    }
                }}
            />
        )
    }

    if ('switch' == inputType) {
        inputControl = (
            <FormGroup row>
                <FormControlLabel
                    label={props.label}
                    control={
                        <Switch
                            checked={value}
                            onChange={handleOnChange}
                        />
                    }
                />
            </FormGroup>
        )
    }

    if ('select' == inputType) {
        inputControl = (
            <FormControl
                fullWidth
                error={props.error}
            >
                <InputLabel>
                    {props.label}
                </InputLabel>
                <Select
                    value={value}
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
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

    return inputControl
}