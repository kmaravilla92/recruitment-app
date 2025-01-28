import {
    Head,
    useForm,
} from '@inertiajs/react'

import {
    Alert,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Link,
    Paper,
    Stack,
    Typography,
} from '@mui/material'

import {
    Error as ErrorIcon,
} from '@mui/icons-material'

import InputField from '@/Components/ApplicantForm/InputField'

import appLogoSrc from "../../img/app-logo.png";

export default function Welcome() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        clearErrors
    } = useForm({
        email: '',
        password: '',
        remember_me: false,
    })

    function handleSubmit(e) {
        e.preventDefault()
        post(route('auth.login.post'))
    }
    
    function handleOnChange(key, value) {
        setData(key, value)
    }

    let errorAlert = null
    if (errors?.xxx) {
        errorAlert = (
            <Alert
                severity="error"
                icon={<ErrorIcon fontSize="inherit" />}
                sx={{
                    mb: 4,
                }}
            >
                Ooops! User account not found.
            </Alert>
        )
    }

    return (
        <>
            <Head title="Welcome" />
            <Container
                maxWidth="sm"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <Stack
                    direction="column"
                    spacing={2}
                    sx={{
                        alignItems: "center",
                        mx: "auto",
                        mb: 3
                    }}
                >
                    <img
                        src={appLogoSrc}
                        width="200"
                        height="200"
                    />
                    <Typography
                        variant="h5"
                        component="h1"
                        sx={{
                            color: "#fff",
                            textTransform: "uppercase"
                        }}
                    >
                        Shared Services Portal
                    </Typography>
                </Stack>
                <Paper
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        px: 4,
                        py: 6,
                    }}
                    onSubmit={handleSubmit}
                >
                    {errorAlert}
                    <Stack
                        spacing={2}
                    >
                        <InputField
                            label="E-mail Address"
                            customValue={data?.email || ""}
                            error={errors?.email?.length > 0}
                            onChange={handleOnChange.bind(null, 'email')}
                            clearErrors={clearErrors?.bind(null, 'email')}
                            helperText={errors?.email || ""}
                        />
                        <InputField
                            inputType="password"
                            label="Password"
                            customValue={data?.password || ""}
                            error={errors?.password?.length > 0}
                            onChange={handleOnChange.bind(null, 'password')}
                            clearErrors={clearErrors?.bind(null, 'password')}
                            helperText={errors?.password || ""}
                        />
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Remember Me"
                            />
                            <Button
                                component={Link}
                            >
                                Forgot Password?
                            </Button>
                        </Stack>
                        <Button
                            variant="contained"
                            size="large"
                            type="submit"
                        >
                            Login
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
}