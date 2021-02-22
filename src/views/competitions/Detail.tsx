import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Backdrop, CircularProgress, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { ContentState, convertFromHTML, convertFromRaw, EditorState } from 'draft-js';
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';
import styled from "styled-components"

import api from '../../auth';
import GooglePlacesInput from '../../components/public/inputs/GooglePlacesInput';
import { AuthContext } from '../../hooks/context';
import { CategoryInCompetition, Competition } from '../../utils/interfaces';


const CenterCenter = styled.div`
    width: 100%;
    display: flex;
    justify-content:center;
    align-items: center;
`;
const Center = styled.div`
    width: 100%;
    display: flex;
    justify-content:center;
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
    const handleToggle = () => {
        setOpen(!open);
    };


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

    const renderClasses = () => {
        if (weightClasses && weightClasses.length > 0) {
            return weightClasses.map(cl => {
                const { rules, competition, created,
                    weightCategory: { identifier, weight, amountOverAllowed, category: {
                        sex, underValue, value, id: categoryId
                    }, id: weightCategoryId } } = cl
                return (
                    <>
                        <TableRow>
                            <TableCell>{value}</TableCell>
                            <TableCell align="right"> rules</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>men</TableCell>
                            <TableCell align="right">men weights</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>women</TableCell>
                            <TableCell align="right">women weights</TableCell>
                        </TableRow>
                    </>
                )
            })
        } else {
            return []
        }
    }

    return (
        <div>
            {competition ? (
                <Col>
                    <Row>
                        <CenterCenter>
                            <Typography variant="h2">{competition.name}</Typography>
                            {competition.isOwner && <EditIcon style={{ color: "#c1c1c1", cursor: "pointer", fontSize: "40px" }} />}
                        </CenterCenter>
                    </Row>
                    <div dangerouslySetInnerHTML={{ __html: competition.description }} />
                    <Row>
                        <Col>

                            <Table aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Start date</TableCell>
                                        <TableCell align="right">{new Date(JSON.parse(competition.dateRange).lower).toDateString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Location</TableCell>
                                        <TableCell align="right">{competition.location}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Registration ends</TableCell>
                                        <TableCell align="right">{new Date(competition.registrationEndDate).toDateString()} {new Date(competition.registrationEndDate).toLocaleTimeString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Location</TableCell>
                                        <TableCell align="right">{competition.location}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                        </Col>
                        <Col>
                            <Table aria-label="simple table">
                                <TableBody>
                                    {renderClasses()}
                                </TableBody>
                            </Table>
                        </Col>
                    </Row>


                    {JSON.stringify(competition)}
                </Col>

            ) : (
                    <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                )}
        </div>
    )
}

export default Detail;