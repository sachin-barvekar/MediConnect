import {
  INIT_APPOINTMENT,
  SCHEDULE_APPOINTMENT,
} from '../../../constant/actionTypes/appointment/appointment'

const initialState = {
  scheduledAppointments: [],
  isCancelling: false,
  scheduledError: '',
  errorCancelling: '',
  isLoading: false,
  scheduledSuccess: false,
  isError: false,
}

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_APPOINTMENT:
      return {
        ...state,
        isLoading: false,
        scheduledSuccess: false,
        isError: false,
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
        scheduledError: action?.payload?.message,
      }

    // Uncomment if cancel appointment logic is needed
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
