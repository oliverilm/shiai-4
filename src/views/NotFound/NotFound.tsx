import './NotFound.module.css';

import { Button, Divider, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = (): JSX.Element => {
  return (
    <div className="main">
      <div className="row-center-center">
        <Typography variant="h3">404</Typography>
        <Divider orientation="vertical" flexItem className="divider" />
        <Typography variant="h3">Page not found!</Typography>
      </div>
      <Link to="/" component={Button}>
        Back to main page
      </Link>
    </div>
  );
};

export default NotFound;
