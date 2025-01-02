import {
    Grid2 as Grid,
    TextField
} from '@mui/material'

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
    setData,
    errors
}) {
    function handleOnChange(key, e) {
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
                                onChange={handleOnChange.bind(this, key)}
                            />
                            {errors[key] && <div>{errors[key]}</div>}
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