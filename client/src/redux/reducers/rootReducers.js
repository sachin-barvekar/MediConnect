import { combineReducers } from 'redux'
import loginReducer from './auth/login'
import appointmentReducer from './appointment/appointment'

const rootReducers = combineReducers({
  loginReducer,
  appointmentReducer
})
export default rootReducers
