import { FETCH_DOCTORS, INIT_DOCTORS } from "../../../constant/actionTypes/doctors/doctors"

const initialState = {
  doctors: [],
  isLoadingDoctors: false,
  errorDoctors: '',
  isError:false
}

const doctorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_DOCTORS:
      return {
        ...state,
        isLoadingDoctors: false,
        errorDoctors: '',
        doctors: [],
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
        doctors: action.payload?.doctors || [],
        errorDoctors: '',
      }

    case FETCH_DOCTORS.ERROR:
      return {
        ...state,
        isLoadingDoctors: false,
        errorDoctors: action?.payload?.message,
        isError:true
      }

    default:
      return state
  }
}

export default doctorsReducer
