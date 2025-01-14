import {
  INIT_APPOINTMENT,
  FETCH_DOCTORS,
  SCHEDULE_APPOINTMENT,
} from '../../../constant/actionTypes/appointment/appointment'

const initialState = {
  doctors: [],
  isLoadingDoctors: false,
  errorDoctors: '',
  scheduledAppointments: [],
  isCancelling: false,
  scheduledError: '',
  errorCancelling: '',
  isLoading: false,
  scheduledSuccess: false,
  isError: false
}

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_APPOINTMENT:
      return {
        ...state,
        isLoading: false,
        scheduledSuccess: false,
        isError: false
      }
    case FETCH_DOCTORS.START:
      return {
        ...state,
        isLoadingDoctors: true,
        errorDoctors: '',
      }

    case FETCH_DOCTORS.SUCCESS:
      return {
        ...state,
        isLoadingDoctors: false,
        doctors: action.payload?.doctors,
        errorDoctors: '',
      }

    case FETCH_DOCTORS.ERROR:
      return {
        ...state,
        isLoadingDoctors: false,
        errorDoctors:
          action?.payload?.message,
      }

    case SCHEDULE_APPOINTMENT.START:
      return {
        ...state,
        errorScheduling: '',
        isLoading: true,
      }

    case SCHEDULE_APPOINTMENT.SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorScheduling: '',
        scheduledSuccess: true,
      }

    case SCHEDULE_APPOINTMENT.ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        scheduledError:
          action?.payload?.message,
      }

    // // Cancel an appointment
    // case CANCEL_APPOINTMENT.START:
    //   return {
    //     ...state,
    //     isCancelling: true,
    //     errorCancelling: '',
    //   };

    // case CANCEL_APPOINTMENT.SUCCESS:
    //   return {
    //     ...state,
    //     isCancelling: false,
    //     scheduledAppointments: state.scheduledAppointments.filter(
    //       appointment => appointment.id !== action.payload.id // Remove cancelled appointment
    //     ),
    //     errorCancelling: '',
    //   };

    // case CANCEL_APPOINTMENT.ERROR:
    //   return {
    //     ...state,
    //     isCancelling: false,
    //     errorCancelling: action?.payload?.error?.message || 'Failed to cancel appointment',
    //   };

    default:
      return state
  }
}

export default appointmentReducer
