import { Typography } from '@material-ui/core'
import React from 'react'

const PageNotFound = () => {
    return (
            <Typography 
                variant="h1" 
                style={{
                    display: "flex",
                    justifyContent:"center",
                    alignContent: "center"
                }}>
                Page not found!
            </Typography>
    )
}

export default PageNotFound;
