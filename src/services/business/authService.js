import axios from 'axios'
import {  handleAPIError } from '../common/errorHandler'
import { baseUrl } from '../PostAPI'

export const login = async payload => {
  const url = `${baseUrl}/auth/signin`
  try {
    const result = await axios.post(url, payload)
    if (result.status !== 200) {
      return handleAPIError(result?.data ?? '')
    }
    return result.data
  } catch (error) {
    console.error(error)
    return handleAPIError(error?.response?.data?.message)
  }
}