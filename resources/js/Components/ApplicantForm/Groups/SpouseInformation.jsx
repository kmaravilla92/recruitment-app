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

const fields = [
    {
        key: 'spouse_detail',
        defaultValue: defaultFormFields
    },
]

function Component({
    setData
}) {
    function handleOnChange(key) {
        return function (e) {
            setData(data => {
                data[step].spouse_detail[key] = e.target.value
                return data
            })
        }
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
                                onChange={handleOnChange(key)}
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