const baseUrl = process.env.REACT_APP_API_URL;

async function apiCall(type, method, data = null, token = null, isFormData = false) {
  const url = `${baseUrl}${type}`;
  const headers = isFormData
    ? {}
    : {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // ...(token && { Authorization: token }),
      };

  const options = {
    method,
    headers,
    ...(data && { body: isFormData ? data : JSON.stringify(data) }),
  };

  try {
    const response = await fetch(url, options);

    if (response.status === 401) {
      // Redirect to login or handle unauthorized errors
      window.location.replace('/');
      return;
    }

    // Return JSON response or throw error
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }
    return result;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}

// Specific API wrappers
export const postApi = (type, data, token) => apiCall(type, 'POST', data, token);
export const putApi = (type, data, token) => apiCall(type, 'PUT', data, token);
export const deleteApi = (type, token, data = null) =>
  apiCall(type, 'DELETE', data, token);
export const postApiFormData = (type, data, image, token) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('data', JSON.stringify(data));
  return apiCall(type, 'POST', formData, token, true);
};

// Utility function for formatting dates
export const formatDate = (date) => {
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year} ${time}`;
};

