import {
    Head,
} from '@inertiajs/react'

import {
    useTheme,
} from '@mui/material/styles'

import {
    Grid2 as Grid,
    Paper,
    Stack,
    Typography,
} from '@mui/material'

import {
    Send as SendIcon,
    ThumbUp as ThumbUpIcon,
    Group as GroupIcon,
    ThumbDown as ThumbDownIcon,
} from '@mui/icons-material'

import App from '@/Layouts/App'

const icons = {
    SendIcon: <SendIcon sx={{ opacity: 0.2, fontSize: 72 }} />,
    ThumbUpIcon: <ThumbUpIcon sx={{ opacity: 0.2, fontSize: 72 }} />,
    GroupIcon: <GroupIcon sx={{ opacity: 0.2, fontSize: 72 }} />,
    ThumbDownIcon: <ThumbDownIcon sx={{ opacity: 0.2, fontSize: 72 }} />
}

export default function UserList({
    stats
}) {
    const theme = useTheme()
    return (
        <>
            <Head title="Admin | Dashboard" />
            <App>
                <Grid
                    container
                    spacing={3}
                >
                    {stats.map(({
                        title,
                        stat,
                        icon
                    }, i) => {
                        return (
                            <Grid
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 4,
                                }}
                                key={i}
                            >
                                <Paper
                                    sx={{
                                        height: "100%",
                                        px: 3,
                                        py: 4,
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        sx={{
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Stack>
                                            <Typography
                                                component="h2"
                                                variant="h2"
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                }}
                                            >
                                                {stat}
                                            </Typography>
                                            <Typography
                                                component="h3"
                                                variant="h6"
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                }}
                                            >
                                                {title}
                                            </Typography>
                                        </Stack>
                                        {icons[icon]}
                                    </Stack>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </App>
        </>
    )
}