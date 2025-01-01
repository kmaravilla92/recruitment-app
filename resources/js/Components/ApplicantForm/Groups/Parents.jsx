import {
    useEffect,
} from 'react'

import {
    useForm,
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

const step = 9

const types = [
    'Father',
    'Mother',
]

const rowFields = labelsToFieldConfig([
    'Full Name',
    'Occupation',
    {
        key: 'birthday',
        label: 'Birthday (MM/DD/YYYY)',
    }
])

const defaultFormFields = fieldsToFormObject(rowFields)

const fields = [
    {
        label: 'Father Detail',
        key: 'father_detail',
        defaultValue: {...defaultFormFields},
    },
    {
        label: 'Mother Detail',
        key: 'mother_detail',
        defaultValue: {...defaultFormFields},
    },
]

const ParentRow = ({
    type,
    onChange
}) => {
    const {
        data,
        setData
    } = useForm(defaultFormFields)

    useEffect(() => {
        onChange(data)
    }, [data])

    function handleOnChange(key, e) {
        setData(key, e.target.value)
    }

    return (
        <>
            <Typography
                sx={{ mb: 2 }}
                variant="h6"
            >
                {type}
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
                                autoComplete="off"
                                onChange={handleOnChange.bind(this, key)}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

function Component({
    setData
}) {
    function handleOnChange(type, parentData) {
        setData(data => {
            data[step][`${type}_detail`] = parentData
            return data
        });
    }

    return (
        <>
            {types.map(type => {
                return (
                    <ParentRow
                        key={type}
                        type={type}
                        onChange={handleOnChange.bind(this, type.toLowerCase())}
                    />
                )
            })}
        </>
    );
}

export default {
    step,
    Component,
    fields
}