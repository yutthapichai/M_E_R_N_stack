import { GET_ERRORS, SET_CURRENT_USER } from "./types"
import setAuthToken from '../utils/setAuthToken'

import axios from 'axios'
import jwt_decode from 'jwt-decode'

export const registerUser = (userData, history) => dispatch => {
    axios.post("./api/users/register", userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data })) 
}

export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
    .then(
        res => {
            const { token } = res.data
            localStorage.setItem('jwtToken', token)
            setAuthToken(token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded))
        }  
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data}))
}

// set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// log user out
export const logoutUser = () => dispatch => {
    // Remove auth from localStorage
    localStorage.removeItem('jwtToken')
    // Remove auth header for future requests
    setAuthToken(false)
    // Set current user to {} which will set isAuthticated to false
    dispatch(setCurrentUser({}))
}