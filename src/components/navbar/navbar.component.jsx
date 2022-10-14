import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react'

function Navbar(){
    return (
        <AppBar sx={{backgroundColor:'#008c8c'}} position="static">
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <div />
                <Typography fontSize={20} fontWeight={600} >Tarock Zähler Advanced</Typography>
                <div />
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;