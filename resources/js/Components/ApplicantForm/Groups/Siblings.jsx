import {
    useState,
    useEffect,
} from 'react'

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

import ButtonRow from '@/Components/ApplicantForm/ButtonRow'

const step = 10

const rowFields = labelsToFieldConfig([
    'Full Name',
    'Contact Number',
    {
        key: 'birthday',
        label: 'Birthday (MM/DD/YYYY)',
    },
])

const defaultFormField = fieldsToFormObject(rowFields)
const defaultFormFields = Array(4).fill(defaultFormField)

const fields = [
    {
        label: 'Siblings',
        key: 'sibling_detail_list',
        defaultValue: defaultFormFields,
    }
]

function SiblingRow({
    i,
    onChange
}) {
    const {
        data,
        setData
    } = useForm(defaultFormField);

    useEffect(() => {
        onChange(data)
    }, [data])

    function handleOnChange(key, e) {
        setData(key, e.target.value)
    }

    return (
        <>
            <Typography
                sx={{
                    mb: 2,
                }}
                variant="h6"
            >
                Child {i + 1}
            </Typography>
            <Grid
                sx={{
                    mb: 2
                }}
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
                                md: 4
                            }}
                            key={key}
                        >
                            <TextField
                                fullWidth
                                label={label}
                                onChange={handleOnChange.bind(this, key)}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

function Component({
    setData
}) {
    const [rows, setRows] = useState(defaultFormFields);
    
    function handleClick() {
        setRows(rows => {
            return [
                ...rows,
                [defaultFormField]
            ]
        })
    }

    function handleOnChange(i, newData) {
        setData(data => {
            data[step].sibling_detail_list[i] = newData
            return data
        })
    }

    return (
        <>
            {rows.map((row, i) => {
                return (
                    <SiblingRow
                        key={i}
                        i={i}
                        onChange={handleOnChange.bind(this, i)}
                    />
                )
            })}
            <ButtonRow
                onClick={handleClick} variant="text"
            >
                Add Sibling +
            </ButtonRow>
        </>
    )
}

export default {
    step,
    Component,
    fields
}