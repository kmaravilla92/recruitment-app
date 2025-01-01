import {
    Grid2 as Grid,
    TextField
} from '@mui/material'

import {
    labelsToFieldConfig,
    fieldsToFormObject
} from '@/helpers'

const groupFields = labelsToFieldConfig([
    'House number',
    'Street',
    'Barangay',
    'City',
    'Province',
    'Region',
])

const defaultFormFields = fieldsToFormObject(groupFields)

function fields(namespace) {
    return [
        {
            key: namespace,
            defaultValue: defaultFormFields
        }
    ]
}

function Component(namespace, step) {
    return function ({
        setData
    }) {
        function handleOnChange(key, e) {
            setData(data => {
                data[step][namespace][key] = e.target.value
                return data
            })
        }

        return (
            <>
                <Grid container spacing={2}>
                    {groupFields.map(({
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
                        )
                    })}
                </Grid>
            </>
        )
    }
}

export default function(namespace, step) {
    return {
        step,
        Component: Component(namespace, step),
        fields: fields(namespace),
    }
}