import { combineReducers } from 'redux'
import loginReducer from './auth/login'
import appointmentReducer from './appointment/appointment'
import doctorsReducer from './doctors/doctors'

const rootReducers = combineReducers({
  loginReducer,
  doctorsReducer,
  appointmentReducer
})
export default rootReducers
