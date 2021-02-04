import "./home.scss"

import React, { useContext, useEffect, useState } from 'react'

import api from "../../auth"
import { GoogleAuthButton } from "../../components/public/auth/GoogleAuthButton"
import { Competition } from "../../utils/interfaces"



const Home = () => {
    const [competitions, setCompetitions] = useState<Competition[]>([])

    useEffect(() => {
        let mounted = true
        api.competitions.list().then(res => {
            setCompetitions(res.data)
        })
        return () => {
            mounted = false
        }
    }, [])

    return (
        <div>
            {JSON.stringify(competitions)}
        </div>
    )
}
export default Home;
