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

const fields = [
    {
        label: 'Job Experiences',
        key: 'job_experience_list',
        defaultValue: defaultFormFields,
    },
]

const ExperienceRow = ({
    i,
    row,
    onChange
}) => {
    function handleOnChange(key) {
        return function (e) {
            row[key] = e.target.value;
            onChange(row);
        }
    }

    return (
        <>
            <Typography
                sx={{ mb: 1 }} 
                variant="h6"
            >
                Experience {i + 1}
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
                                autoComplete="off"
                                onChange={handleOnChange(key)}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    )
}

function Component({
    setData,
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

    function handleOnChange(i) {
        return function (newData) {
            setData(data => {
                data[step].job_experience_list[i] = newData;
                return data
            })
        }
    }

    return (
        <>
            {rows.map((row, i) => {
                return (
                    <ExperienceRow
                        key={i}
                        row={row}
                        i={i}
                        onChange={handleOnChange(i)}
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