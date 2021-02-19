import "./competitions.scss"

import { Typography } from "@material-ui/core"
import React, { useContext,useEffect, useState } from 'react'

import api from "../../auth"
import { AuthContext } from "../../hooks/context"

const Competitions = () => {
    const auth = useContext(AuthContext)
    const [competitions, setCompetitions] = useState([])

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            api.competitions.list().then(res => {
                setCompetitions(res.data)
            })
        }

        return () => {
            mounted = false;
        }
    }, [])

    // TODO: make this better.
    if (competitions.length === 0) {
        return (
            <div>
                <Typography>
                    There are no registred competitions :(
                </Typography>

                {auth.isAuthenticated ? (
                    <Typography>
                        Be first and create one
                    </Typography>
                ) : <></>}
            </div>
        )
    }

    return (
        <div>
            {JSON.stringify(competitions)}
        </div>
    )
}

export default Competitions;
