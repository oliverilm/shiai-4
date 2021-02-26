import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import HelpIcon from '@material-ui/icons/Help';
import React, { useState } from 'react'

import api from '../../../auth';
import { Category, CategoryInCompetition, Competition } from '../../../utils/interfaces'
import AddCategoryModal from './AddCategoryModal'


interface Props {
    weightClasses: CategoryInCompetition[] | null;
    competition: Competition;
    onAdd: any;
}

export const CategoriesTable = ({ weightClasses, competition, onAdd }: Props) => {
    const [categories, setCategories] = useState<Category[]>()
    React.useEffect(() => {
        let mounted = true;
        if (mounted) {
            api.utils.categoryList().then(res => {
                setCategories(res.data)
            })
        }
        return () => {
            mounted = false;
        }
    }, [])

    // smaller first
    const sort = (a: CategoryInCompetition, b: CategoryInCompetition) => parseInt(a.categoryObj.underValue, 10) - parseInt(b.categoryObj.underValue, 10)

    const renderClasses = () => {
        if (categories && weightClasses && weightClasses.length > 0) {
            return weightClasses.sort(sort).map(cl => {
                const { menWeights, womenWeights, unisexWeights, startingYear, endingYear, amountOverAllowed, rules, categoryObj: { value }, id } = cl

                const rulesValid = (): boolean => {
                    const r = JSON.parse(rules)
                    return r.length > 0
                }

                const isValidArr = (str: string): boolean => {
                    try {
                        const arr = JSON.parse(str).join("; ")
                        return arr.length > 0;
                    } catch (e) {
                        return false
                    }
                    return false;
                }

                // TODO: major refactor here to make it solid.
                // TODO: add validations and rules display.
                return (
                    <TableBody key={id}>
                        <TableRow style={{ backgroundColor: "#3f51b5", color: "#fff" }}>
                            <TableCell style={{ color: "#fff" }}>{value} {startingYear} - {endingYear}</TableCell>
                            <TableCell style={{ color: "#fff" }} align="right">Overweight: {amountOverAllowed}g</TableCell>
                            <TableCell style={{ color: "#fff", display: "flex", flexDirection: "row", justifyContent: "flex-end" }} align="right">
                                <HelpIcon style={{ cursor: "pointer" }} />
                                {competition.isOwner && <AddCategoryModal categories={categories} edit={cl} competition={competition} onAdd={onAdd}/>}
                            </TableCell>
                        </TableRow>

                        { menWeights && isValidArr(menWeights) &&  menWeights.length > 0 ? (
                            <TableRow>
                                <TableCell>M</TableCell>
                                <TableCell colSpan={2} align="right">{JSON.parse(menWeights).join("; ")}</TableCell>
                            </TableRow>
                        ) : <></>}
                        { womenWeights && isValidArr(womenWeights) &&  womenWeights.length > 0 ? (
                            <TableRow>
                                <TableCell>W</TableCell>
                                <TableCell colSpan={2} align="right">{JSON.parse(womenWeights).join("; ")}</TableCell>
                            </TableRow>
                        ) : <></>}
                        { unisexWeights && isValidArr(unisexWeights) &&  unisexWeights.length > 0 ? (
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
            {categories && competition.isOwner ? (
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <AddCategoryModal categories={categories} competition={competition} onAdd={onAdd} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            ) : <></>}
        </Table>
    )
}
