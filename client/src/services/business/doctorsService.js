import { API_PATH } from '../../constant/urlConstant'
import { getApi } from '../GetAPI';
import {  handleAPIError } from '../common/errorHandler'

export const fetchAllDoctors = async (payload) => {
  const url = `${API_PATH.BASE.FETCH_ALL_DOCTORS}`;
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