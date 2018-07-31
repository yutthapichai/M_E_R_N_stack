import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import jwt_decode from 'jwt-decode'

import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './action/authActions'
import { clearCurrentProfile } from "./action/profileActions"
import store from "./store"
import PrivateRoute from './components/common/PrivateRoute'

import "./App.css"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Landing from "./components/layout/Landing"
import Register from "./components/auth/register"
import Login from "./components/auth/login"
import Dashboard from "./components/dashboard/Dashboard"
import CreateProfile from "./components/create-profile/CreateProfile"
import EditProfile from './components/edit-profile/EditProfile'

// check set Token
if (localStorage.jwtToken) {
  
  setAuthToken(localStorage.jwtToken)     // set auth token header
  const decoded = jwt_decode(localStorage.jwtToken) // decode token
  store.dispatch(setCurrentUser(decoded)) // set user and isauth
  const currentTime = Date.now() / 1000   //check for expired token
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    store.dispatch(clearCurrentProfile());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
