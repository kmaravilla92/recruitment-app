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
    Stack,
    TextField,
    Typography
} from '@mui/material'

import {
    Add as AddIcon,
    Close as CloseIcon,
} from '@mui/icons-material'

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
    'Contact Number',
])

const defaultFormField = fieldsToFormObject(rowFields)
const defaultFormFields = Array(1).fill(defaultFormField)

const fieldKey = 'character_reference_list'

const fields = [
    {
        label: 'Character References',
        key: fieldKey,
        defaultValue: defaultFormFields,
    }
]

function CharacterReferenceRow({
    index,
    data,
    errors,
    onChange,
    onDelete,
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

    useEffect(() => {
        onChange(rowData)
    }, [rowData])

    function handleInputChange(key, e) {
        setData(key, e.target.value)
    }

    function handleRemoveClick(e) {
        e.preventDefault();
        onDelete(index)
    }

    let deleteButton = (
        <ButtonRow
            variant="text"
            sx={{
                mt: 0
            }}
            onClick={handleRemoveClick}
        >
            Delete <CloseIcon />
        </ButtonRow>
    )

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    mb: 2,
                }}
            >
                <Typography
                    variant="h6"
                >
                    Character Reference {index + 1}
                </Typography>
                {deleteButton}
            </Stack>
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
                                error={errors[errorKey] && errors[errorKey].length > 0}
                                onChange={handleInputChange.bind(null, key)}
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
    const [rows, setRows] = useState(data[fieldKey]);
    
    function handleAddClick() {
        setRows(rows => {
            return [
                ...rows,
                [defaultFormField]
            ]
        })
    }

    function handleOnDelete(index) {
        setRows(rows => {
            return rows.filter((row, i) => i !== index)
        })
        setData(data => {
            data[step][fieldKey] = data[step][fieldKey].filter((row, i) => i !== index)
            return data
        })
    }

    function handleOnChange(index, newData) {
        setData(data => {
            data[step][fieldKey][index] = newData
            return data
        })
    }

    return (
        <>
            {rows.map((row, index) => {
                return (
                    <CharacterReferenceRow
                        key={index}
                        index={index}
                        data={data?.[fieldKey]?.[index] || {}}
                        errors={errors}
                        onChange={handleOnChange.bind(this, index)}
                        onDelete={handleOnDelete.bind(this, index)}
                        clearErrors={clearErrors}
                    />
                )
            })}
            <ButtonRow
                onClick={handleAddClick}
                variant="text"
            >
                Add Character Reference <AddIcon />
            </ButtonRow>
        </>
    )
}

export default {
    step,
    Component,
    fields
}