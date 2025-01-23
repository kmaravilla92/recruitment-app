import {
    Head
} from '@inertiajs/react';

import {
    Box,
    Container,
} from '@mui/material';

import App from '@/Layouts/App';
import ApplicantForm from '@/Components/ApplicantForm/Index';

export default function Form({
    step,
    savedData,
}) {
    return (
        <>
            <Head title="Applicants Registration | Fill Up" />
            <App>
                <ApplicantForm
                    step={+step}
                    savedData={savedData}
                />
            </App>
        </>
    );
}