import { FormControl, FormLabel, InputAdornment, InputLabel, OutlinedInput } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from "react"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import styled from "styled-components"

const Row = styled.div`
  display: flex;
  flex-direction:row;
  width: 100%;
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
}

const CompetitionSecondaryInfoForm = ({setStartDate, startDate, setEndDate, endDate, amount, setAmount, currency, setCurrency}: Props) => {
    const classes = useStyles();

    const handleStartDateChange = (e: any | null) => {
        setStartDate(e.target.value);
    };


    const handleEndDateChange = (e: any | null) => {
        setEndDate(e.target.value);
    };

    const handleAmountChange = (e:  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setAmount(e.target.value)
    }

    return (
      <Main>
        <Center>

        <Col>
          <Row style={{ justifyContent: "space-between"}}>

             <TextField
                id="datetime-local-start"
                label="Competition start"
                type="datetime-local"
                defaultValue={startDate}
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
                type="datetime-local"
                defaultValue={endDate}
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
            <Col style={{paddingTop: "1em"}}>

                <FormLabel style={{marginBottom: ".2em"}}>Competition location</FormLabel>
                <GooglePlacesAutocomplete
                  apiKey="AIzaSyBRaksqElnSQ7FwfhsPjkkxc8FFA8qGUuM"
                />
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
                startAdornment={<InputAdornment position="start">€</InputAdornment>}
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