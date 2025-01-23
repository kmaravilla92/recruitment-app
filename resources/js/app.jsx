import './bootstrap'
import '../css/app.css'

import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { createTheme, ThemeProvider } from '@mui/material/styles'

const appName = 'Shared Services Recruitment App'

const theme = createTheme({
    palette: {
        primary: {
            main: "#081e40",
        },
        error: {
            main: "#b71c1c",
        }
    },
});

createInertiaApp({
    title: (title) => `${appName} | ${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el)

        root.render(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                    <App {...props} />
                </ThemeProvider>
            </LocalizationProvider>
        )
    },
    progress: {
        color: '#4B5563',
    },
})
