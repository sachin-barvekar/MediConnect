import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ProgressBar } from 'primereact/progressbar'
import { Button } from 'primereact/button'
import { toast } from 'react-toastify'
import CreateAppointmentComponent from '../../components/appointmentBook'
import { FORM_FIELDS } from './constants'
import { useForm } from 'react-hook-form'
import {
  fetchDoctors,
  init_appointment,
  scheduleAppointment,
} from '../../redux/action/appointment/appointment'
import MzAutoComplete from '../../common/MzForm/MzAutoComplete'

const BookAppointmentScreen = props => {
  const {
    fetchDoctors,
    doctors,
    isLoading,
    scheduleAppointment,
    scheduledSuccess,
    scheduledError,
    init_appointment,
    isError,
  } = props

  const [selectedState, setSelectedState] = useState(null)
  const [cityOptions, setCityOptions] = useState([])

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const appointmentProps = {
    doctors,
    scheduleAppointment,
    isLoading,
  }

  // Handle successful scheduling
  if (scheduledSuccess) {
    toast.success('Appointment Scheduled Successfully')
    init_appointment()
  }

  // Handle errors during scheduling
  if (isError) {
    toast.error(scheduledError ?? 'Error while scheduling appointment')
    init_appointment()
  }

  useEffect(() => {
    fetchDoctors()
  }, [fetchDoctors])

  // Handle state change and set city options
  const handleStateChange = state => {
    setSelectedState(state)
    console.log(state)
    setCityOptions(FORM_FIELDS.CITIES.optionsByState[state] || [])
  }

  const renderProgressBar = () => {
    return <ProgressBar mode='indeterminate' style={{ height: '6px' }} />
  }

  return (
    <div>
      {isLoading && renderProgressBar()}

      <div className='p-2 mt-4 flex gap-6 justify-content-center align-items-center'>
        <div className='w-4'>
          <MzAutoComplete
            control={control}
            name={FORM_FIELDS.STATES.name}
            label={FORM_FIELDS.STATES.label}
            placeholder={FORM_FIELDS.STATES.placeholder}
            optionLabel={FORM_FIELDS.STATES.optionLabel}
            optionValue={FORM_FIELDS.STATES.optionValue}
            options={FORM_FIELDS.STATES.options}
            suggestions={FORM_FIELDS.STATES.options}
            value={selectedState}
            onChange={handleStateChange}
            dropdown
          />
        </div>
        <div className='w-4'>
          {/* City Dropdown */}
          <MzAutoComplete
            control={control}
            name={FORM_FIELDS.CITIES.name}
            label={FORM_FIELDS.CITIES.label}
            placeholder={FORM_FIELDS.CITIES.placeholder}
            optionLabel={FORM_FIELDS.CITIES.optionLabel}
            optionValue={FORM_FIELDS.CITIES.optionValue}
            options={cityOptions}
            suggestions={cityOptions}
            dropdown
            disabled={!selectedState}
          />
        </div>
      </div>
      <div className='mt-4 text-center'>
          <Button
            label='Search'
            icon='pi pi-search'
            className='p-button-rounded'
          />
        </div>
      <CreateAppointmentComponent appointmentProps={appointmentProps} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDoctors: () => dispatch(fetchDoctors()),
    scheduleAppointment: appointmentData =>
      dispatch(scheduleAppointment(appointmentData)),
    init_appointment: () => dispatch(init_appointment()),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    doctors: state.appointmentReducer.doctors,
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
