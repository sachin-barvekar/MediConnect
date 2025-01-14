import { API_PATH } from '../../constant/urlConstant'
import { getApi } from '../GetAPI';
import { postApi } from '../PostAPI';
import {  handleAPIError } from '../common/errorHandler'

export const fetchAllDoctors = async (payload) => {
  const url = `${API_PATH.BASE.FETCH_ALL_DOCTORS}`;
  console.log(url)
  try {
    let result = await getApi(url, payload);
    console.log(result)
    if (result?.error) {
      throw new handleAPIError(result);
    }
    return result;
  } catch (error) {
    console.error('Error fetching all doctors:', error);
    return handleAPIError(error);
  }
};


export const bookAppointment = async (payload) => {
  const url = `${API_PATH.BASE.BOOK_APPOINTMENT}`;
  try {
    const result = await postApi(url, payload);
    if (result?.error) {
      throw new handleAPIError(result);
    }
    return result;
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    return handleAPIError(error);
  }
};

