import React from "react"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
  }),
);

interface Props {
    setStartDate: Function;
    startDate: Date | null;
    setEndDate: Function;
    endDate: Date | null;
}

const CompetitionSecondaryInfoForm = ({setStartDate, startDate, setEndDate, endDate}: Props) => {
    const classes = useStyles();

    const handleStartDateChange = (date: any | null) => {
        setStartDate(date);
    };


    const handleEndDateChange = (date: any | null) => {
        setEndDate(date);
    };

    return (
        <div>
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
            />
        </div>
    )
}

export default CompetitionSecondaryInfoForm;