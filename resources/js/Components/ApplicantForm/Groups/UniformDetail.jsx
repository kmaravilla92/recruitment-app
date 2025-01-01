import {
    Grid2 as Grid,
    TextField
} from '@mui/material'

import {
    labelsToFieldConfig,
    fieldsToFormObject,
} from '@/helpers'

const step = 6

const rowFields = labelsToFieldConfig([
    'Shoe Size',
    'Waistline',
    'Polo Shirt Size',
    'City',
    'Pershing Cap Size',
    'Type A Uniform Size',
])

const defaultFormFields = fieldsToFormObject(rowFields)

const fields = [
    {
        label: 'Uniform Detail',
        key: 'uniform_detail',
        defaultValue: defaultFormFields,
    },
]

function Component({
    setData
}) {
    function handleOnChange(key, e) {
        setData(data => {
            data[step].uniform_detail[key] = e.target.value;
            return data;
        })
    }

    return (
        <>
            <Grid container spacing={2}>
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
                                onChange={handleOnChange.bind(this, key)}
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
    fields
}