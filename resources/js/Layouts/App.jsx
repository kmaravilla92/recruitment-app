import CssBaseline from "@mui/material/CssBaseline"
import {
    Box,
    Container,
} from "@mui/material"
import Drawer from "@/Components/Drawer"
import Header from "@/Components/Header"

export default function App({
    children
}) {
    return (
        <>
            <CssBaseline />
            <Header />
            {/* <Drawer /> */}
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
                    {children}
                </Container>
            </Box>
        </>
    )
}