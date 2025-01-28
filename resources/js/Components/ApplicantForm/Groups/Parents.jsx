import _ from 'lodash'

import {
    useEffect,
} from 'react'

import {
    useForm,
} from '@inertiajs/react'

import {
    useTheme,
} from '@mui/material/styles'

import {
    Grid2 as Grid,
    Typography
} from '@mui/material'

import InputField from '@/Components/ApplicantForm/InputField'

import {
    labelsToFieldConfig,
    fieldsToFormObject,
} from '@/helpers'

const step = 9

const label = 'Parents'

const types = [
    'Father',
    'Mother',
]

const rowFields = labelsToFieldConfig([
    {
        label: 'Full Name',
        allowNA: true,
    },
    {
        label: 'Occupation',
        allowNA: true,
    },
    {
        key: 'birthday',
        label: 'Birthday (MM/DD/YYYY)',
        inputType: 'datepicker',
        allowNA: true,
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
    typeKey,
    onChange,
    errors,
    data,
    clearErrors
}) => {
    const {
        data: rowData,
        setData,
    } = useForm(_.merge(
        {},
        defaultFormFields,
        data
    ));

    useEffect(() => {
        onChange(rowData)
    }, [rowData])

    const theme = useTheme()

    function handleOnChange(key, value) {
        setData && setData(key, value)
    }

    return (
        <>
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    color: theme.palette.primary.main,
                }}
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
                    label,
                    inputType,
                    allowNA,
                }) => {
                    const errorKey = `${typeKey}.${key}`
                    return (
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                            key={key}
                        >
                            <InputField
                                inputType={inputType}
                                label={label}
                                customValue={data?.[key] || ""}
                                error={errors?.[errorKey]?.length > 0}
                                onChange={handleOnChange.bind(null, key)}
                                clearErrors={clearErrors?.bind(null, errorKey)}
                                helperText={errors?.[errorKey] || ""}
                                allowNA={allowNA}
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
    function handleOnChange(typeKey, parentData) {
        setData && setData(data => {
            data[step][typeKey] = parentData
            return data
        });
    }

    return (
        <>
            {types.map(type => {
                const typeKey = `${type.toLowerCase()}_detail`
                return (
                    <ParentRow
                        key={type}
                        type={type}
                        typeKey={typeKey}
                        errors={errors}
                        data={data?.[typeKey] || {}}
                        onChange={handleOnChange.bind(this, typeKey)}
                        clearErrors={clearErrors}
                    />
                )
            })}
        </>
    );
}

export default {
    step,
    label,
    Component,
    fields
}