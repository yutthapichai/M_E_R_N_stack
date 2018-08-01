import axios from 'axios'
import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER} from './types'

//GET current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('/api/profile')
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: {}})) // payload is get value for profile in reduser
}

//GET handle profile
export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading())
    axios.get(`/api/profile/handle/${handle}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: null })) // payload is get value for profile in reduser
}

//Get Profiles
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('/api/profile/all')
    .then(res => dispatch({ type: GET_PROFILES, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILES, payload: null })) // payload is get value for profile in reduser
}

// Add education
export const addEducation = (eduData, history) => dispatch => {
    axios.post('/api/profile/education', eduData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// Add experience
export const addExperience = (expData, history) => dispatch => {
    axios.post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// Delete Experience
export const deleteExperience = (id) => dispatch => {
    axios.delete(`/api/profile/experience/${id}`)
        .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// Delete Education
export const deleteEducation = (id) => dispatch => {
    axios.delete(`/api/profile/education/${id}`)
        .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// Delete account profile
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure?')) {
        axios.delete('/api/profile')
        .then(res => dispatch({ type: SET_CURRENT_USER, payload: {}}))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data}))
    }
}

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}
// Clear Profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}