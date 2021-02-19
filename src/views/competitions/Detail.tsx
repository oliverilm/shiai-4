import { Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';
import styled from "styled-components"

import api from '../../auth';
import { AuthContext } from '../../hooks/context';

const CenterCenter = styled.div`
    width: 100%;
    display: flex;
    justify-content:center;
    align-items: center;
`;

interface MatchParams {
    slug: string;
}

type MatchProps = RouteComponentProps<MatchParams>

const Detail = ({match}: MatchProps) => {
    const auth = useContext(AuthContext)
    const [competition, setCompetition] = useState({})
    const [noCompetition, setNoCompetition] = useState<null | false>(null)

    useEffect(() => {
        let mounted = true;
        
        if (mounted) {
            api.competitions.detail(match.params.slug).then(res => {
                setCompetition(res.data)
            }).catch(err => {
                setNoCompetition(false)
            })
        }
        return () => {
            mounted = false;
        }
    }, [match.params.slug])

    if (noCompetition === false) {
        return (<CenterCenter>
            <Typography variant="h3">
                Sorry, this competition was not found
            </Typography>
        </CenterCenter>)
    }
    return (
        <div>
            {JSON.stringify(competition)}
        </div>
    )
}

export default Detail;