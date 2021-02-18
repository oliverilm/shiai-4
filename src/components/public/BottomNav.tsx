import "./public.scss"

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import React from 'react';
import { Link } from "react-router-dom";

import { bottomNavRoutes } from "../../utils/routes"



export default function BottomNav() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const renderRoutes = () => {
    return bottomNavRoutes.map(route => {
      return (<BottomNavigationAction
        component={Link}
        to={route.route}
        key={route.name}
        label={route.name}
        value={route.name}
        icon={React.createElement(route.icon)} />
      )

    })
  }
  return (
    <BottomNavigation id="bottom-nav"
      style={{
        position: "fixed",
        width: "100vw",
        bottom: 0,
        zIndex: 100
      }} value={value} onChange={handleChange}>
      {renderRoutes()}
    </BottomNavigation>
  );
}