import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ProgressBar } from 'primereact/progressbar'
import LoginComponent from '../../components/login'
import { init_login, login } from '../../redux/action/auth/login'
import { toast } from 'react-toastify'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'

const LoginScreen = props => {
  const {
    initLoginScreen,
    formFieldValueMap,
    isPageLevelError,
    isLoading,
    isLoginSuccess,
    isLoginError,
    error,
    login,
    init_login,
  } = props

  useEffect(() => {
    initLoginScreen()
    // eslint-disable-next-line
  }, [])

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      // Step 1: Attempt to sign in with Google
      const result = await signInWithPopup(auth, provider)
      const user = result.user
  
      // Step 2: Prepare the login payload
      const loginData = {
        email: user.email,
        name: user.displayName,
        role: 'patient', // or 'doctor' based on your use case
        profileImg: user.photoURL,
      }
  
      // Step 3: Call the login API only if sign-in was successful
      const response = await login(loginData)
      console.log(response)
      // Step 4: Handle response from the login API
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.user))
        localStorage.setItem('isLoggedIn', true)
        toast.success(`Welcome ${response.user.name}`)
        navigate('/')
      } else {
        toast.error(response.message || 'Login failed. Please try again.')
      }
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in process was canceled. Please try again.')
      } else {
        console.error('Google login error:', error)
        toast.error('Google login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }
  

  const loginProps = {
    formFieldValueMap,
    isPageLevelError,
    isLoginSuccess,
    isLoading,
    login,
    loading,
    handleGoogleLogin,
  }

  if (isLoginError) {
    const toastTitle = error ? error?.error : 'Error while login'
    toast.error(toastTitle)
    init_login()
  }

  const renderProgressBar = () => {
    return <ProgressBar mode='indeterminate' style={{ height: '6px' }} />
  }

  return (
    <div>
      {isLoading && renderProgressBar()}
      <LoginComponent loginProps={loginProps} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    initLoginScreen: () => dispatch(init_login()),
    login: loginData => dispatch(login(loginData)),
    init_login: () => dispatch(init_login()),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    formFieldValueMap: selectFormFieldValueMap(state.loginReducer),
    isPageLevelError: state.loginReducer.isPageLevelError,
    isLoading: state.loginReducer.isLoading,
    isLoginSuccess: state.loginReducer.isLoginSuccess,
    isLoginError: state.loginReducer.isLoginError,
    error: state.loginReducer.error,
    isLoggedIn: state.loginReducer?.isLoggedIn,
  }
}

const selectFormFieldValueMap = loginReducer => {
  return loginReducer.formFieldValueMap
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
