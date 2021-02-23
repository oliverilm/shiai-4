import { FormHelperText, Input, InputAdornment, Paper,PaperProps, Table, TableCell, TableRow, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useTheme } from '@material-ui/core/styles';
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
  

interface Props {
    competition: Competition;
    onAdd: any;
}
export default function AddCategoryModal({competition, onAdd}: Props) {
  const [menWeight, setMenWeight] = useState<string>("")
  const [womenWeight, setWomenWeight] = useState<string>("")
  const [unisexWeight, setUnisexWeight] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [startingYear, setStartingYear] = useState<string>("")
  const [endingYear, setEndingYear] = useState<string>("")
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
     category: null,
    }
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
        <DialogTitle id="draggable-dialog-title">Add new Category</DialogTitle>
        <DialogContent>
        <Table>
            <TableRow style={{backgroundColor: "#3f51b5", color: "#fff"}}>
                <TableCell style={{color: "#fff"}}>

                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                style={{color: "#fff"}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCategory?.value}
                  onChange={(e) => (setSelectedCategory(categories?.find(cat => cat.id === e.target.value) || null))}
                >
                  {categories?.map(cat => <MenuItem key={cat.id} value={cat.id}>{cat.value}</MenuItem> )}
                </Select>

                </TableCell>
                <TableCell style={{color: "#fff"}} align="right">
                  <TextField id="starting" label="Oldest"  style={{color: "#fff"}}/>
                  <TextField id="ending" label="youngest" />


                </TableCell>
            </TableRow>
    
            <TableRow>
                <TableCell colSpan={2}>
                  <ChipInput label="Men" emptyLabel="No weights added" />
                </TableCell>
                
            </TableRow>

            <TableRow>
                <TableCell colSpan={2}>
                  <ChipInput label="Women" emptyLabel="No weights added" />
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell colSpan={2}>
                  <ChipInput label="Unisex" emptyLabel="No weights added" />
                </TableCell>
            </TableRow>
        </Table>
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
