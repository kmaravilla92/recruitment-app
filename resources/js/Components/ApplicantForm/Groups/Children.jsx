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

const step = 12

const rowFields = labelsToFieldConfig([
    'Full Name',
    'Contact Number',
    {
        key: 'birthday',
        label: 'Birthday (MM/DD/YYYY)',
    },
])

const defaultFormField = fieldsToFormObject(rowFields)
const defaultFormFields = Array(4).fill(defaultFormField)

const fieldKey = 'child_detail_list'

const fields = [
    {
        label: 'Children',
        key: fieldKey,
        defaultValue: defaultFormFields,
    }
]

function ChildRow({
    index,
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
        defaultFormField,
        data
    ));

    // console.log({ index, data })

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
                Child {index + 1}
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
                    const errorKey = `${index}.${key}`
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
                                defaultValue={data?.[key] || ""}
                                variant="filled"
                                error={errors?.[errorKey]?.length> 0}
                                onChange={handleOnChange.bind(null, key)}
                                onKeyUp={clearErrors.bind(null, errorKey)}
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
    console.log({ data })
    const [rows, setRows] = useState(defaultFormFields);
    
    function handleClick() {
        setRows(rows => {
            return [
                ...rows,
                [defaultFormField]
            ]
        })
    }

    function handleOnChange(index, newData) {
        setData(data => {
            data[step].child_detail_list[index] = newData
            return data
        })
    }

    return (
        <>
            {rows.map((row, index) => {
                return (
                    <ChildRow
                        key={index}
                        index={index}
                        errors={errors?.[index]}
                        data={data?.[fieldKey]?.[index] || {}}
                        onChange={handleOnChange.bind(this, index)}
                        clearErrors={clearErrors}
                    />
                )
            })}
            <ButtonRow
                onClick={handleClick} variant="text"
            >
                Add Child +
            </ButtonRow>
        </>
    )
}

export default {
    step,
    Component,
    fields
}