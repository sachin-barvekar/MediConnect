import { INIT_LOGIN, LOGIN, LOGOUT } from '../../../constant/actionTypes/auth'
import { authService } from '../../../services'

export const init_login = () => {
  return {
    type: INIT_LOGIN,
  }
}
export const loginStart = payload => {
  return {
    type: LOGIN.START,
    payload,
  }
}
export const loginSuccess = payload => {
  return {
    type: LOGIN.SUCCESS,
    payload,
  }
}
export const loginError = payload => {
  return {
    type: LOGIN.ERROR,
    payload,
  }
}

export const login = payload => {
  return dispatch => {
    dispatch(loginStart())
    authService.login(payload)
  }
}

export const logoutStart = () => {
  return {
    type: LOGOUT.START,
  }
}

export const logoutSuccess = () => {
  return {
    type: LOGOUT.SUCCESS,
  }
}

export const logoutError = payload => {
  return {
    type: LOGOUT.ERROR,
    payload,
  }
}
