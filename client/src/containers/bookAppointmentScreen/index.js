import React from 'react'
import { connect } from 'react-redux'
import { ProgressBar } from 'primereact/progressbar'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify'
import CreateAppointmentComponent from '../../components/appointmentBook'
import {
  init_appointment,
  scheduleAppointment,
} from '../../redux/action/appointment/appointment'

const BookAppointmentScreen = props => {
  const {
    isLoading,
    scheduleAppointment,
    scheduledSuccess,
    scheduledError,
    init_appointment,
    isError,
  } = props

  const location = useLocation();
  const { doctor } = location.state || {};

  const appointmentProps = {
    scheduleAppointment,
    isLoading,
    doctor
  }

  if (scheduledSuccess) {
    toast.success('Appointment Scheduled Successfully')
    init_appointment()
  }
  if (isError) {
    toast.error(scheduledError ?? 'Error while scheduling appointment')
    init_appointment()
  }

  const renderProgressBar = () => {
    return <ProgressBar mode='indeterminate' style={{ height: '6px' }} />
  }

  return (
    <div>
      {isLoading && renderProgressBar()}
      <CreateAppointmentComponent appointmentProps={appointmentProps} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    scheduleAppointment: appointmentData =>
      dispatch(scheduleAppointment(appointmentData)),
    init_appointment: () => dispatch(init_appointment()),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isLoading: state.appointmentReducer.isLoading,
    scheduledSuccess: state.appointmentReducer.scheduledSuccess,
    scheduledError: state.appointmentReducer.scheduledError,
    isError: state.appointmentReducer.isError,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookAppointmentScreen)
