import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import PrivateComponent from '../../private/PrivateComponent';

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

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

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
    setActiveStep(0)
    handleClose()
  }


  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <div>Competition main detail information <br /> name, <br />image, <br />date range, <br />registration date. </div>
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown step';
    }
  }

  return (
    <div>
      <PrivateComponent>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open form dialog
        </Button>


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
          <div style={{
            marginBottom: "2em"
          }}>
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
            </div>
        )}
        </DialogContent>
        <DialogActions style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        }}>
            <div>
            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    activeStep === steps.length - 1
                        ? handleFinishClick()
                        : handleNext()
                }}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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

    </div>
  );
}
