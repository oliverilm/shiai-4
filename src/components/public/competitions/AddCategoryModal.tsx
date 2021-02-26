import { Checkbox, Divider, FormControlLabel, TableBody, Typography } from '@material-ui/core';
import { Paper, PaperProps, Table, TableCell, TableRow, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Draggable from 'react-draggable';

import api from '../../../auth';
import { Category, CategoryInCompetition, Competition } from '../../../utils/interfaces';
import { formatCategory, validateCategory } from '../../../utils/validators';
import { ChipInput } from '../ChipInput';


function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    input: {
      color: 'white',
    },
  }),
);


interface Props {
  competition: Competition;
  onAdd: any;
  edit?: CategoryInCompetition;
  categories: Category[];
}
export default function AddCategoryModal({ categories, competition, onAdd, edit }: Props) {
  const [menWeight, setMenWeight] = useState<string[]>([])
  const [womenWeight, setWomenWeight] = useState<string[]>([])
  const [unisexWeight, setUnisexWeight] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(categories[0])
  const [startingYear, setStartingYear] = useState<number | null>(new Date().getFullYear() - 2)
  const [endingYear, setEndingYear] = useState<number | null>(new Date().getFullYear())
  const [open, setOpen] = React.useState(false);
  const [rules, setRules] = useState<string[]>([])
  const [allowedOver, setAllowedOver] = useState<number>(0)
  const theme = useTheme();
  const classes = useStyles()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const isValidArr = (str: string): boolean => {
    try {
        const arr = JSON.parse(str).join("; ")
        return arr.length > 0;
    } catch (e) {
        return false
    }
    return false;
}

  useEffect(() => {
    let mounted = true
    // TODO: fix multiple category list update
    if (mounted) {
      
      if (edit) {
        setMenWeight(isValidArr(edit.menWeights) ? JSON.parse(edit.menWeights) : [])
        setWomenWeight(isValidArr(edit.womenWeights) ? JSON.parse(edit.womenWeights): [])
        setUnisexWeight(isValidArr(edit.unisexWeights) ? JSON.parse(edit.unisexWeights): [])
        setSelectedCategory(edit.categoryObj)
        calculateApprStartAndEnd(edit.categoryObj)
        setRules(JSON.parse(edit.rules))
        setAllowedOver(parseInt(edit.amountOverAllowed, 10))
      }
    }
    return () => {
      mounted = false;
    }
  }, [edit])

  const calculateApprStartAndEnd = (cat: Category | null) => {
    // TODO: simplify this
    if (cat === null) return;
    const year = new Date().getFullYear()
    setStartingYear(year - parseInt(cat.underValue, 10) - 2)
    setEndingYear(year - parseInt(cat.underValue, 10))
  }

  const handleSubmit = () => {
    // if data is valid submit
    // TODO: add validation for the input fields and submit or throw error
    // TODO: refactor to be simpler
    const data = {
      competition: competition.uuid,
      menWeights: menWeight,
      womenWeights: womenWeight,
      unisexWeights: unisexWeight,
      startingYear,
      endingYear,
      identifier: "kg",
      category: selectedCategory?.id,
      rules,
      amountOverAllowed: allowedOver
    }
    if (validateCategory(data)) {
      // if data is valid, close and submit
      if (edit) {
        // update here
        api.competitions.updateCategory(formatCategory(data), edit.id).then(res => {
          if (res.status < 300) reset()
        })
      } else {
        // TODO: throw error if not valid data.
        api.competitions.createCategory(formatCategory(data)).then(res => {
          if (res.status < 300) reset() 
        })
      }
    }
  }

  const reset = () => {
    setMenWeight([])
    setWomenWeight([])
    setUnisexWeight([])
    setSelectedCategory(categories[0])
    setRules([])
    setAllowedOver(0)
    handleClose()
    onAdd();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCategoryChange = (e: any) => {
    if (categories) { 
      setSelectedCategory(() => {
        const newCat = categories.find(cat => cat.value === e.target.value)
        if (newCat) {
          calculateApprStartAndEnd(newCat)
          return newCat;
        }
      })
    }
  }

  // TODO: simplify this
  return (
    <div>
      {edit ? (
        <EditIcon onClick={handleClickOpen} style={{ color: "#c1c1c1", cursor: "pointer", marginLeft: ".5em" }} />
      ) : (
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add new category
        </Button>
      )}
      
      <Dialog
        PaperComponent={PaperComponent}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle id="draggable-dialog-title">
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end"}}>
            <div>Add new Category to {competition.name}</div>
            {edit && (
              <div title="Delete this category">
              <DeleteIcon style={{cursor: "pointer"}} onClick={() => {
                api.competitions.deleteCategory(edit.id).then(res => {
                  if (res.status < 300) reset()
                })
              }}/>
            </div>
            )}
          </div>
        </DialogTitle>
        <DialogContent>
          <Table style={{ minWidth: "33em" }}>
            <TableBody>
              <TableRow style={{ backgroundColor: "#3f51b5", color: "#fff" }}>
                <TableCell style={{ color: "#fff", display: "flex", alignItems: "flex-end" }}>

                  <Select
                    style={{ color: "#fff" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCategory?.value}
                    onChange={handleCategoryChange}
                  >
                    {categories?.map(cat => <MenuItem key={cat.id} value={cat.value}>{cat.value}</MenuItem>)}
                  </Select>

                  <TextField
                    id="starting"
                    label="Start"
                    type="number"
                    value={startingYear}
                    InputProps={{
                      className: classes.input,
                    }}
                    InputLabelProps={{
                      className: classes.input
                    }}
                    onChange={e => { setStartingYear(parseInt(e.target.value, 10)) }}
                    style={{ color: "#fff", maxWidth: "5em", margin: "0 .5em" }} />
                  <TextField
                    id="ending"
                    label="End"
                    value={endingYear}
                    InputProps={{
                      className: classes.input,
                    }}
                    InputLabelProps={{
                      className: classes.input
                    }}
                    type="number"
                    onChange={e => { setEndingYear(parseInt(e.target.value, 10)) }}
                    style={{ color: "#fff", maxWidth: "5em", margin: "0 .5em" }} />

                </TableCell>
                <TableCell style={{ color: "#fff", maxWidth: "5em" }} align="right">
                  <TextField
                    id="allowed-over"
                    label="Allowed Over (g)"
                    value={allowedOver || 0}
                    InputProps={{
                      className: classes.input,
                    }}
                    InputLabelProps={{
                      className: classes.input
                    }}
                    type="number"
                    onChange={e => { setAllowedOver(parseInt(e.target.value, 10)||0) }}
                    style={{ color: "#fff", maxWidth: "9em" }} />

                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <ChipInput
                    label="Men"
                    value={menWeight}
                    emptyLabel="No weights added"
                    onChange={setMenWeight} />
                </TableCell>

              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <ChipInput
                    onChange={setWomenWeight}
                    value={womenWeight}
                    label="Women"
                    emptyLabel="No weights added" />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <ChipInput
                    onChange={setUnisexWeight}
                    value={unisexWeight}
                    label="Unisex"
                    emptyLabel="No weights added" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Typography variant={"h6"} style={{ marginTop: "1em" }}>Rules</Typography>
          <Divider />
          <RulePicker value={rules} onChangeRules={setRules} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

interface RulesProps {
  onChangeRules?: (selected: string[]) => void;
  rules?: string[];
  value: string[];
}

const RulePicker = ({ onChangeRules, rules, value }: RulesProps) => {
  // TODO : make logic to handle rules change and checked collection
  const defaultRules: string[] = [
    "No Shime waza",
    "No Kansetsu waza",
    "No Sutemi waza",
  ]
  const [selectedRules, setselectedRules] = useState<string[]>([])
  const rulesList = rules ?? defaultRules

  const renderRules = () => {
    return rulesList.map(rule => {
      return (
        <FormControlLabel
          key={rule}
          control={<Checkbox
            checked={value.includes(rule)} onChange={() => {
              if (value.includes(rule)) {
                onChangeRules && onChangeRules(value.filter(r => r !== rule))
              } else {
                onChangeRules && onChangeRules([...value, rule])
              }
              // if (selectedRules.includes(rule)) {
                // setselectedRules(() => {
                  // const newRules = selectedRules.filter(r => r !== rule)
                  // onChange && onChange(newRules)
                  // return newRules;
                // })
              // } else {
                // setselectedRules(() => {
                  // const newRules = [...selectedRules, rule]
                  // onChange && onChange(newRules)
                  // return newRules;
                // })
              // }

            }} name={rule} />}
          label={rule}
        />
      )
    })
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
      {renderRules()}
    </div>
  )
}
