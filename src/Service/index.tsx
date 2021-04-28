const baseUrl = 'http://0.0.0.0:3000'
export const constructApiUrl = (endpoint: string) => {
  // return `${baseUrl}/paymentiq/${endpoint}`
  return `/paymentiq/${endpoint}`
}

export const formPost = async (url: string, body = {}, headers = {}) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers
    },
    body: new URLSearchParams(body)
};
  return fetch(url, requestOptions).then(response => response.json())
}

export const post = async (url: string, body = null, headers = {}) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body && JSON.stringify(body)
  }
  return fetch(url, requestOptions)
}

export const get = async (url: string, headers = {}) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  }
  return fetch(url, requestOptions)
}