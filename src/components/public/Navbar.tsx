import "./public.scss"

import {AppBar,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography  } from "@material-ui/core"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import clsx from 'clsx';
import React, { useContext } from 'react'
import EqualizerIcon from '@material-ui/icons/Equalizer';
import {drawerRoutes} from "../../utils/routes"

import { AuthContext } from '../../hooks/context';
import NavProfileMenu from "../private/NavProfileMenu";
import AuthModal from "./AuthModal";
import { Link } from "react-router-dom";

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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));



const Navbar = ({children}: any) => {
    const auth = useContext(AuthContext)

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
      };
  
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        handleClose()
        auth.logout()
    }

    const renderRoutes = () => {
      const first = drawerRoutes.firstGroup.map(route => {
        return (
          <ListItem key={route.name} component={Link } button to={route.route} >
            <ListItemIcon>{React.createElement(route.icon)}</ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        )
      })

      const second = drawerRoutes.secondGroup.map(route => {
        return (
          <ListItem key={route.name} component={Link } button to={route.route} >
            <ListItemIcon>{React.createElement(route.icon)}</ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        )
      })
      return (<><List>{first}</List> <Divider/> <List>{second}</List></>)
    }

    return (
        <div className={classes.root}>

        
        <NavProfileMenu 
            anchorEl={anchorEl}
            handleClose={handleClose}
            logout={logout}
        />

        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
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
            <Typography variant="h6" noWrap component={Link} to={"/"} style={{flexGrow: 1, textDecoration: "none", color: "white"}}>
              Shiai.eu
            </Typography>
              <div>
                  {auth.isAuthenticated ? (
                      <div style={{display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={handleClick}>
                        <Typography variant="subtitle1">
                            {auth.user.email}
                        </Typography>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
              ) : (
                  <AuthModal />
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
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
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
              {renderRoutes()}
        </Drawer>
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
        </main>
      </div>   
    )
}


export default Navbar;
