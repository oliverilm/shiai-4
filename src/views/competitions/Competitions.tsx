import './competitions.scss';

import { Grid, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../auth';
import { AuthContext } from '../../hooks/context';
import { Competition } from '../../utils/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
    inline: {
      display: 'inline',
    },
  }),
);

const Competitions = () => {
  const auth = useContext(AuthContext);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const classes = useStyles();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      api.competitions.list().then(res => {
        setCompetitions(res.data);
      });
    }

    return () => {
      mounted = false;
    };
  }, []);

  const competitionListItem = (competition: Competition) => {
    const { name, image, dateRange } = competition;
    const dateString = () => {
      const { lower, upper } = JSON.parse(dateRange);
      const lowerD = new Date(lower);
      const upperD = new Date(upper);
      if (upper === lower) {
        return lowerD.toDateString();
      } else {
        return `${lowerD.toLocaleDateString()} - ${upperD.toLocaleDateString()}`;
      }
    };
    return (
      <ListItem
        key={competition.slug}
        component={Link}
        to={`competitions/${competition.slug}`}
        alignItems="flex-start"
      >
        <ListItemAvatar>
          <Avatar alt={name} src={image} />
        </ListItemAvatar>
        <ListItemText
          style={{ color: '#000' }}
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {dateString()}
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
    );
  };

  const competitionsList = () => {
    if (competitions.length === 0) {
      return (
        <Grid container xs={12} sm={12} md={6} justify="center">
          No competitions
        </Grid>
      );
    } else {
      return (
        <Grid item xs={12} sm={12} md={6} justify="center">
          <div>
            <Typography variant="h3">Competitions</Typography>
          </div>
          <Divider style={{ width: '100%' }} />

          <List className={classes.root}>
            {competitions && competitions.map(c => competitionListItem(c))}
          </List>
        </Grid>
      );
    }
  };

  const eventsList = (
    <Grid
      item
      xs={12}
      sm={12}
      md={6}
      justify="center"
      alignContent="flex-start"
    >
      <Typography variant="h3">Events</Typography>
      <Divider style={{ width: '100%' }} />

      <div>No events</div>
    </Grid>
  );

  // TODO: make this better.
  if (competitions.length === 0) {
    return (
      <div>
        <Typography>There are no registred competitions :(</Typography>
        {/** TODO: if user is authenticated and in a club as a trainer. only then allow to add a new competition or event. */}
        {auth.isAuthenticated ? (
          <Typography>Be first and create one</Typography>
        ) : (
          <></>
        )}
      </div>
    );
  }

  return (
    <Grid container spacing={6}>
      {competitionsList()}
      {eventsList}
    </Grid>
  );
};

export default Competitions;
