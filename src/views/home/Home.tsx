import "./home.scss"

import React, { useEffect, useState } from 'react'
import styled from "styled-components"

import api from "../../auth"
import EventCalendar from "../../components/public/competitions/EventCalendar"
import MainList from "../../components/public/competitions/MainList"
import { Competition } from "../../utils/interfaces"

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
                <MainList competitions={competitions} />
            </CenterWidth>
            <Center>
                <EventCalendar competitions={competitions} />
            </Center>
        </CenterCol>
    )
}
export default Home;
