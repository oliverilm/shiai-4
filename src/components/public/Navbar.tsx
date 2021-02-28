import "./public.scss"

import {
  AppBar,
  CircularProgress,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core"
import { Backdrop } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useContext } from 'react'
import { Link } from "react-router-dom";

import { AuthContext, LoadingContext } from '../../hooks/context';
import NavProfileMenu from "../private/NavProfileMenu";
import AuthModal from "./auth/AuthModal";
import BottomNav from "./BottomNav";
import MainDrawer from "./MainDrawer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));



const Navbar = ({ children }: any) => {
  const auth = useContext(AuthContext)
  const { isLoading, setLoading } = useContext(LoadingContext)
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    auth.logout()
  }

  return (
    <div className={classes.root}>

      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            id="sidebar-hamburger"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component={Link} to={"/"} style={{ flexGrow: 1, textDecoration: "none", color: "white" }}>
            Shiai.eu
            </Typography>
          {auth.isAuthenticated
            ? <NavProfileMenu logout={logout} />
            : <AuthModal />}
        </Toolbar>
      </AppBar>

      <MainDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <BottomNav />
      {/* TODO: add loading backdrop here and connect it with context */}
      {isLoading ? (
        <div>
          <Backdrop className={classes.backdrop} open={isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}

          </main>

        )}

    </div>
  )
}


export default Navbar;
