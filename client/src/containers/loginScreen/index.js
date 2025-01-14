import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ProgressBar } from 'primereact/progressbar'
import LoginComponent from '../../components/login'
import { init_login, login } from '../../redux/action/auth/login'
import { toast } from 'react-toastify'

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
    isLoggedIn
  } = props

  useEffect(() => {
    initLoginScreen()
    // eslint-disable-next-line
  }, [])

const navigate=useNavigate()  

  const loginProps = {
    formFieldValueMap,
    isPageLevelError,
    isLoginSuccess,
    isLoading,
    login
  }
  if(isLoggedIn){
    toast.success('Login Success')
    navigate('/');
  }

  if (isLoginError) {
    const toastTitle = error ?? 'Error while login'
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
    userRole: state.loginReducer?.userRole,
    isLoggedIn:state.loginReducer?.isLoggedIn
  }
}

const selectFormFieldValueMap = loginReducer => {
  return loginReducer.formFieldValueMap
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
