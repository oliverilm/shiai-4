import './App.scss';

import React, {useEffect,useState} from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch} from "react-router-dom";

import api from './auth';
import PrivateComponent from './components/private/PrivateComponent';
import PrivateRoute from './components/private/PrivateRoute';
import { GoogleAuthButton } from './components/public/auth/GoogleAuthButton';
import { AuthContext } from "./hooks/context"
import { removeCredentials } from "./utils/index"
import Competitions from './views/competitions/Competitions';
import Home from './views/home/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({})
  
  useEffect(() => {
    api.auth.verifyUser().then(result => {
      if (result.status === 200) {
        setUser(result.data)
        setIsAuthenticated(true)
      }
    })
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
    <AuthContext.Provider value={{isAuthenticated: isAuthenticated, user: user, login: login, logout: logout, access: null, refresh: null}}>
      <div className="App">
        <GoogleAuthButton />
        {/**
         * routes to make
         * 
         * Clubs list
         * Home
         * Competitions list
         * competition detail
         * competition Create
         * club create
         * user profile
         */}

        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/competitions">Competitions</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/competitions" component={Competitions} exact />
            </Switch>
          </div>
        </Router>

      </div>  
    </AuthContext.Provider>
  );
}


export default App;
