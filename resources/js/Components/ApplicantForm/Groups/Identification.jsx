import {
    Grid2 as Grid,
    TextField
} from '@mui/material'

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
    'LESP Expiry Date',
])

function Component({
    setData
}) {
    function handleOnChange(key, e) {
        setData(data => {
            data[step][key] = e.target.value
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
                                onChange={handleOnChange.bind(null, key)}
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