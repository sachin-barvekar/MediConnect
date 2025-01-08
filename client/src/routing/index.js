import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTE_PATH } from '../constant/urlConstant'
import Header from '../common/Header'
import Footer from '../common/Footer'
import LoginScreen from '../containers/loginScreen'
import { USER_ROLE } from '../constant/role/index'
import GMapScreen from '../containers/gMapScreen'
import HomeScreen from '../containers/homScreen'


const Routing = () => {
  const role = localStorage.getItem('role')
  const verified = localStorage.getItem('isLogin')
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
        <Route path={ROUTE_PATH.BASE.HOME} element={<HomeScreen />} />
        <Route path={ROUTE_PATH.BASE.NEARBYHOSPITAL} element={<GMapScreen />} />
          <Route path={ROUTE_PATH.BASE.LOGIN} element={<LoginScreen />} />
          <Route path='*' element={<Navigate to={ROUTE_PATH.BASE.HOME} />} />
        </Routes>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default Routing
