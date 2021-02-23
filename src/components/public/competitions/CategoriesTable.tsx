import { Button, Table, TableBody,TableCell, TableRow } from '@material-ui/core'
import React from 'react'

import { CategoryInCompetition, Competition } from '../../../utils/interfaces'
import AddCategoryModal from './AddCategoryModal'

interface Props {
    weightClasses: CategoryInCompetition[] | null;
    competition: Competition;
    onAdd: any;
}

export const CategoriesTable = ({weightClasses, competition, onAdd}: Props) => {


    const renderClasses = () => {
        if (weightClasses && weightClasses.length > 0) {
            return weightClasses.map(cl => {
                const { menWeights, womenWeights, unisexWeights, amountOverAllowed, identifier, startingYear, endingYear, rules, category: {value}} = cl
                return (
                    <>
                        <TableRow style={{backgroundColor: "#3f51b5", color: "#fff"}}>
                            <TableCell style={{color: "#fff"}}>{value} {startingYear} - {endingYear}</TableCell>
                            <TableCell style={{color: "#fff"}} align="right">Rules: {rules}</TableCell>
                        </TableRow>
                    
                        { menWeights.length > 0 ? (
                             <TableRow>
                                <TableCell>M</TableCell>
                                <TableCell align="right">{menWeights}</TableCell>
                            </TableRow>
                        ) : <></>}
                         { womenWeights.length > 0 ? (
                             <TableRow>
                                <TableCell>W</TableCell>
                                <TableCell align="right">{womenWeights}</TableCell>
                            </TableRow>
                        ) : <></>}
                         { unisexWeights.length > 0 ? (
                             <TableRow>
                                <TableCell>U</TableCell>
                                <TableCell align="right">{unisexWeights}</TableCell>
                            </TableRow>
                        ) : <></>}
                    </>
                )
            })
        } else {
           return (
                <TableRow>
                    <TableCell colSpan={2}>No Categories to show</TableCell>
                </TableRow> 
           )
        }
    }

    return (
        <Table aria-label="simple table">
            <TableBody>
                {renderClasses()}
                {competition.isOwner ? (
                    <TableRow>
                        <TableCell colSpan={2}>
                            <AddCategoryModal competition={competition} onAdd={onAdd}  />
                        </TableCell>
                    </TableRow>
                ) : <></>}
            </TableBody>
        </Table>
    )
}
