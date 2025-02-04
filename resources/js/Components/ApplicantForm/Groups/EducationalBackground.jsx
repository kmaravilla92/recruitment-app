import _ from 'lodash'

import {
    useEffect
} from 'react'

import {
    useForm,
} from '@inertiajs/react'

import {
    useTheme,
} from '@mui/material/styles'

import {
    Grid2 as Grid,
    Stack,
    Typography,
} from '@mui/material'

import InputField from '@/Components/ApplicantForm/InputField'

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
    {
        label: 'Educational Status',
        allowNA: true,
    },
    {
        label: 'School',
        allowNA: true,
    },
    {
        label: 'Period Covered',
        allowNA: true,
    },
    {
        label: 'Degree/Course',
        allowNA: true,
    }
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

    const theme = useTheme()

    function handleOnChange(key, value) {
        setData && setData(key, value)
    }

    return (
        <>
            <Typography
                sx={{
                    color: theme.palette.primary.main,
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
                    label,
                    allowNA,
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
                            <InputField
                                label={label}
                                customValue={data?.[typeKey]?.[key] || ""}
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