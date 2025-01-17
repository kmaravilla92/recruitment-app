import _ from 'lodash'

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

const label = 'Educational Background'

const types = [
    'Tertiary',
    'Vocational',
    'Secondary',
    'Primary',
]

const rowFields = labelsToFieldConfig([
    'Educational Status',
    'School',
    'Period Covered',
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

const fieldKey = 'educational_background_list'

const fields = [
    {
        label: 'Educational Background',
        key: fieldKey,
        defaultValue: defaultValue,
    },
]

const TypeRow = ({
    type,
    typeKey,
    onChange,
    data,
    errors,
    clearErrors
}) => {
    const {
        data: rowData,
        setData
    } = useForm(_.merge(
        {},
        defaultFormFields,
        data[typeKey]
    ));

    useEffect(() => {
        onChange(typeKey, rowData)
    }, [rowData])

    function handleOnChange(key, e) {
        setData && setData(key, e.target.value)
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
                    const errorKey = `${typeKey}.${key}`;
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
                                defaultValue={data?.[typeKey]?.[key] || ""}
                                variant="filled"
                                error={errors?.[errorKey]?.length > 0}
                                onChange={handleOnChange.bind(null, key)}
                                onKeyUp={clearErrors?.bind(null, errorKey)}
                                helperText={errors?.[errorKey] || ""}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

function Component({
    data,
    setData,
    errors,
    clearErrors
}) {
    function handleOnChange(type, educData) {
        setData && setData(data => {
            data[step].educational_background_list[type] = educData
            return data
        })
    }

    return (
        <Stack
            spacing={2}
        >
            {types.map(type => {
                const typeKey = type.toLowerCase()
                return (
                    <TypeRow
                        key={typeKey}
                        type={type}
                        typeKey={typeKey}
                        data={data?.[fieldKey] || {}}
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
    label,
    Component,
    fields
}