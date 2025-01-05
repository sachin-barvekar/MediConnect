import { combineReducers } from 'redux'
import loginReducer from './auth/login'

const rootReducers = combineReducers({
  loginReducer
})
export default rootReducers
