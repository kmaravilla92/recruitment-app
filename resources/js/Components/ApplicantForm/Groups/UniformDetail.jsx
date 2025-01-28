import {
    Grid2 as Grid,
} from '@mui/material'

import InputField from '@/Components/ApplicantForm/InputField'

import {
    labelsToFieldConfig,
    fieldsToFormObject,
} from '@/helpers'

const step = 6

const label = 'Uniform Detail'

const rowFields = labelsToFieldConfig([
    {
        key: 'shoe_size',
        label: 'Shoe Size (Inches)',
    },
    {
        key: 'waistline',
        label: 'Waistline (Inches)',
    },
    'Polo Shirt Size',
    'Pershing Cap Size',
    {
        key: 'type_a_uniform_size',
        label: 'Type A Uniform Size (Ready to wear)',
    },
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
    function handleOnChange(key, value) {
        setData && setData(data => {
            data[step].uniform_detail[key] = value;
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
                            <InputField
                                label={label}
                                customValue={data?.[fieldKey]?.[key] || ""}
                                error={errors?.[key]?.length  > 0}
                                onChange={handleOnChange.bind(null, key)}
                                clearErrors={clearErrors?.bind(null, key)}
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