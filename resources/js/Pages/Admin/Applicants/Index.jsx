import {
    Head,
} from '@inertiajs/react'

import {
    Box,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material'

import {
    PictureAsPdf as PictureAsPdfIcon
} from '@mui/icons-material'

import App from '@/Layouts/App'

export default function UserList({
    applicants,
}) {
    function handleClick(userId) {
        window.open(
            route('admin.print-personnel-data-form', [userId])
        )
    }
    return (
        <>
            <Head title="Admin | Applicants" />
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
                        <TableContainer
                            component={Paper}
                        >
                            <Table
                                sx={{
                                    minWidth: 650,
                                }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                <TableRow>
                                    <TableCell>Application ID</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>E-mail Address</TableCell>
                                    <TableCell>Contact #</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {applicants.map((applicant) => (
                                    <TableRow
                                        key={applicant.id}
                                        sx={{
                                            '&:last-child td, &:last-child th': {
                                                border: 0
                                            }
                                        }}
                                    >
                                        <TableCell component="th" scope="row">{applicant.id}</TableCell>
                                        <TableCell>{applicant.last_name}</TableCell>
                                        <TableCell>{applicant.first_name}</TableCell>
                                        <TableCell>{applicant.email}</TableCell>
                                        <TableCell>{applicant.contact_number}</TableCell>
                                        <TableCell>{applicant.application_status}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Download Personnel Data Form">
                                                <IconButton
                                                    onClick={handleClick.bind(null, applicant.id)}
                                                >
                                                    <PictureAsPdfIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                    </Container>
                </Box>
            </App>
        </>
    );
}