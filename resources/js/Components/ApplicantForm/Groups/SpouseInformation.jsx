import {
    useForm
} from '@inertiajs/react'

import {
    Grid2 as Grid,
    TextField,
    Typography
} from '@mui/material'

import {
    labelsToFieldConfig,
    fieldsToFormObject,
} from '@/helpers'

const step = 11

const rowFields = labelsToFieldConfig([
    'Full Name',
    'Occupation',
    {
        key: 'birthday',
        label: 'Birthday (MM/DD/YYYY)',
    },
])

const defaultFormFields = fieldsToFormObject(rowFields)

const fieldKey = 'spouse_detail'

const fields = [
    {
        key: fieldKey,
        defaultValue: defaultFormFields
    },
]

function Component({
    data,
    setData,
    errors,
    clearErrors
}) {
    function handleOnChange(key, e) {
        setData(data => {
            data[step].spouse_detail[key] = e.target.value
            return data
        })
    }

    return (
        <>
            <Grid
                container
                spacing={2}
            >
                {rowFields.map(({
                    key,
                    label
                }) => {
                    const errorKey = `${fieldKey}.${key}`
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
                                defaultValue={data?.[fieldKey]?.[key] || ""}
                                variant="filled"
                                error={errors?.[fieldKey]?.length > 0}
                                onChange={handleOnChange.bind(null, key)}
                                onKeyUp={clearErrors.bind(null, key)}
                                helperText={errors?.[fieldKey] || ""}
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