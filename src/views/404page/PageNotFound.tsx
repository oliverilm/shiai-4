import { Button, Typography } from '@material-ui/core'
import Divider from '@material-ui/core/Divider/Divider';
import React from 'react'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div style={{
            width: "100%", 
            height: "100%", 
            display: 'flex',
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
        }}>
        <div style={{
            width: "100%", 
            height: "100%", 
            display: "flex",
            justifyContent:"center",
            alignItems: "center"}}
        >
           
                <Typography variant="h3">404</Typography>
                <Divider orientation="vertical" flexItem style={{
                    margin: "0px 3em"
                }}/>
                <Typography variant="h3">Page not found!</Typography>
        </div>
            <Link to="/" component={Button} >Back to main page</Link>
        </div>
    )
}

export default PageNotFound;
