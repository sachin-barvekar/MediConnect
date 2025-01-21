import { API_PATH } from '../../constant/urlConstant'
import { getApi } from '../GetAPI'
import { postApiFormData } from '../PostAPI'
import { handleAPIError } from '../common/errorHandler'

export const fetchAllDoctors = async payload => {
  const url = `${API_PATH.BASE.FETCH_ALL_DOCTORS}`
  try {
    let result = await getApi(url, payload)
    console.log(result)
    if (result?.error) {
      throw new handleAPIError(result)
    }
    return result
  } catch (error) {
    console.error('Error fetching all doctors:', error)
    return handleAPIError(error)
  }
}

export const fetchDoctorsByUserId = async userId => {
  const url = `${API_PATH.BASE.FETCH_DOCTORS_BY_USER_ID}/${userId}` // Use userId in the URL
  try {
    const result = await getApi(url) // No payload, as userId is passed in the URL
    console.log(result)
    if (result?.error) {
      throw new handleAPIError(result)
    }
    return result
  } catch (error) {
    console.error('Error fetching doctors by userId:', error)
    return handleAPIError(error)
  }
}

export const addDoctorDetailsByUserId = async (data, image, userId) => {
  const url = `${API_PATH.BASE.FETCH_DOCTORS_BY_USER_ID}/${userId}`;

  try {
    // Send the POST request with formData
    const result = await postApiFormData(url, data, image);

    // If the response contains an error, throw it for proper handling
    if (result?.error) {
      throw new handleAPIError(result);
    }

    return result; // Return the result if successful
  } catch (error) {
    console.error('Error in postApi:', error);
    return handleAPIError(error); // Return the error handler
  }
}

