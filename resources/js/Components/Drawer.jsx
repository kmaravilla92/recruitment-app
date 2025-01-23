import {
    Drawer as MuiDrawer,
    Toolbar,
} from "@mui/material";

const drawerWidth = 240

export default function Drawer() {
    return (
        <MuiDrawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
        </MuiDrawer>
    );
}