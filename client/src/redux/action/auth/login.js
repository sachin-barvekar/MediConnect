import { INIT_LOGIN, LOGIN } from '../../../constant/actionTypes/auth'
import { authService } from '../../../services'

// Initialize login action
export const init_login = () => ({
  type: INIT_LOGIN,
})

// Start login action
export const loginStart = () => ({
  type: LOGIN.START,
})

// Handle successful login action
export const loginSuccess = user => ({
  type: LOGIN.SUCCESS,
  payload: user,
})

// Handle login error action
export const loginError = error => ({
  type: LOGIN.ERROR,
  payload: error,
})

// Login action (async)
export const login = payload => {
  return async dispatch => {
    dispatch(loginStart())
    try {
      const response = await authService.login(payload)

      if (response.success) {
        dispatch(loginSuccess(response.user))
        localStorage.setItem('user', JSON.stringify(response.user))
        localStorage.setItem('role', response.user.role)
        localStorage.setItem('isLoggedIn', true)
      } else {
        dispatch(loginError(response))
      }
    } catch (error) {
      dispatch(loginError('An error occurred during login. Please try again.'))
    }
  }
}


