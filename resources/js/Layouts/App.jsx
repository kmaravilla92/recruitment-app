import CssBaseline from '@mui/material/CssBaseline';
import Header from "@/Components/Header";

export default function App({
    children
}) {
    return (
        <>
            <CssBaseline />
            <Header />
            {children}
        </>
    )
}