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
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('isLoggedIn', true)
      toast.success(`Welcome ${user.displayName}`)
      navigate('/')
    } catch (error) {
      console.error('Google login error:', error)
      toast.error('Google login failed. Please try again.')
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
