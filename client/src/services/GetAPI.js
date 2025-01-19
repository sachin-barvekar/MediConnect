const baseUrl = process.env.REACT_APP_API_URL;

function loadingShow(hidden) {
  const loading = document.getElementById('loading');
  if (loading) loading.style.display = hidden;
}

// Reusable fetch wrapper
async function apiRequest({ type, method = 'GET', token, body = null, param = '' }) {
  loadingShow('block');

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (token) headers.authorization = token;

  try {
    const response = await fetch(baseUrl + type + param, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (response.status === 401) {
      loadingShow('none');
      window.location.replace('/');
      return;
    }

    const data = await response.json();
    loadingShow('none');
    return data;
  } catch (error) {
    loadingShow('none');
    throw new Error('An error occurred while processing the request.');
  }
}

// GET request without parameters
export function getApi(type, token) {
  return apiRequest({ type, method: 'GET' });
}

// GET request with parameters
export function getApiParam(type, param, token) {
  return apiRequest({ type, method: 'GET', param, token });
}

// GET request with body (should be POST or PUT in real use cases)
export function getApiBody(type, userInput, token) {
  return apiRequest({ type, method: 'POST', body: userInput, token });
}

// GET request for downloads (specific headers)
export function getApiDown(type, token) {
  return apiRequest({ type, method: 'GET', token });
}
