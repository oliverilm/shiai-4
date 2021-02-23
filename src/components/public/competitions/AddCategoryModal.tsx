import { Checkbox, FormControlLabel, TableBody } from '@material-ui/core';
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
import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';

import api from '../../../auth';
import { Category, Competition } from '../../../utils/interfaces';
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
}
export default function AddCategoryModal({ competition, onAdd }: Props) {
  const [menWeight, setMenWeight] = useState<string[]>([""])
  const [womenWeight, setWomenWeight] = useState<string[]>([""])
  const [unisexWeight, setUnisexWeight] = useState<string[]>([""])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [startingYear, setStartingYear] = useState<number | null>(new Date().getFullYear() - 2)
  const [endingYear, setEndingYear] = useState<number | null>(new Date().getFullYear())
  const [open, setOpen] = React.useState(false);
  const [allowedOver, setAllowedOver] = useState<number>(0)
  const theme = useTheme();
  const classes = useStyles()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    let mounted = true
    if (mounted) {
      // TODO : get categories, add inputs, collect data from inputs, post data
      // refresh categories in competition detail.
      api.utils.categoryList().then(res => {
        setCategories(res.data)
      })
    }
    return () => {
      mounted = false;
    }
  }, [])

  const calculateApprStartAndEnd = (cat: Category | null) => {
    // TODO: start and end is not updating correctly
    if (cat === null) return;
    const year = new Date().getFullYear()
    setStartingYear(year - parseInt(cat.underValue, 10) - 2)
    setEndingYear(year - parseInt(cat.underValue, 10))
  }

  const handleSubmit = () => {
    // if data is valid submit
    // TODO: add validation for the input fields and submit or throw error
    const data = {
      competition: competition.slug,
      menWeights: menWeight,
      womanWeight: womenWeight,
      unisexWeights: unisexWeight,
      startingYear,
      endingYear,
      identifier: "kg",
      category: selectedCategory?.value,
      rules: "",
      amountOverAllowed: allowedOver
    }
    console.log(data)
    // if data is valid, close and submit
    handleClose()
    onAdd(data)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCategoryChange = (e: any) => {
    setSelectedCategory(() => {
      const newCat = categories?.find(cat => cat.id === e.target.value) ?? null
      calculateApprStartAndEnd(newCat)
      return newCat;
    })
  }


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new category
      </Button>
      <Dialog
        PaperComponent={PaperComponent}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle id="draggable-dialog-title">Add new Category to {competition.name}</DialogTitle>
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
                    <MenuItem></MenuItem>
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
                    value={allowedOver}
                    InputProps={{
                      className: classes.input,
                    }}
                    InputLabelProps={{
                      className: classes.input
                    }}
                    type="number"
                    onChange={e => { setAllowedOver(parseInt(e.target.value, 10)) }}
                    style={{ color: "#fff", maxWidth: "9em" }} />

                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <ChipInput
                    label="Men"
                    emptyLabel="No weights added"
                    onChange={setMenWeight} />
                </TableCell>

              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <ChipInput
                    onChange={setWomenWeight}
                    label="Women"
                    emptyLabel="No weights added" />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <ChipInput
                    onChange={setUnisexWeight}
                    label="Unisex"
                    emptyLabel="No weights added" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <RulePicker onChange={(sel) => { console.log(sel) }} />
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
  onChange?: (selected: string[]) => void;
  rules?: string[];
}

const RulePicker = ({ onChange, rules }: RulesProps) => {
  // TODO : make logic to handle rules change and checked collection
  const renderRules = () => {
    return rules?.map(rule => {
      return (
        <FormControlLabel
          control={<Checkbox checked={true} onChange={() => {
            // TODO: handle change function
          }} name="gilad" />}
          label={rule}
        />
      )
    })
  }

  return <div></div>
}
