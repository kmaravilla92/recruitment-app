import {
    Button,
    Stack
} from '@mui/material';

export default function ButtonRow({
    children,
    ...props
}) {
    return (
        <Stack
            direction="row"
            sx={{
                justifyContent: "flex-end"
            }}
        >
            <Button
                sx={{
                    mt: 3
                }}
                variant="contained"
                size="large"
                {...props}
            >
                {children}
            </Button>
        </Stack>
    );
}