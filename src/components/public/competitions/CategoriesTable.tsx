import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import HelpIcon from '@material-ui/icons/Help';
import React from 'react'

import { CategoryInCompetition, Competition } from '../../../utils/interfaces'
import AddCategoryModal from './AddCategoryModal'


interface Props {
    weightClasses: CategoryInCompetition[] | null;
    competition: Competition;
    onAdd: any;
}

export const CategoriesTable = ({ weightClasses, competition, onAdd }: Props) => {

    // smaller first
    const sort = (a: CategoryInCompetition, b: CategoryInCompetition) => parseInt(a.categoryObj.underValue, 10) - parseInt(b.categoryObj.underValue, 10)

    const renderClasses = () => {
        if (weightClasses && weightClasses.length > 0) {
            return weightClasses.sort(sort).map(cl => {
                const { menWeights, womenWeights, unisexWeights, startingYear, endingYear, amountOverAllowed, rules, categoryObj: { value }, id } = cl

                const rulesValid = (): boolean => {
                    const r = JSON.parse(rules)
                    return r.length > 0
                }
                // TODO: add validations and rules display.
                return (
                    <TableBody key={id}>
                        <TableRow style={{ backgroundColor: "#3f51b5", color: "#fff" }}>
                            <TableCell style={{ color: "#fff" }}>{value} {startingYear} - {endingYear}</TableCell>
                            <TableCell style={{ color: "#fff" }} align="right">Overweight: {amountOverAllowed}g</TableCell>
                            <TableCell style={{ color: "#fff" }} align="right">
                                <HelpIcon style={{ cursor: "pointer" }} />
                                {competition.isOwner && <EditIcon style={{ color: "#c1c1c1", cursor: "pointer", marginLeft: ".5em" }} />}
                            </TableCell>
                        </TableRow>

                        { menWeights && menWeights.length > 0 ? (
                            <TableRow>
                                <TableCell>M</TableCell>
                                <TableCell colSpan={2} align="right">{JSON.parse(menWeights).join("; ")}</TableCell>
                            </TableRow>
                        ) : <></>}
                        { womenWeights && womenWeights.length > 0 ? (
                            <TableRow>
                                <TableCell>W</TableCell>
                                <TableCell colSpan={2} align="right">{JSON.parse(womenWeights).join("; ")}</TableCell>
                            </TableRow>
                        ) : <></>}
                        { unisexWeights && unisexWeights.length > 0 ? (
                            <TableRow>
                                <TableCell>U</TableCell>
                                <TableCell colSpan={2} align="right">{JSON.parse(unisexWeights).join("; ")}</TableCell>
                            </TableRow>
                        ) : <></>}
                    </TableBody>
                )
            })
        } else {
            return (
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>No Categories to show</TableCell>
                    </TableRow>
                </TableBody>
            )
        }
    }

    return (
        <Table aria-label="simple table">
            {renderClasses()}
            {competition.isOwner ? (
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <AddCategoryModal competition={competition} onAdd={onAdd} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            ) : <></>}
        </Table>
    )
}
