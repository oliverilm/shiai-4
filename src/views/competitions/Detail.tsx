import { Grid } from '@material-ui/core';
import { Backdrop, CircularProgress, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';
import styled from "styled-components"

import api from '../../auth';
import { CategoriesTable } from '../../components/public/competitions/CategoriesTable';
import { MainDetailTable } from '../../components/public/competitions/MainDetailTable';
import { AuthContext } from '../../hooks/context';
import { CategoryInCompetition, Competition } from '../../utils/interfaces';


const CenterCenter = styled.div`
    width: 100%;
    display: flex;
    justify-content:center;
    align-items: center;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;


const Col = styled.div`
    display: flex;
    flex-direction: column;
`;

interface MatchParams {
    slug: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

type MatchProps = RouteComponentProps<MatchParams>

const Detail = ({ match }: MatchProps) => {
    const auth = useContext(AuthContext)
    const [competition, setCompetition] = useState<Competition | null>(null)
    const [noCompetition, setNoCompetition] = useState<null | false>(null)
    const [loading, setLoading] = useState(true)
    const [weightClasses, setweightClasses] = useState<CategoryInCompetition[] | null>(null)

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const addCategory = () => {
        api.competitions.categories(match.params.slug).then(res => {
            setweightClasses(res.data)
        })
    }


    useEffect(() => {
        let mounted = true;

        if (mounted) {
            api.competitions.detail(match.params.slug).then(res => {
                setCompetition(res.data)
                setLoading(false)
            }).catch(err => {
                setNoCompetition(false)
                setLoading(false)
            })
            api.competitions.categories(match.params.slug).then(res => {
                setweightClasses(res.data)
            })
        }
        return () => {
            mounted = false;
        }
    }, [match.params.slug, auth])


    if (noCompetition === false) {
        return (<CenterCenter>
            <Typography variant="h3">
                Sorry, this competition was not found
            </Typography>
        </CenterCenter>)
    }



    return (
        <Grid
            container
            direction="column"
            justify="center">
            {competition ? (
                <Col>
                    <Row>
                        <CenterCenter>
                            <Typography variant="h2">{competition.name}</Typography>
                            {competition.isOwner && <EditIcon style={{ color: "#c1c1c1", cursor: "pointer", fontSize: "40px" }} />}
                        </CenterCenter>
                    </Row>

                    <Grid container direction="row" justify="center" spacing={5}>
                        <Grid item xs={12} md={6} lg={5}>

                            <div dangerouslySetInnerHTML={{ __html: competition.description }} />
                            <MainDetailTable competition={competition} />

                        </Grid>
                        <Grid item xs={12} md={6} lg={5}>
                            <CategoriesTable onAdd={addCategory} weightClasses={weightClasses} competition={competition} />
                        </Grid>
                    </Grid>

                    {JSON.stringify(competition)}
                </Col>

            ) : (
                    <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                )}
        </Grid>
    )
}

export default Detail;