import { combineReducers } from "redux"
import authReducer from "./authReducer"
import errorReduser from "./errorReducer"


export default combineReducers({
    auth: authReducer,
    errors: errorReduser
})