import {
    Head,
    Link,
    router,
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
    Print as PrintIcon
} from '@mui/icons-material'

import App from '@/Layouts/App'

export default function UserList({
    users,
}) {
    function handleClick(userId) {
        window.open(
            route('admin.print-personnel-data-form', [userId])
        )
    }
    return (
        <>
            <Head title="Admin | Users" />
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
                                    <TableCell>Full Name</TableCell>
                                    <TableCell>E-mail Address</TableCell>
                                    <TableCell>Contact #</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {users.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        sx={{
                                            '&:last-child td, &:last-child th': {
                                                border: 0
                                            }
                                        }}
                                    >
                                        <TableCell component="th" scope="row">{user.id}</TableCell>
                                        <TableCell>{user.last_name}, {user.first_name} {user.middle_name}</TableCell>
                                        <TableCell>{user.email_address}</TableCell>
                                        <TableCell>{user.contact_number}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Print personnel data form">
                                                <IconButton
                                                    onClick={handleClick.bind(null, user.id)}
                                                >
                                                    <PrintIcon />
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