import {
    AppBar,
    Box,
    Container,
    Stack,
    Toolbar,
    Typography,
    IconButton
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

import appLogoSrc from "../../img/app-logo.png"

export default function Header() {
    return (
        <AppBar
            position="sticky"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar
                disableGutters
            >
                <Container
                    maxWidth="xl"
                >
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            py: 2,
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
                            <img
                                src={appLogoSrc}
                                width="50"
                                height="50"
                            />
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    textTransform: "uppercase",
                                }}
                            >
                                Shared Services
                            </Typography>
                        </Stack>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{
                                p: 0,
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar>
    )
}
