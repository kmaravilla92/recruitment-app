import CssBaseline from "@mui/material/CssBaseline"
import {
    Box,
    Container,
    Toolbar,
} from "@mui/material"
import Drawer from "@/Components/Drawer"
import Header from "@/Components/Header"

export default function App({
    children,
}) {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header />
                <Drawer />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        px: 4,
                    }}
                >
                    <Toolbar />
                    <Container
                        maxWidth="xl"
                        sx={{
                            pt: 10,
                        }}
                    >
                        {children}
                    </Container>
                </Box>
            </Box>
        </>
    )
}