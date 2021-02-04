import './App.scss';
import 'semantic-ui-css/semantic.min.css'

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from "react-router-dom";

import api from './auth';
import PrivateComponent from './components/private/PrivateComponent';
import PrivateRoute from './components/private/PrivateRoute';
import { GoogleAuthButton } from './components/public/auth/GoogleAuthButton';
import Navbar from './components/public/Navbar';
import { AuthContext } from "./hooks/context"
import { Data, getCredentials, removeCredentials } from "./utils/index"
import Competitions from './views/competitions/Competitions';
import Home from './views/home/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<Data | any | undefined>()

  useEffect(() => {
    if (getCredentials().access_token !== null) {
      api.auth.verifyUser().then(result => {
        if (result.status === 200) {
          setUser(result.data)
          setIsAuthenticated(true)
        }
      })
    }
  }, [])

  const login = () => {
    api.auth.verifyUser().then(result => {
      if (result.status === 200) {
        setUser(result.data)
        setIsAuthenticated(true)
      }
    })
  }

  const logout = () => {
    removeCredentials()
    setIsAuthenticated(false);
    setUser({})
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, user: user, login: login, logout: logout, access: null, refresh: null }}>
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/competitions" component={Competitions} exact />
          </Switch>
        </div>
      </Router>

    </AuthContext.Provider>
  );
}


export default App;
