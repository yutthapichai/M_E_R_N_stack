import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Provider } from "react-redux"

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './action/authActions'

import "./App.css"
import store from "./store"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Landing from "./components/layout/Landing"
import Register from "./components/auth/register"
import Login from "./components/auth/login"


// check set Token
if (localStorage.jwtToken) {
  
  setAuthToken(localStorage.jwtToken)     // set auth token header
  const decoded = jwt_decode(localStorage.jwtToken) // decode token
  store.dispatch(setCurrentUser(decoded)) // set user and isauth
  const currentTime = Date.now() / 1000   //check for expired token
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
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
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
