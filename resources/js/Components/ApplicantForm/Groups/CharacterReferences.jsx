import {
    useState,
    useEffect,
} from 'react'

import {
    useForm
} from '@inertiajs/react'

import {
    Grid2 as Grid,
    TextField,
    Typography
} from '@mui/material'

import {
    labelsToFieldConfig,
    fieldsToFormObject,
} from '@/helpers'

import ButtonRow from '@/Components/ApplicantForm/ButtonRow'

const step = 15

const rowFields = labelsToFieldConfig([
    'Full Name',
    'Occupation',
    'Company',
    'Address',
])

const defaultFormField = fieldsToFormObject(rowFields)
const defaultFormFields = Array(4).fill(defaultFormField)

const fields = [
    {
        label: 'Character References',
        key: 'character_reference_list',
        defaultValue: defaultFormFields,
    }
]

function CharacterReferenceRow({
    i,
    onChange,
    errors,
    clearErrors
}) {
    const {
        data,
        setData
    } = useForm(defaultFormField);

    useEffect(() => {
        onChange(data)
    }, [data])

    function handleOnChange(key, e) {
        setData(key, e.target.value)
    }

    return (
        <>
            <Typography
                sx={{
                    mb: 2,
                }}
                variant="h6"
            >
                Character Reference {i + 1}
            </Typography>
            <Grid
                sx={{
                    mb: 2
                }}
                container
                spacing={2}
            >
                {rowFields.map(({
                    key,
                    label
                }) => {
                    const errorKey = `${i}.${key}`
                    return (
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                            key={key}
                        >
                            <TextField
                                fullWidth
                                label={label}
                                error={errors[errorKey] && errors[errorKey].length > 0}
                                onChange={handleOnChange.bind(null, key)}
                                onKeyUp={clearErrors.bind(null, errorKey)}
                                helperText={errors[errorKey] || ""}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

function Component({
    setData,
    errors,
    clearErrors
}) {
    const [rows, setRows] = useState(defaultFormFields);
    
    function handleClick() {
        setRows(rows => {
            return [
                ...rows,
                [defaultFormField]
            ]
        })
    }

    function handleOnChange(i, newData) {
        setData(data => {
            data[step].character_reference_list[i] = newData
            return data
        })
    }

    return (
        <>
            {rows.map((row, i) => {
                return (
                    <CharacterReferenceRow
                        key={i}
                        i={i}
                        errors={errors}
                        onChange={handleOnChange.bind(this, i)}
                        clearErrors={clearErrors}
                    />
                )
            })}
            <ButtonRow
                onClick={handleClick} variant="text"
            >
                Add Character Reference +
            </ButtonRow>
        </>
    )
}

export default {
    step,
    Component,
    fields
}