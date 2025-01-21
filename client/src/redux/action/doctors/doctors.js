import {
  FETCH_DOCTORS,
  INIT_DOCTORS,
  ADD_DOCTOR_DETAILS
} from '../../../constant/actionTypes/doctors/doctors'
import { doctorsService } from '../../../services'

export const initDoctors = () => ({
  type: INIT_DOCTORS,
})

export const fetchDoctorsStart = () => ({
  type: FETCH_DOCTORS.START,
})

export const fetchDoctorsSuccess = doctors => ({
  type: FETCH_DOCTORS.SUCCESS,
  payload: doctors,
})

export const fetchDoctorsError = error => ({
  type: FETCH_DOCTORS.ERROR,
  payload: error,
})

export const fetchDoctors = () => {
  return async dispatch => {
    dispatch(fetchDoctorsStart())
    try {
      const response = await doctorsService.fetchAllDoctors()
      if (response) {
        dispatch(fetchDoctorsSuccess(response))
      } else {
        dispatch(fetchDoctorsError('Failed to fetch doctors.'))
      }
    } catch (error) {
      dispatch(fetchDoctorsError('An error occurred while fetching doctors.'))
    }
  }
}
export const fetchDoctorsById = userId => {
  return async dispatch => {
    dispatch(fetchDoctorsStart())
    try {
      const response = await doctorsService.fetchDoctorsByUserId(userId)
      if (response?.success) {
        dispatch(fetchDoctorsSuccess(response))
      } else {
        dispatch(fetchDoctorsError(response))
      }
    } catch (error) {
      dispatch(
        fetchDoctorsError(
          `An error occurred while fetching doctors for userId: ${userId}`
        )
      )
    }
  }
}

// Start action for adding doctor details
export const addDoctorDetailsStart = () => ({
  type: ADD_DOCTOR_DETAILS.START,
})

// Success action for adding doctor details
export const addDoctorDetailsSuccess = doctorDetails => ({
  type: ADD_DOCTOR_DETAILS.SUCCESS,
  payload: doctorDetails,
})

// Error action for adding doctor details
export const addDoctorDetailsError = error => ({
  type: ADD_DOCTOR_DETAILS.ERROR,
  payload: error,
})

// Async action to add doctor details by userId
export const addDoctorDetails = (userId, data, image) => {
  return async dispatch => {
    dispatch(addDoctorDetailsStart())
    try {
      const response = await doctorsService.addDoctorDetailsByUserId(
        userId,
        data,
        image
      )
      if (response?.success) {
        dispatch(addDoctorDetailsSuccess(response))
      } else {
        dispatch(
          addDoctorDetailsError(
            response?.message || 'Failed to add doctor details.'
          )
        )
      }
    } catch (error) {
      dispatch(
        addDoctorDetailsError(
          `An error occurred while adding doctor details for userId: ${userId}`
        )
      )
    }
  }
}
