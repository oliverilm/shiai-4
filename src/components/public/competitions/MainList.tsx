import "./index.scss"

import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

import { Competition } from '../../../utils/interfaces';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);

interface Props {
  competitions: Competition[];
}

export default function MainList({ competitions }: Props) {
  const classes = useStyles();

  const renderCompetitions = (): React.ReactNode[] => {
    return competitions.map(comp => {
      return (
        <>
          <ListItem key={comp.slug} className={"list-item"} alignItems="flex-start" component={Link} to={`/${comp.slug}`}>
            <ListItemAvatar>
              <Avatar alt={comp.name.toUpperCase()} src={comp.image} />
            </ListItemAvatar>
            <ListItemText
              primary={comp.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {new Date(JSON.parse(comp.dateRange).lower).toDateString()}
                  </Typography>
                  {" — " + comp.location}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>

      )
    })
  }

  return (
    <List className={classes.root}>
      {renderCompetitions()}
    </List>
  );
}
