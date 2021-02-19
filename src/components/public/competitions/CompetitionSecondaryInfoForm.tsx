import { Menu } from "@material-ui/core";
import { FormControl, FormLabel, InputAdornment, InputLabel, MenuItem, OutlinedInput } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from "moment";
import React from "react"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import styled from "styled-components"

const Row = styled.div`
  display: flex;
  flex-direction:row;
  width: 100%;
  margin-top: 1em;
`;

const Col = styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
  margin: 1em 0px;
`;

const Center = styled.div`
  margin: auto;
`; 

const Main = styled.div`
  padding: 2em 0px;

`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

interface Props {
    setStartDate: Function;
    startDate: Date | null;
    setEndDate: Function;
    endDate: Date | null;
    amount: number; 
    setAmount: Function;
    currency: string;
    setCurrency: Function;
    registrationEnd: Date;
    setRegistrationEnd: Function;
}

const CompetitionSecondaryInfoForm = ({
  setStartDate, 
  startDate, 
  setEndDate, 
  endDate, 
  amount, 
  setAmount, 
  registrationEnd,
  setRegistrationEnd,
  currency, 
  setCurrency}: Props) => {
    const classes = useStyles();
    const [anchor, setAnchor] = React.useState<Element | null>(null)

    const handleStartDateChange = (e: any | null) => {
        setStartDate(e.target.value);
    };


    const handleEndDateChange = (e: any | null) => {
        setEndDate(e.target.value);
    };

    const handleAmountChange = (e:  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setAmount(e.target.value)
    }

    const handleRegistrationEndChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setRegistrationEnd(e.target.value)
    }

    const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
      setAnchor(e.currentTarget)
    }

    const handleClose =() => {
      setAnchor(null)
    }

    return (
      <Main>
        <Center>
        <Menu
            id="simple-menu"
            anchorEl={anchor}
            keepMounted
            open={Boolean(anchor)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => {
              setCurrency("€")
              handleClose()
            }}>€ - eur</MenuItem>
            <MenuItem onClick={() => {
              setCurrency("$")
              handleClose()
            }}>$ - dollar</MenuItem>
            <MenuItem onClick={() => {
              setCurrency("£")
              handleClose()
            }}>£ - pound</MenuItem>
          </Menu>

        <Col>
          <Row style={{ justifyContent: "space-between"}}>

             <TextField
                id="datetime-local-start"
                label="Competition start"
                type="date"
                value={moment(startDate).format("yyyy-MM-DD")}
                className={classes.textField}
                onChange={handleStartDateChange}
                InputLabelProps={{
                shrink: true,
                }}
                InputProps={{
                  inputProps: { 
                    min: startDate
                  } 
                }}

            />
            <TextField
                id="datetime-local-end"
                label="Competition end"
                type="date"
                value={moment(endDate).format("yyyy-MM-DD")}
                className={classes.textField}
                onChange={handleEndDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { 
                    min: startDate 
                  }
                }}

            />

          </Row>
          <Row>
            <TextField
                  id="datetime-local-reg-end"
                  label="Registration end"
                  type="date"
                  value={moment(registrationEnd).format("yyyy-MM-ddThh:mm:ss")}
                  className={classes.textField}
                  onChange={handleRegistrationEndChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: { 
                      max: startDate 
                    }
                  }}

              />
          </Row>
          <Row>
            <Col>

                <FormLabel style={{marginBottom: ".2em"}}>Competition location</FormLabel>
                <div style={{ zIndex: 100}}>
                  <GooglePlacesAutocomplete
                    apiKey="AIzaSyBRaksqElnSQ7FwfhsPjkkxc8FFA8qGUuM"
                  />
                </div>
            </Col>
          </Row>
          <Row>
          <Col>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Reg. fee</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={amount}
                onChange={handleAmountChange}
                type="number"
                startAdornment={<InputAdornment 
                  style={{
                    cursor: "pointer",
                    padding: "0 5px"
                  }}
                  position="start" 
                  onClick={handleOpen}>{currency}</InputAdornment>}
                labelWidth={60}
              />
            </FormControl>
            </Col>
          </Row>
        </Col>
        </Center>

      </Main>
    )
}

export default CompetitionSecondaryInfoForm;