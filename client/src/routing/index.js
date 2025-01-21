import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTE_PATH } from '../constant/urlConstant'
import Header from '../common/Header'
import Footer from '../common/Footer'
import LoginScreen from '../containers/loginScreen'
import { USER_ROLE } from '../constant/role/index'
import GMapScreen from '../containers/gMapScreen'
import HomeScreen from '../containers/homScreen'
import BookAppointmentScreen from '../containers/bookAppointmentScreen'
import MyBookedAppointmentsScreen from '../containers/profile'
import DoctorsScreen from '../containers/doctorsScreen'
import DoctorProfileScreen from '../containers/doctorsScreen/doctorProfileScreen'

const Routing = () => {
  const role = localStorage.getItem('role')
  const verified = localStorage.getItem('isLoggedIn')
  if (role === USER_ROLE.PATIENT && verified) {
    return (
      <React.Fragment>
        <header>
          <Header role={role} verified={verified} />
        </header>
        <main>
          <Routes>
            <Route path={ROUTE_PATH.BASE.HOME} element={<HomeScreen />} />
            <Route
              path={ROUTE_PATH.PATIENT.NEARBYHOSPITAL}
              element={<GMapScreen />}
            />
              <Route
              path={ROUTE_PATH.PATIENT.DOCTOR}
              element={<DoctorsScreen />}
            />
            <Route
              path={ROUTE_PATH.PATIENT.APPOINTMENT}
              element={<BookAppointmentScreen />}
            />
               <Route
              path={ROUTE_PATH.PATIENT.DATA}
              element={<MyBookedAppointmentsScreen />}
            />
          </Routes>
        </main>

        <Footer />
      </React.Fragment>
    )
  }

  if (role === USER_ROLE.DOCTOR && verified) {
    return (
      <React.Fragment>
        <header>
          <Header role={role} verified={verified} />
        </header>
        <main>
          <Routes>
            <Route path={ROUTE_PATH.BASE.HOME} element={<HomeScreen />} />
            <Route
              path={ROUTE_PATH.DOCTOR.DATA}
              element={<DoctorProfileScreen/>}
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
          <Route path={ROUTE_PATH.BASE.LOGIN} element={<LoginScreen />} />
          <Route path='*' element={<Navigate to={ROUTE_PATH.BASE.HOME} />} />
        </Routes>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default Routing
