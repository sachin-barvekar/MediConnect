import { API_PATH } from '../../constant/urlConstant'
import { postApi } from '../PostAPI';
import {  handleAPIError } from '../common/errorHandler'

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

