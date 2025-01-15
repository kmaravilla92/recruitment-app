import {
    Grid2 as Grid,
} from '@mui/material'

import InputField from '@/Components/ApplicantForm/InputField'

import {
    labelsToFieldConfig
} from '@/helpers'

const step = '1'

const fields = labelsToFieldConfig([
    'First Name',
    'Middle Name',
    'Last Name',
    'TIN Number',
    'SSS Number',
    'HDMF Number',
    'PhilHealth Number',
    'License SBR Number',
    {
        label: 'LESP Expiry Date',
        inputType: 'datepicker',
    }
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
                {fields.map(({
                    key,
                    label,
                    inputType,
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
                                error={errors?.[key]?.length  > 0}
                                onChange={handleOnChange.bind(null, key)}
                                onKeyUp={clearErrors.bind(null, key)}
                                helperText={errors[key] || ""}
                            />
                        </Grid>
                    );
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