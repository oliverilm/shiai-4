import "./home.scss"

import React, { useContext, useEffect, useState } from 'react'

import api from "../../auth"
import { Competition } from "../../utils/interfaces"
import { NotificationContext } from "../../hooks/context"
import CountrySelect from "../../components/public/CountriesSelect"



const Home = () => {
    const [competitions, setCompetitions] = useState<Competition[]>([])
    const not = useContext(NotificationContext)

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
            <CountrySelect />
        </div>
    )
}
export default Home;
