import { FETCH_DOCTORS, INIT_DOCTORS, ADD_DOCTOR_DETAILS } from "../../../constant/actionTypes/doctors/doctors";

const initialState = {
  doctors: [],
  isLoadingDoctors: false,
  errorDoctors: '',
  isError: false,
  isLoadingAddDoctor: false,
  addDoctorError: '',
  addDoctorSuccess: false,
};

const doctorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_DOCTORS:
      return {
        ...state,
        isLoadingDoctors: false,
        errorDoctors: '',
        doctors: [],
        isLoadingAddDoctor: false,
        addDoctorError: '',
        addDoctorSuccess: false,
      };

    case FETCH_DOCTORS.START:
      return {
        ...state,
        isLoadingDoctors: true,
        errorDoctors: '',
      };

    case FETCH_DOCTORS.SUCCESS:
      return {
        ...state,
        isLoadingDoctors: false,
        doctors: action.payload?.doctors || action.payload.data || [],
        errorDoctors: '',
      };

    case FETCH_DOCTORS.ERROR:
      return {
        ...state,
        isLoadingDoctors: false,
        errorDoctors: action?.payload?.message,
        isError: true,
      };

    // Add cases for adding doctor details
    case ADD_DOCTOR_DETAILS.START:
      return {
        ...state,
        isLoadingAddDoctor: true,
        addDoctorError: '',
        addDoctorSuccess: false,
      };

    case ADD_DOCTOR_DETAILS.SUCCESS:
      return {
        ...state,
        isLoadingAddDoctor: false,
        addDoctorSuccess: true,
        doctors: [...state.doctors, action.payload], // Assuming you want to add the new doctor to the list
        addDoctorError: '',
      };

    case ADD_DOCTOR_DETAILS.ERROR:
      return {
        ...state,
        isLoadingAddDoctor: false,
        addDoctorError: action?.payload?.message,
        addDoctorSuccess: false,
      };

    default:
      return state;
  }
};

export default doctorsReducer;
