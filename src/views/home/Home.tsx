import "./home.scss"

import React, { useEffect, useState } from 'react'

import api from "../../auth"
import CompetitionMainCard from "../../components/public/competitions/CompetitionMainCard"
// import CountrySelect from "../../components/public/CountriesSelect"
import { Competition } from "../../utils/interfaces"
import EventCalendar from "../../components/public/competitions/EventCalendar"


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
            {competitions.map(competition => <CompetitionMainCard competition={competition} />)}
            <EventCalendar />
        </div>
    )
}
export default Home;
