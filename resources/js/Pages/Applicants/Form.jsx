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
            <Head title="Applicants Registration" />
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
                        <ApplicantForm
                            step={+step}
                            savedData={savedData}
                        />
                    </Container>
                </Box>
            </App>
        </>
    );
}