import {AppBar,
    ListItemIcon,
    Menu, 
    MenuItem,
    Typography  } from "@material-ui/core"
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import SendIcon from '@material-ui/icons/Send';
import React, { useContext, useEffect, useState } from 'react'


interface NavProfileMenuProps {
    anchorEl: any;
    handleClose: any;
    logout: any;
}

const NavProfileMenu = ({
    anchorEl,
    handleClose,
    logout
}: NavProfileMenuProps) => {
    return (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem>
            <ListItemIcon>
                <SendIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Profile information</Typography>
            </MenuItem>
            <MenuItem onClick={logout}>
            <ListItemIcon>
                <PriorityHighIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Log Out</Typography>
            </MenuItem>
        </Menu>
    )
}
export default NavProfileMenu;