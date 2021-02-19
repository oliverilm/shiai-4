import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { createStyles,makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { convertToRaw, EditorState } from 'draft-js';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import draftToMarkdown from 'draftjs-to-markdown';
import React from 'react';
import { useState } from 'react';
import styled from "styled-components"

import api from '../../../auth';
import PrivateComponent from '../../private/PrivateComponent';
import CompetitionMainInformationForm from './CompetitionMainInformationForm';
import CompetitionSecondaryInfoForm from './CompetitionSecondaryInfoForm';


const MarginDiv = styled.div`
  margin-bottom: 2em;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return ['Competition main info', 'Competition secondary info', 'Classes and weights'];
}

export default function CompetitionAddForm() {
  const [open, setOpen] = React.useState(false);
  const [editorState, setEditorState] = React.useState<EditorState>(EditorState.createEmpty())
  const [name, setName] = useState<string>("")
  const [registrationFee, setRegistrationFee] = useState<number>(0)
  const [currency, setCurrency] = useState<string>("€")
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinishClick = () => {
    // collect data and send it to the api
    const hashConfig = {
      trigger: '#',
      separator: ' ',
    }
    const data = {
      name,
      image: null,
      description: draftToMarkdown(
          convertToRaw(editorState.getCurrentContent()), hashConfig),
      dateRange: {
        bounds: "[)",
        lower: startDate,
        upper: endDate
      },
      location: null,
      registrationEndDate: null,
      registrationFee: null,
      currency: null,
      isPublished: null,

    }
    console.log(data)
    // api.competitions.create(data)
    setActiveStep(0)
    handleClose()
  }


  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <CompetitionMainInformationForm 
                  name={name}
                  setName={setName}
                  editorState={editorState}
                  setEditorState={setEditorState}
          />
      case 1:
        return <CompetitionSecondaryInfoForm 
                  endDate={endDate} 
                  startDate={startDate} 
                  setEndDate={setEndDate} 
                  setStartDate={setStartDate} 
                  setAmount={setRegistrationFee}
                  currency={currency}
                  setCurrency={setCurrency}
                  amount={registrationFee}/>;

      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown step';
    }
  }
  return (
    <>
      <PrivateComponent>
        <ListItem onClick={handleClickOpen} style={{cursor: "pointer"}} >
            <ListItemIcon><AddCircleIcon /></ListItemIcon>
            <ListItemText primary={"Add Competition"}/>
        </ListItem>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <Stepper activeStep={activeStep}>
              {steps.map((label) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: { optional?: React.ReactNode } = {};
                  return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                  );
              })}
          </Stepper>
        </DialogTitle>
        <DialogContent>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          <MarginDiv>
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
          </MarginDiv>
        )}
        </DialogContent>
        <DialogActions style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        }}>
          <div>
            <Button 
              disabled={activeStep === 0} 
              onClick={handleBack} 
              className={classes.button}>Back</Button>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                    activeStep === steps.length - 1
                        ? handleFinishClick()
                        : handleNext()
                }}
              >{activeStep === steps.length - 1 ? 'Submit competition' : 'Next'}
            </Button>
          </div>
          <div>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      </PrivateComponent>

    </>
  );
}
