import './App.scss';

import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import api from './auth';
import Navbar from './components/public/Navbar';
import { AuthContext, LoadingContext, NotificationContext } from "./hooks/context"
import { Data, getCredentials, removeCredentials } from "./utils/index"
import PageNotFound from './views/404page/PageNotFound';
import Competitions from './views/competitions/Competitions';
import Detail from './views/competitions/Detail';
import Home from './views/home/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<Data | any | undefined>()
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

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

  const addAlert = (message: string, variant: "success" | "error" | "warning") => {
    setAlerts([...alerts, { message, variant, show: true, id: alerts.length + 1 }])
  }

  const renderAlerts = () => {
    return alerts.map(a => {
      return <CustomAlert key={a.id} message={a.message} variant={a.variant} id={a.id} remove={(id: number) => { setAlerts(alerts => alerts.filter(al => al.id !== id)) }} />
    })
  }


  const toggleLoading = () => {
    setLoading(!loading)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, user: user, login: login, logout: logout, access: null, refresh: null }}>
      <NotificationContext.Provider value={{ addAlert: addAlert }}>
        <LoadingContext.Provider value={{ isLoading: loading, setLoading: setLoading }}>
          <Router>
            <div className="App">
              <Navbar>

                <Switch>

                  <Route path="/" component={Home} exact />
                  <Route path="/competitions" component={Competitions} exact />
                  <Route path="/competitions/:slug" component={Detail} exact />
                  <Route component={PageNotFound} />

                </Switch>

              </Navbar>
              <div style={{ position: "absolute", maxWidth: "25vw", bottom: 30, right: 30 }}>
                {renderAlerts()}
              </div>
            </div>
          </Router>
        </LoadingContext.Provider>
      </NotificationContext.Provider>
    </AuthContext.Provider>
  );
}

interface CustomAlertProps {
  message: string;
  variant: "success" | "error" | "warning";
  id: number;
  remove: Function;
}

const CustomAlert = ({ message, variant, id, remove }: CustomAlertProps) => {

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(() => {
        remove(id)
      }, 5000)
    }

    return () => {
      mounted = false
    }
  }, [id, remove])

  return <Alert className="custom-alert" severity={variant} onClose={() => { remove(id) }} style={{ marginTop: "1em", width: "25vw" }}>{message}</Alert>
}


export default App;
