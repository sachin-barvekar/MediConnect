import { INIT_LOGIN, LOGIN } from '../../../constant/actionTypes/auth'


const formFieldValueMapLogin = payload => {
  return payload.role ?? ''
}

const getInitialStateFromLocalStorage = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const userRole = localStorage.getItem('role')
  return {
    isLoggedIn: isLoggedIn === 'true' ? true : false,
    userRole: userRole ? userRole : '',
    formFieldValueMapLogin: formFieldValueMapLogin({ role: userRole }),
    error: '',
    isLoading: false,
    isPageLevelError: false,
    isLoadingPage: false,
    isLoginError: false,
    isLogoutSuccess: false,
    isLogoutError: false,
  }
}

const initialState = getInitialStateFromLocalStorage()

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_LOGIN:
      return {
        ...state,
        isLoginError: false,
        error: '',
        isLoading: false,
        isLoggedIn: false,
      }

    case LOGIN.START:
      return {
        ...state,
        isLoading: true,
        error: '',
      }

    case LOGIN.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userRole: action.payload.role,
        isLoading: false,
        error: '',
      }

    case LOGIN.ERROR:
      return {
        ...state,
        error: action?.payload?.error?.message,
        isLoginError: true,
        isLoading: false,
      }

    default:
      return state
  }
}

export default authReducer
