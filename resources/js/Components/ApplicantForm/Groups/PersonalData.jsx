import {
    Grid2 as Grid,
} from '@mui/material'

import InputField from '@/Components/ApplicantForm/InputField'

import {
    labelsToFieldConfig
} from '@/helpers'

const step = 2

const label = 'Personal Data'

const fields = labelsToFieldConfig([
    'Contact Number',
    'Email Address',
    {
        label: 'Date Of Birth',
        inputType: 'datepicker',
    },
    'Place Of Birth',
    'Height',
    'Weight',
    'Gender',
    'Religion',
    {
        key: 'is_fully_vaccinated',
        label: 'Fully Vaccinated?',
    },
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
    function handleOnChange(key, value) {
        setData && setData(data => {
            data[step][key] = value
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
                    label,
                    inputType
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
                            <InputField
                                inputType={inputType}
                                fullWidth
                                label={label}
                                customValue={data?.[key] || ""}
                                variant="filled"
                                error={errors?.[key]?.length > 0}
                                onChange={handleOnChange.bind(null, key)}
                                onKeyUp={clearErrors?.bind(null, key)}
                                helperText={errors?.[key] || ""}
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
    label,
    Component,
    fields,
}