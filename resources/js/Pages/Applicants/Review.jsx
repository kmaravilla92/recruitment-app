import {
    Head,
} from '@inertiajs/react';

import {
    router,
} from '@inertiajs/react'

import {
    Box,
    Container,
    Paper,
    Stack,
    Typography,
} from '@mui/material';

import App from '@/Layouts/App';
import {
    items
} from '@/Components/ApplicantForm/Index'
import ButtonRow from '@/Components/ApplicantForm/ButtonRow'

export default function Form({
    savedData,
}) {
    function handleSubmit(e) {
        e.preventDefault()
        router.post(route('applicants.register.review.post'))
    }

    return (
        <>
            <Head title="Applicants Registration - Review Data" />
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
                        <Typography
                            sx={{
                                mb: 3
                            }}
                            variant="h4"
                        >
                            Review Details
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <Stack spacing={3}>
                                {items.map(({
                                    step,
                                    label,
                                    fields,
                                    Component
                                }, i) => {
                                    return (
                                        <Paper
                                            sx={{
                                                p: 2      
                                            }}
                                            key={i}
                                        >
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    mb: 3
                                                }}
                                            >
                                                {label}
                                            </Typography>
                                            <Component
                                                data={savedData[step]}
                                            />
                                        </Paper>
                                    )
                                })}
                            </Stack>
                            <ButtonRow
                                type="submit"
                            >
                                Submit
                            </ButtonRow>
                        </Box>
                    </Container>
                </Box>
            </App>
        </>
    );
}