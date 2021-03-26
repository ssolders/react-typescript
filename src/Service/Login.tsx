export interface ISigninPayload {
  j_username: string
  j_password: string
}

export interface IRole {
  role: string,
  version: number
}

export interface IUser {
  accountNonExpired: boolean
  accountNonLocked: boolean
  allowedMerchantIds: Array<number>
  authorities: Array<IRole>
  credentialsNonExpired: boolean
  email: string
  enabled: boolean
  id: number
  lastIpAddress: string
  lastLogin: string
  loginAttempts: number
  merchantId: number
  mobile: string
  name: string
  oauthUser: boolean
  passwordNonExpired: boolean
  preferences: string
  username: string
  version: number
}

export interface ISignInResponse {
  targetUrl: string
  user: IUser
}

function serialize (data) {
	let obj = {}
	for (let [key, value] of data) {
		if (obj[key] !== undefined) {
			if (!Array.isArray(obj[key])) {
				obj[key] = [obj[key]]
			}
			obj[key].push(value)
		} else {
			obj[key] = value
		}
	}
	return obj;
}

// const baseUrl = 'http://0.0.0.0:3000'
const constructApiUrl = (endpoint: string) => {
  return `/${endpoint}`
}

const formPost = async (url: string, body = {}, headers = {}) => {
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

const post = async (url: string, body = null, headers = {}) => {
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

export const signIn = async (payload: ISigninPayload): Promise<ISignInResponse | null> => {
  try {
    const { success, targetUrl, user } = await formPost(constructApiUrl('paymentiq/j_spring_security_check'), payload)
    if (success) {
      return {
        targetUrl,
        user
      }
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export const signOut = async (): Promise<boolean> => {
  try {
    const data = await post(constructApiUrl('paymentiq/logout'))
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}