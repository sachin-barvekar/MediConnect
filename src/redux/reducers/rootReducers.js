import { combineReducers } from 'redux'
import loginReducer from './auth/login'
import registerReducer from './auth/register'
import msg91Reducer from './auth/msg91'

const rootReducers = combineReducers({
  loginReducer,
  registerReducer,
  msg91Reducer,
})
export default rootReducers
