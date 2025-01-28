import {
    Link,
    usePage
} from '@inertiajs/react'

import {
    AppBar,
    Stack,
    Toolbar,
    Typography,
    IconButton,
} from "@mui/material"
import {
    AccountCircle as AccountCircleIcon
} from "@mui/icons-material"

import appLogoSrc from "../../img/app-logo.png"

export default function Header() {
    const {
        auth
    } = usePage().props

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 1,
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Link href="/">
                            <img
                                src={appLogoSrc}
                                width="50"
                                height="50"
                            />
                        </Link>
                        <Link
                            href="/"
                            style={{
                                color: "#fff",
                                textDecoration: "none",
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    textTransform: "uppercase",
                                }}
                            >
                                Shared Services
                            </Typography>
                        </Link>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        <p>{`Hello ${auth.user.first_name}`}</p>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{
                                p: 0,
                            }}
                        >
                            
                            <AccountCircleIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
