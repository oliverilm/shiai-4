import "./home.scss"

import React, { useEffect, useState } from 'react'

import api from "../../auth"
import CountrySelect from "../../components/public/CountriesSelect"
import { Competition } from "../../utils/interfaces"



const Home = () => {
    const [competitions, setCompetitions] = useState<Competition[]>([])

    useEffect(() => {
        let mounted = true
        if (mounted) {
            api.competitions.list().then(res => {
                setCompetitions(res.data)
            })
        }
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
