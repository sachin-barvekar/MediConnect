import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers/rootReducers'
import 'react-toastify/dist/ReactToastify.css'

const logger = store => next => action => {
  console.group(action.type)
  return next(action)
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(logger),
})


export default store
