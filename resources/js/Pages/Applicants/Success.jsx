import {
    Head,
} from '@inertiajs/react'

import {
    Alert,
    Box,
    Container,
} from '@mui/material'

import {
    Check as CheckIcon,
} from '@mui/icons-material'

import App from '@/Layouts/App'

export default function Form() {
    return (
        <>
            <Head title="Applicants Registration | Success" />
            <App>
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    Congratulations! Your registration is completed. We will contact you as soon as possible.
                </Alert>
            </App>
        </>
    );
}