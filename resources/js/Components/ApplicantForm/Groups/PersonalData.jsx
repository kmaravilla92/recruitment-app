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
    {
        label: 'Contact Number',
    },
    {
        key: 'email',
        label: 'Email Address',
    },
    {
        label: 'Date Of Birth',
        inputType: 'datepicker',
    },
    {
        label: 'Place Of Birth',
    },
    {
        key: 'height',
        label: 'Height (Inches)',

    },
    {
        key: 'weight',
        label: 'Weight (Kilograms)',

    },
    {
        key: 'gender',
        label: 'Gender',
        inputType: 'select',
        selectOptions: [
            {
                value: 'Male',
                label: 'Male',
            },
            {
                value: 'Female',
                label: 'Female',
            },
        ],
    },
    {
        label: 'Religion',
        allowNA: true,
    },
    {
        key: 'is_fully_vaccinated',
        label: 'Fully Vaccinated?',
        inputType: 'switch',
    },
    'Citizenship',
    {
        key: 'civil_status',
        label: 'Civil Status',
        inputType: 'select',
        selectOptions: [
            {
                value: 'Single',
                label: 'Single',
            },
            {
                value: 'Married',
                label: 'Married',
            },
            {
                value: 'Widowed',
                label: 'Widowed',
            },
            {
                value: 'Separated',
                label: 'Separated',
            },
            {
                value: 'Divorced',
                label: 'Divorced',
            },
        ],
    },
    {
        key: 'blood_type',
        label: 'Blood Type',
        inputType: 'select',
        selectOptions: [
            {
                value: 'A+',
                label: 'A+',
            },
            {
                value: 'A-',
                label: 'A-',
            },
            {
                value: 'B+',
                label: 'B+',
            },
            {
                value: 'B-',
                label: 'B-',
            },
            {
                value: 'O+',
                label: 'O+',
            },
            {
                value: 'O-',
                label: 'O-',
            },
            {
                value: 'AB+',
                label: 'AB+',
            },
            {
                value: 'AB-',
                label: 'AB-',
            },
        ],
    },
    {
        label: 'Hair Color',
        allowNA: true,
    },
    {
        label: 'Driver License Number',
        allowNA: true,
    },
    {
        label: 'Distinguishing Mark',
        allowNA: true,
    },
])

function Component({
    data,
    setData,
    errors,
    clearErrors
}) {
    function handleOnChange(key, value) {
        setData(data => {
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
                {fields.map(field => {
                    const key = field.key
                    const label = field.label
                    const inputType = field.inputType
                    const selectOptions = field.selectOptions || []
                    const allowNA = field.allowNA
                    
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
                                label={label}
                                customValue={data?.[key] || ""}
                                error={errors?.[key]?.length > 0}
                                onChange={handleOnChange.bind(null, key)}
                                clearErrors={clearErrors?.bind(null, key)}
                                helperText={errors?.[key] || ""}
                                selectOptions={selectOptions}
                                allowNA={allowNA}
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