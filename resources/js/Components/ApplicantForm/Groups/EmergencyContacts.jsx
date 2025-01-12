import _ from 'lodash'

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

const step = 8

const rowFields = labelsToFieldConfig([
    'Name',
    'Address',
    'Relation',
    'Contact Number',
])

const defaultFormField = fieldsToFormObject(rowFields)
const defaultFormFields = Array(4).fill(defaultFormField)

const fieldKey = 'emergency_contact_list'

const fields = [
    {
        label: 'Emergency Contacts',
        key: fieldKey,
        defaultValue: defaultFormFields,
    }
]

function ContactRow({
    i,
    onChange,
    errors,
    data,
    clearErrors
}) {
    const {
        data: rowData,
        setData
    } = useForm(_.merge(
        {},
        defaultFormFields,
        data[i]
    ));

    useEffect(() => {
        onChange(rowData)
    }, [rowData])

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
                Contact {i + 1}
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
                    const errorKey = `${i}.${key}`;
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
                                defaultValue={data && data[i] && data[i][key] || ""}
                                variant="filled"
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
    data,
    setData,
    errors,
    clearErrors
}) {
    const [rows, setRows] = useState(defaultFormFields)
    
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
            data[step][fieldKey][i] = _.merge({}, newData)
            return data
        })
    }

    return (
        <>
            {rows.map((row, i) => {
                return (
                    <ContactRow
                        key={i}
                        i={i}
                        errors={errors}
                        data={data && data[fieldKey] || {}}
                        onChange={handleOnChange.bind(this, i)}
                        clearErrors={clearErrors}
                    />
                )
            })}
            <ButtonRow
                onClick={handleClick}
                variant="text"
            >
                Add Contact +
            </ButtonRow>
        </>
    )
}

export default {
    step,
    Component,
    fields
}