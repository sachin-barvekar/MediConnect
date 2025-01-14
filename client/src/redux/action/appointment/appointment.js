import { FETCH_DOCTORS, INIT_APPOINTMENT, SCHEDULE_APPOINTMENT } from '../../../constant/actionTypes/appointment/appointment';
import { appointmentService } from '../../../services';

// Fetch doctors
export const fetchDoctorsStart = () => ({
  type: FETCH_DOCTORS.START,
});

export const fetchDoctorsSuccess = doctors => ({
  type: FETCH_DOCTORS.SUCCESS,
  payload: doctors,
});

export const fetchDoctorsError = error => ({
  type: FETCH_DOCTORS.ERROR,
  payload: error,
});

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

export const fetchDoctors = () => {
    return async dispatch => {
      dispatch(fetchDoctorsStart());
      try {
        const response = await appointmentService.fetchAllDoctors();
        console.log(response)
        if (response) {
          dispatch(fetchDoctorsSuccess(response));
        } else {
          dispatch(fetchDoctorsError('Failed to fetch doctors.'));
        }
      } catch (error) {
        dispatch(fetchDoctorsError('An error occurred while fetching doctors.'));
      }
    };
  };
  
  export const scheduleAppointment = (appointmentData) => {
    return async dispatch => {
      dispatch(scheduleAppointmentStart());
      try {
        const response = await appointmentService.bookAppointment(appointmentData);
        console.log(response)
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