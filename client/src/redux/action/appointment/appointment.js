import {  INIT_APPOINTMENT, SCHEDULE_APPOINTMENT } from '../../../constant/actionTypes/appointment/appointment';
import { appointmentService } from '../../../services';

export const init_appointment = () => ({
  type: INIT_APPOINTMENT,
})
// // Schedule appointment
export const scheduleAppointmentStart = () => ({
  type: SCHEDULE_APPOINTMENT.START,
});

export const scheduleAppointmentSuccess = appointment => ({
  type: SCHEDULE_APPOINTMENT.SUCCESS,
  payload: appointment,
});

export const scheduleAppointmentError = error => ({
  type: SCHEDULE_APPOINTMENT.ERROR,
  payload: error,
});

// // Cancel appointment
// export const cancelAppointmentStart = () => ({
//   type: CANCEL_APPOINTMENT.START,
// });

// export const cancelAppointmentSuccess = appointmentId => ({
//   type: CANCEL_APPOINTMENT.SUCCESS,
//   payload: { id: appointmentId },
// });

// export const cancelAppointmentError = error => ({
//   type: CANCEL_APPOINTMENT.ERROR,
//   payload: error,
// });

  
  export const scheduleAppointment = (appointmentData) => {
    return async dispatch => {
      dispatch(scheduleAppointmentStart());
      try {
        const response = await appointmentService.bookAppointment(appointmentData);
        if (response?.success) {
          dispatch(scheduleAppointmentSuccess(response));
        } else {
          dispatch(scheduleAppointmentError(response));
        }
      } catch (error) {
        dispatch(scheduleAppointmentError('An error occurred while scheduling the appointment.'));
      }
    };
  };