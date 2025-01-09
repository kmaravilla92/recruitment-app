import {
    useEffect
} from 'react'

import {
    useForm,
} from '@inertiajs/react'

import {
    Grid2 as Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material'

import {
    labelsToFieldConfig,
    fieldsToFormObject,
} from '@/helpers'

const step = 7

const types = [
    'Tertiary',
    'Vocational',
    'Secondary',
    'Primary',
]

const rowFields = labelsToFieldConfig([
    'Educational Status',
    'School',
    'Period/Covered',
    'Degree/Course',
])

const defaultFormFields = fieldsToFormObject(rowFields)

const defaultValue = Object.fromEntries(
    types.map(type => {
        return [
            type.toLowerCase(),
            defaultFormFields,
        ]
    })
)

const fields = [
    {
        label: 'Educational Background',
        key: 'educational_background_list',
        defaultValue: defaultValue,
    },
]

const TypeRow = ({
    type,
    onChange,
    errors,
    clearErrors
}) => {
    const {
        data,
        setData
    } = useForm(defaultFormFields);

    useEffect(() => {
        onChange(type.toLowerCase(), data)
    }, [data])

    function handleOnChange(key, e) {
        setData(key, e.target.value)
    }

    return (
        <>
            <Typography
                sx={{
                    mb: 1,
                }}
                variant="h6"
            >
                {type}
            </Typography>
            <Grid
                sx={{
                    mb: 2,
                }}
                container
                spacing={2}
            >
                {rowFields.map(({
                    key,
                    label
                }) => {
                    const errorKey = `${type.toLowerCase()}.${key}`;
                    return (
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4,
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
    function handleOnChange(type, educData) {
        setData(data => {
            data[step].educational_background_list[type] = educData
            return data
        })
    }

    return (
        <Stack
            spacing={2}
        >
            {types.map(type => {
 
                return (
                    <TypeRow
                        key={type.toLowerCase()}
                        type={type}
                        errors={errors}
                        onChange={handleOnChange}
                        clearErrors={clearErrors}
                    />
                )
            })}
        </Stack>
    )
}

export default {
    step,
    Component,
    fields
}