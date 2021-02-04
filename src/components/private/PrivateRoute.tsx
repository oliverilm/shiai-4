import React, {useContext} from 'react'
import {Redirect, Route} from "react-router-dom"

import { AuthContext } from '../../hooks/context'

const PrivateRoute = ({component, ...rest}: any) => {
    const auth = useContext(AuthContext)
    const routeComponent = (props: any) => (
        auth.isAuthenticated
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};

export default PrivateRoute;