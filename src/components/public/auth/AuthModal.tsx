import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';

import { GoogleAuthButton } from './GoogleAuthButton';


const useStyles = makeStyles((theme) => ({
    formRoot: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Sign In
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Log in to Shiai.eu</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Log in to Shiai.eu using your username and password or your social accounts
          </DialogContentText>
          <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <form className={classes.formRoot} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Username" />
                    <TextField id="standard-basic" label="Password" type={"password"} />
                    </form>
              </Grid>

              <Grid item xs={12} md={6}>
                  <GoogleAuthButton />
              </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
