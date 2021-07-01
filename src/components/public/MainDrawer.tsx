import './public.scss';

import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../hooks/context';
import { drawerRoutes, RouteObjectInterface } from '../../utils/routes';
import CompetitionAddForm from './competitions/CompetitionCreateModal';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

interface Props {
  open: boolean;
  handleDrawerClose: any;
}

const MainDrawer = ({ open, handleDrawerClose }: Props) => {
  const auth = useContext(AuthContext);

  const classes = useStyles();
  const theme = useTheme();

  const filterPrivateRoutes = (route: RouteObjectInterface) => {
    const isLoggedIn = auth.isAuthenticated;
    if (isLoggedIn) return true;
    if (route.private) return false;
    return true;
  };

  const renderRoutes = () => {
    const first = drawerRoutes.firstGroup
      .filter(filterPrivateRoutes)
      .map(route => {
        return (
          <ListItem key={route.name} component={Link} button to={route.route}>
            <ListItemIcon>{React.createElement(route.icon)}</ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        );
      });

    const second = drawerRoutes.secondGroup
      .filter(filterPrivateRoutes)
      .map(route => {
        return (
          <ListItem key={route.name} component={Link} button to={route.route}>
            <ListItemIcon>{React.createElement(route.icon)}</ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        );
      });
    return (
      <>
        <List>{first}</List> <Divider /> <List>{second}</List>
      </>
    );
  };

  return (
    <Drawer
      id="drawer"
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      {renderRoutes()}
      <CompetitionAddForm />
    </Drawer>
  );
};

export default MainDrawer;
