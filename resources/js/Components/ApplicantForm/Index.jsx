import _ from 'lodash'

import {
    useForm,
    router,
} from '@inertiajs/react'

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    Stack
} from '@mui/material'

import {
    ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material'

import Identification from '@/Components/ApplicantForm/Groups/Identification'
import PersonalData from '@/Components/ApplicantForm/Groups/PersonalData'
import Address from '@/Components/ApplicantForm/Groups/Address'
import UniformDetail from '@/Components/ApplicantForm/Groups/UniformDetail'
import EducationalBackground from '@/Components/ApplicantForm/Groups/EducationalBackground'
import EmergencyContacts from '@/Components/ApplicantForm/Groups/EmergencyContacts'
import Parents from '@/Components/ApplicantForm/Groups/Parents'
import Siblings from '@/Components/ApplicantForm/Groups/Siblings'
import SpouseInformation from '@/Components/ApplicantForm/Groups/SpouseInformation'
import Children from '@/Components/ApplicantForm/Groups/Children'
import JobExperiences from '@/Components/ApplicantForm/Groups/JobExperiences'
import Trainings from '@/Components/ApplicantForm/Groups/Trainings'
import CharacterReferences from '@/Components/ApplicantForm/Groups/CharacterReferences'
import ButtonRow from '@/Components/ApplicantForm/ButtonRow'

export const items = [
    Identification,
    PersonalData,
    Address('present_address', 3, 'Present Address'),
    Address('home_address', 4, 'Home Address'),
    Address('provincial_address', 5, 'Provincial Address'),
    UniformDetail,
    EducationalBackground,
    EmergencyContacts,
    Parents,
    Siblings,
    SpouseInformation,
    Children,
    JobExperiences,
    Trainings,
    CharacterReferences,
]

const defaultFormFields = items.reduce((items, item) => {
    const {
        step,
        fields,
    } = item

    const group = items[step] || {}

    for (let { key, defaultValue } of fields) {
        let value = ''
        if (undefined !== defaultValue) {
            value = defaultValue
        }

        group[key] = value
    }

    items[step] = group

    return items
}, {})

export default function ApplicantForm({
    step,
    savedData,
}) {
    const {
        data,
        setData,
        post,
        errors,
        clearErrors,
    } = useForm(_.merge(
        {},
        defaultFormFields,
        savedData
    ))

    const curStep = +step

    function handlePrev() {
        if (step <= 1) {
            return
        }

        router.get(
            route('applicants.register.show', [step - 1])
        )
    }

    function handleSubmit(e) {
        e.preventDefault()
        post(route('applicants.register.post', [step]))
    }

    return (
        <>
            <Typography
                sx={{
                    mb: 3
                }}
                variant="h4"
            >
                Applicant Registration Form
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                {items.map(({
                    label,
                    step,
                    Component,
                }, i) => {
                    if (+step !== curStep) {
                        return
                    }

                    const key = `panel-${i}-content`

                    return (
                        <Accordion
                            key={key}
                            defaultExpanded
                        >
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon />}
                                aria-controls={key}
                                id={key}
                            >
                                <Typography
                                    variant="h5"
                                >
                                    {label}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Component
                                    data={data?.[step]}
                                    setData={setData}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                />
                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <ButtonRow
                                        onClick={handlePrev}
                                        disabled={curStep <= 1}
                                    >
                                        Back
                                    </ButtonRow>
                                    <ButtonRow
                                        type="submit"
                                    >
                                        Next
                                    </ButtonRow>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </Box>
        </>
    )
}