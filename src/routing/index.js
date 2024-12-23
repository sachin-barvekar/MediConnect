import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTE_PATH } from '../constant/urlConstant'
import Header from '../common/Header'
import Footer from '../common/Footer'
import LoginScreen from '../containers/loginScreen'
import RegisterScreen from '../containers/registerScreen'
import { useSelector } from 'react-redux'
import { USER_ROLE } from '../constant/role/index'


import { isVerify, userRole } from '../redux/selectors/auth/index'

const Routing = () => {
  const verified = useSelector(isVerify)
  const role = useSelector(userRole)

  if (role === USER_ROLE.FARMER && verified) {
    return (
      <React.Fragment>
        <header>
          <Header role={role} verified={verified} />
        </header>
        <main>
          <Routes>
            <Route
              path='*'
              element={<Navigate to={ROUTE_PATH.FARMER.HOME} />}
            />
          </Routes>
        </main>

        <Footer />
      </React.Fragment>
    )
  }

  // Customer Routes
  if (role === USER_ROLE.CUSTOMER && verified) {
    return (
      <React.Fragment>
        <header>
          <Header role={role} verified={verified} />
        </header>
        <main>
          <Routes>
            <Route
              path='*'
              element={<Navigate to={ROUTE_PATH.CUSTOMER.HOME} />}
            />
          </Routes>
        </main>

        <Footer />
      </React.Fragment>
    )
  }

  // Fallback: If no role matches, show Login/Register
  return (
    <React.Fragment>
      <header>
        <Header role={role} verified={verified} />
      </header>
      <main>
        <Routes>
          <Route path={ROUTE_PATH.BASE.LOGIN} element={<LoginScreen />} />
          <Route path={ROUTE_PATH.BASE.REGISTER} element={<RegisterScreen />} />
          <Route path='*' element={<Navigate to={ROUTE_PATH.BASE.HOME} />} />
        </Routes>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default Routing
