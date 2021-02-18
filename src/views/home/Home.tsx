import "./home.scss"

import React, { useEffect, useState } from 'react'

import api from "../../auth"
import CompetitionMainCard from "../../components/public/competitions/CompetitionMainCard"
// import CountrySelect from "../../components/public/CountriesSelect"
import { Competition } from "../../utils/interfaces"
import EventCalendar from "../../components/public/competitions/EventCalendar"
import styled from "styled-components"
import { GoogleAuthButton } from "../../components/public/auth/GoogleAuthButton"
import GooglePlacesInput from "../../components/public/inputs/GooglePlacesInput"

const Center = styled.div`
    margin: 2em auto;
    min-width: 50%;
`

const CenterWidth = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: wrap;    
`

const CenterCol = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column    
`

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
        <CenterCol>
            <CenterWidth>
                {competitions.map(competition => <CompetitionMainCard competition={competition} />)}
            </CenterWidth>
            <Center>
                <EventCalendar competitions={competitions}/>
            </Center>
        </CenterCol>
    )
}
export default Home;
