import {
    Grid2 as Grid,
    TextField
} from '@mui/material'

import {
    labelsToFieldConfig,
    fieldsToFormObject,
} from '@/helpers'

const step = 6

const label = 'Uniform Detail'

const rowFields = labelsToFieldConfig([
    'Shoe Size',
    'Waistline',
    'Polo Shirt Size',
    'Pershing Cap Size',
    'Type A Uniform Size',
])

const defaultFormFields = fieldsToFormObject(rowFields)

const fieldKey = 'uniform_detail'

const fields = [
    {
        label: 'Uniform Detail',
        key: fieldKey,
        defaultValue: defaultFormFields,
    },
]

function Component({
    data,
    setData,
    errors,
    clearErrors,
}) {
    function handleOnChange(key, e) {
        setData && setData(data => {
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
                                defaultValue={data?.[fieldKey]?.[key] || ""}
                                variant="filled"
                                error={errors?.[key]?.length  > 0}
                                onChange={handleOnChange.bind(null, key)}
                                onKeyUp={clearErrors?.bind(null, key)}
                                helperText={errors?.[key] || ""}
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
    label,
    Component,
    fields
}