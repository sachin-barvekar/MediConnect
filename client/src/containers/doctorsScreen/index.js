import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ProgressBar } from 'primereact/progressbar'
import { fetchDoctors, initDoctors } from '../../redux/action/doctors/doctors'
import { toast } from 'react-toastify'
import DoctorsComponent from '../../components/doctors'

const DoctorsScreen = props => {
  const {
    doctors,
    isLoading,
    isPageLevelError,
    isFetchSuccess,
    isFetchError,
    error,
    fetchDoctors,
    initDoctors
  } = props

  useEffect(() => {
    initDoctors()
    fetchDoctors()
    // eslint-disable-next-line
  }, [])

  if (isFetchSuccess) {
    toast.success('Doctors fetched successfully')
  }

  if (isFetchError) {
    const toastTitle = error ?? 'Error while fetching doctors'
    toast.error(toastTitle)
    initDoctors()
  }

  const renderProgressBar = () => {
    return <ProgressBar mode='indeterminate' style={{ height: '6px' }} />
  }

  const doctorsProps = {
    doctors,
    isPageLevelError,
    isLoading,
  }

  return (
    <div>
      {isLoading && renderProgressBar()}
      <DoctorsComponent doctorsProps={doctorsProps} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDoctors: () => dispatch(fetchDoctors()),
    initDoctors: () => dispatch(initDoctors()),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    doctors: state.doctorsReducer?.doctors || [],
    isPageLevelError: state.doctorsReducer?.isPageLevelError,
    isLoading: state.doctorsReducer?.isLoading,
    isFetchSuccess: state.doctorsReducer?.isFetchSuccess,
    isFetchError: state.doctorsReducer?.isFetchError,
    error: state.doctorsReducer?.error,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsScreen)
                    