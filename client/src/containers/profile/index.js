import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ProgressBar } from 'primereact/progressbar'
import MyAppointmentsList from '../../components/profile'
import { fetchBookedAppointments, init_appointments } from '../../redux/action/appointment/appointment'
import { toast } from 'react-toastify'

const MyBookedAppointmentsScreen = props => {
  const {
    fetchBookedAppointments,
    bookedAppointments,
    isLoading,
    init_appointments,
    fetchError,
    isError,
  } = props

  // useEffect(() => {
  //   fetchBookedAppointments()
  // }, [fetchBookedAppointments])

  // if (isError) {
  //   toast.error(fetchError ?? 'Error while fetching appointments')
  //   init_appointments()
  // }

  const renderProgressBar = () => {
    return <ProgressBar mode='indeterminate' style={{ height: '6px' }} />
  }

  return (
    <div>
      {isLoading && renderProgressBar()}
      <MyAppointmentsList appointments={bookedAppointments} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    // fetchBookedAppointments: () => dispatch(fetchBookedAppointments()),
    // init_appointments: () => dispatch(init_appointments()),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    // bookedAppointments: state.appointmentReducer.bookedAppointments,
    // isLoading: state.appointmentReducer.isLoading,
    // fetchError: state.appointmentReducer.fetchError,
    // isError: state.appointmentReducer.isError,
  }
}

export default connect(
  // mapStateToProps,
  // mapDispatchToProps
)(MyBookedAppointmentsScreen)
