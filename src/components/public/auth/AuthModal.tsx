import { Divider, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import styled from "styled-components"
import FacebookAuthButton from './FacebookAuthButton';

import { GoogleAuthButton } from './GoogleAuthButton';

const Col = styled.div`
  display:flex;
  justify-content: center;
  flex-direction: column;
`

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
      <Button 
        variant="outlined" 
        color="inherit" 
        onClick={handleClickOpen}>
          Sign In
      </Button>


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Log in to Shiai.eu</DialogTitle>

        <DialogContent style={{minWidth: "25vw", textAlign: "center"}}>
            <Col>
              <Col>

                <GoogleAuthButton />
                <FacebookAuthButton />

              </Col>
              <Divider style={{margin: "2em 1em"}}/>
              <Col>
                    <Typography 
                      variant="subtitle2"
                      style={{margin: ".5em 0"}}> 
                        or log in with username and password 
                    </Typography>

                    <TextField 
                      id="standard-basic" 
                      variant="outlined" 
                      style={{ margin: "1em"}} 
                      label="Username" />

                    <TextField 
                      id="standard-basic" 
                      variant="outlined" 
                      style={{ margin: "1em"}} 
                      label="Password" 
                      type={"password"} />

                    <Divider style={{margin: "1em"}}/>

                    <Button variant="outlined" >Log in</Button>

                    <Typography 
                      variant="subtitle2"
                      style={{margin: ".5em 0"}}> 
                      or if you dont have an account, you can log in with google
                    </Typography>
              </Col>
            </Col>
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
