import { Typography } from '@material-ui/core'
import React from 'react'

const PageNotFound = () => {
    return (
        <div style={{
            width: "100%", 
            height: "100%", 
            display: "flex",
            justifyContent:"center",
            alignContent: "center"}}
        >
            <Typography variant="h3">
                404 - Page not found!
            </Typography>
        </div>
    )
}

export default PageNotFound;
