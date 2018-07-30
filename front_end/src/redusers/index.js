import { combineReducers } from "redux"
import authReducer from "./authReducer"
import errorReduser from "./errorReducer"
import profileReduser from "./profileReducer"


export default combineReducers({
    auth: authReducer,
    errors: errorReduser,
    profile: profileReduser
})