import {
    Link,
} from '@inertiajs/react'

import {
    Box,
    Drawer as MuiDrawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";

import {
    Groups as GroupsIcon,
    Dashboard as DashboardIcon,
} from '@mui/icons-material'

const drawerWidth = 240

export default function Drawer() {
    return (
        <MuiDrawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar />
            <Box
                sx={{
                    overflow: "auto",
                    pt: 4,
                }}
            >
                <List>
                    <ListItem
                        disablePadding
                        component={Link}
                        href="/"
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Dashboard'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        component={Link}
                        href="/admin/applicants"
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <GroupsIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Applicants'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </MuiDrawer>
    );
}