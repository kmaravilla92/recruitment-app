import {
    useState,
    useEffect
} from 'react'

import {
    useForm,
    router
} from '@inertiajs/react';

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Stack
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import Identification from '@/Components/ApplicantForm/Groups/Identification';
import PersonalData from '@/Components/ApplicantForm/Groups/PersonalData';
import Address from '@/Components/ApplicantForm/Groups/Address';
import UniformDetail from '@/Components/ApplicantForm/Groups/UniformDetail';
import EducationalBackground from '@/Components/ApplicantForm/Groups/EducationalBackground';
import EmergencyContacts from '@/Components/ApplicantForm/Groups/EmergencyContacts';
import Parents from '@/Components/ApplicantForm/Groups/Parents';
import Siblings from '@/Components/ApplicantForm/Groups/Siblings';
import SpouseInformation from '@/Components/ApplicantForm/Groups/SpouseInformation';
import Children from '@/Components/ApplicantForm/Groups/Children';
import JobExperiences from '@/Components/ApplicantForm/Groups/JobExperiences';
import Trainings from '@/Components/ApplicantForm/Groups/Trainings';
import CharacterReferences from '@/Components/ApplicantForm/Groups/CharacterReferences';
import ButtonRow from '@/Components/ApplicantForm/ButtonRow';

const items = [
    {label: 'Identification', component: Identification,},
    {label: 'Personal Data', component: PersonalData,},
    {label: 'Present Address', component: Address('present_address', 3),},
    {label: 'Home Address', component: Address('home_address', 4),},
    {label: 'Provincial Address', component: Address('provincial_address', 5),},
    {label: 'Uniform Detail', component: UniformDetail,},
    {label: 'Educational Background', component: EducationalBackground,},
    {label: 'Emergency Contacts', component: EmergencyContacts,},
    {label: 'Parents Background', component: Parents,},
    {label: 'Siblings Information', component: Siblings,},
    {label: 'Spouse Information', component: SpouseInformation,},
    {label: 'Children Information', component: Children,},
    {label: 'Job Experiences', component: JobExperiences,},
    {label: 'Trainings', component: Trainings,},
    {label: 'Character References', component: CharacterReferences,},
];

const defaultFormFields = items.reduce((items, item) => {
    const {
        component,
    } = item

    const {
        step,
        fields,
    } = component

    const group = items[step] || {}

    for (let { key, defaultValue } of fields) {
        let value = ''
        if (undefined !== defaultValue) {
            value = defaultValue
        }

        group[key] = value
    }

    items[step] = group;

    return items;
}, {});

export default function ApplicantForm({
    step
}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm(defaultFormFields)

    const curStep = +step

    function handlePrev() {
        router.get(
            route('applicants.register.show', [step - 1])
        )
    }

    function handleNext() {
        console.log({ data }, data[step])
        post(route('applicants.register.post', [step]))
    }

    function handleSubmit(e) {
        
    }

    return (
        <>
            <Typography
                sx={{
                    mb: 3
                }}
                variant="h3"
            >
                Applicant Registration Form
            </Typography>
            <form onSubmit={handleSubmit}>
                {items.map(({
                    label,
                    component: {
                        step,
                        Component
                    }
                }, i) => {
                    const key = `panel-${i}-content`
                    return (
                        <Accordion
                            key={key}
                            sx={{
                                display: +step === curStep ? 'block' : 'none'
                            }}
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
                                    data={data}
                                    setData={setData}
                                />
                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <ButtonRow
                                        type="button"
                                        onClick={handlePrev}
                                    >
                                        Back
                                    </ButtonRow>
                                    <ButtonRow
                                        type="button"
                                        onClick={handleNext}
                                    >
                                        Next
                                    </ButtonRow>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
                <ButtonRow
                    type="submit"
                    sx={{
                        display: 'none'
                    }}
                >
                    Submit
                </ButtonRow>
            </form>
        </>
    );
}