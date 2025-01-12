import {
    useState
} from 'react'

import {
    labelsToFieldConfig,
    fieldsToFormObject,
} from '@/helpers'

import {
    Button,
    Grid2 as Grid,
    TextField,
    Typography,
} from '@mui/material'

import ButtonRow from '@/Components/ApplicantForm/ButtonRow'

const step = 13

const defaultList = [1, 2, 3, 4]

const rowFields = labelsToFieldConfig([
    'Company',
    'Employment Period',
    'Reason For Leaving',
    'Position',
])

const defaultFormFields = defaultList.map(() => fieldsToFormObject(rowFields))

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
    row,
    onChange,
    errors,
    data,
    clearErrors
}) => {
    function handleOnChange(key, e) {
        row[key] = e.target.value;
        onChange(row);
    }

    return (
        <>
            <Typography
                sx={{ mb: 1 }} 
                variant="h6"
            >
                Experience {index + 1}
            </Typography>
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
                            <TextField
                                fullWidth
                                label={label}
                                defaultValue={data?.[key] || ""}
                                variant="filled"
                                error={errors?.[errorKey]?.length > 0}
                                onChange={handleOnChange.bind(null, key)}
                                onKeyUp={clearErrors.bind(null, errorKey)}
                                helperText={errors[errorKey] || ""}
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
    const [rows, setRows] = useState(defaultFormFields);

    function handleClick() {
        setRows(rows => {
            return [
                ...rows,
                ...[rows.length + 1]
            ]
        })

        setData(data => {
            data.job_experience_list = [
                ...data.job_experience_list,
                ...[defaultFormFields]
            ]

            return data;
        })
    }

    function handleOnChange(index) {
        return function (newData) {
            setData(data => {
                data[step][fieldKey][index] = newData
                return data
            })
        }
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
                        onChange={handleOnChange(index)}
                        clearErrors={clearErrors}
                    />
                )
            })}
            <ButtonRow
                variant="text"
                onClick={handleClick}
            >
                Add Experience +
            </ButtonRow>
        </>
    );
}

export default {
    step,
    Component,
    fields,
}