import React from 'react'
import { connect } from 'react-redux'
import { ProgressBar } from 'primereact/progressbar'
import MyAppointmentsList from '../../components/profile'

const MyBookedAppointmentsScreen = props => {
  const {
    bookedAppointments,
    isLoading,
  } = props


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


export default connect(
  // mapStateToProps,
  // mapDispatchToProps
)(MyBookedAppointmentsScreen)
