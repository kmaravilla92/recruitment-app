import _ from 'lodash'

import {
    useState,
    useEffect,
} from 'react'

import {
    useForm
} from '@inertiajs/react'

import {
    useTheme,
} from '@mui/material/styles'

import {
    Grid2 as Grid,
    Stack,
    Typography
} from '@mui/material'

import InputField from '@/Components/ApplicantForm/InputField'

import {
    Add as AddIcon,
    Close as CloseIcon,
} from '@mui/icons-material'

import {
    labelsToFieldConfig,
    fieldsToFormObject,
} from '@/helpers'

import ButtonRow from '@/Components/ApplicantForm/ButtonRow'

const step = 10

const label = 'Siblings Information'

const rowFields = labelsToFieldConfig([
    'Full Name',
    'Contact Number',
    {
        key: 'birthday',
        label: 'Birthday (MM/DD/YYYY)',
        inputType: 'datepicker',
        allowNA: true,
    },
])

const maxRows = 3

const defaultFormField = fieldsToFormObject(rowFields)
const defaultFormFields = Array(maxRows).fill(defaultFormField)

const fieldKey = 'sibling_detail_list'

const fields = [
    {
        label: 'Siblings',
        key: fieldKey,
        defaultValue: defaultFormFields,
    }
]

function SiblingRow({
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

    const theme = useTheme()

    function handleOnChange(key, value) {
        setData && setData(key, value)
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
                    sx={{
                        color: theme.palette.primary.main,
                    }}
                >
                    Sibling {index + 1}
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
                    label,
                    inputType,
                    allowNA,
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
    const [rows, setRows] = useState(data?.[fieldKey] || [])
    
    function handleClick() {
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
        setData && setData(data => {
            data[step][fieldKey] = data[step][fieldKey].filter((row, i) => i !== index)
            return data
        })
    }

    function handleOnChange(index, newData) {
        setData && setData(data => {
            data[step][fieldKey][index] = newData
            return data
        })
    }

    let addButton = null
    if (rows.length < maxRows) {
        addButton = (
            <ButtonRow
                onClick={handleClick} variant="text"
            >
                Add Sibling <AddIcon />
            </ButtonRow>
        )
    }

    return (
        <>
            {rows.map((row, index) => {
                return (
                    <SiblingRow
                        key={index}
                        index={index}
                        errors={errors}
                        data={data?.[fieldKey]?.[index] || {}}
                        onChange={handleOnChange.bind(this, index)}
                        onDelete={handleOnDelete.bind(this, index)}
                        clearErrors={clearErrors}
                    />
                )
            })}
            {addButton}
        </>
    )
}

export default {
    step,
    label,
    Component,
    fields
}