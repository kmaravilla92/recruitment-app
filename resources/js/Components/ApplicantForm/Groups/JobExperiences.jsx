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
    labelsToFieldConfig,
    fieldsToFormObject,
} from '@/helpers'

import {
    Grid2 as Grid,
    Stack,
    Typography,
} from '@mui/material'

import {
    Add as AddIcon,
    Close as CloseIcon,
} from '@mui/icons-material'

import InputField from '@/Components/ApplicantForm/InputField'

import ButtonRow from '@/Components/ApplicantForm/ButtonRow'

const step = 13

const label = 'Job Experiences'

const rowFields = labelsToFieldConfig([
    'Company',
    'Employment Period',
    'Reason For Leaving',
    'Position',
])

const maxRows = 3

const defaultFormField = fieldsToFormObject(rowFields)
const defaultFormFields = Array(maxRows).fill(null).map(() => defaultFormField)

const fieldKey = 'job_experience_list'

const fields = [
    {
        label: 'Job Experiences',
        key: fieldKey,
        defaultValue: defaultFormFields,
    },
]

const ExperienceRow = ({
    index,
    data,
    errors,
    onChange,
    onDelete,
    clearErrors,
}) => {
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
                    Experience {index + 1}
                </Typography>
                {deleteButton}
            </Stack>
            <Grid
                sx={{ mb: 2 }}
                container
                spacing={2}
            >
                {rowFields.map(({
                    key,
                    label,
                }) => {
                    const errorKey = `${index}.${key}`
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
                                customValue={data?.[key] || ""}
                                error={errors?.[errorKey]?.length > 0}
                                onChange={handleOnChange.bind(null, key)}
                                clearErrors={clearErrors?.bind(null, errorKey)}
                                helperText={errors?.[errorKey] || ""}
                            />
                        </Grid>
                    );
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
    const [rows, setRows] = useState(data?.[fieldKey] || []);

    function handleClick() {
        setRows(rows => {
            return [
                ...rows,
                ...[rows.length + 1]
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
                variant="text"
                onClick={handleClick}
            >
                Add Experience <AddIcon />
            </ButtonRow>
        )
    }

    return (
        <>
            {rows.map((row, index) => {
                return (
                    <ExperienceRow
                        key={index}
                        row={row}
                        index={index}
                        errors={errors}
                        data={data?.[fieldKey]?.[index] || {}}
                        onChange={handleOnChange.bind(null, index)}
                        onDelete={handleOnDelete.bind(this, index)}
                        clearErrors={clearErrors}
                    />
                )
            })}
            {addButton}
        </>
    );
}

export default {
    step,
    label,
    Component,
    fields,
}