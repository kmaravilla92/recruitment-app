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

export default function Form({
    savedData,
}) {
    return (
        <>
            <Head title="Applicants Registration - Success" />
            <App>
                <Box
                    sx={{
                        py: {
                            xs: 4,
                            md: 6,
                        },
                    }}
                >
                    <Container
                        maxWidth="xl"
                    >
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                            Congratulations on completing your registration.
                        </Alert>
                    </Container>
                </Box>
            </App>
        </>
    );
}