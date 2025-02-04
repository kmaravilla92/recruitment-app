import {
    Grid2 as Grid,
} from '@mui/material'

import InputField from '@/Components/ApplicantForm/InputField'

import {
    labelsToFieldConfig,
    fieldsToFormObject,
} from '@/helpers'

const step = 11

const label = 'Spouse Information'

const rowFields = labelsToFieldConfig([
    'Full Name',
    {
        label: 'Occupation',
        allowNA: true,
    },
    {
        key: 'birthday',
        label: 'Birthday (MM/DD/YYYY)',
        inputType: 'datepicker',
        allowNA: true,
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
    function handleOnChange(key, value) {
        setData && setData(data => {
            data[step].spouse_detail[key] = value
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
                    label,
                    inputType,
                    allowNA,
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
                            <InputField
                                inputType={inputType}
                                label={label}
                                customValue={data?.[fieldKey]?.[key] || ""}
                                error={errors?.[errorKey]?.length > 0}
                                onChange={handleOnChange.bind(null, key)}
                                clearErrors={clearErrors?.bind(null, errorKey)}
                                helperText={errors?.[errorKey] || ""}
                                allowNA={allowNA}
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
    fields,
}