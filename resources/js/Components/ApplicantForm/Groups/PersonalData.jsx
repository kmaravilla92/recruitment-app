import dayjs from 'dayjs'

import {
    Grid2 as Grid,
    TextField,
} from '@mui/material'

import {
    DatePicker,
} from '@mui/x-date-pickers/DatePicker';

import {
    labelsToFieldConfig
} from '@/helpers'

const step = 2

const fields = labelsToFieldConfig([
    'Contact Number',
    'Email Address',
    'Date Of Birth',
    'Place Of Birth',
    'Height',
    'Weight',
    'Gender',
    'Religion',
    'Fully Vaccinated?',
    'Citizenship',
    'Blood Type',
    'Hair Color',
    'Driver License Number',
    'Distinguishing Mark',
])

function Component({
    data,
    setData,
    errors,
    clearErrors
}) {
    function handleOnChange(key, e, o) {
        console.log({ key, e, o })
        setData(data => {
            data[step][key] = e.target.value
            return data
        })
    }

    return (
        <>
            <Grid
                container
                spacing={2}
            >
                {fields.map(({
                    key,
                    label
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
                                defaultValue={data?.[key] || ""}
                                variant="filled"
                                error={errors?.[key]?.length > 0}
                                onChange={handleOnChange.bind(null, key)}
                                onKeyUp={clearErrors.bind(null, key)}
                                helperText={errors[key] || ""}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default {
    step,
    Component,
    fields,
}