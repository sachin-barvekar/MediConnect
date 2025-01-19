import { FETCH_DOCTORS, INIT_DOCTORS } from "../../../constant/actionTypes/doctors/doctors";
import { doctorsService } from "../../../services";


export const initDoctors = () => ({
    type: INIT_DOCTORS,
  })

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

export const fetchDoctors = () => {
    return async dispatch => {
      dispatch(fetchDoctorsStart());
      try {
        const response = await doctorsService.fetchAllDoctors();
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