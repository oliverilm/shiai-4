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
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
        }}> 
            <div>
                {competitions.map(competition => <CompetitionMainCard competition={competition} />)}
            </div>

            <div className="calendar">
                <EventCalendar competitions={competitions}/>
            </div>
        </div>
    )
}
export default Home;
