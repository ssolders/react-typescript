import { get, formPost, post, constructApiUrl } from './index'

export type IMetaDataResponse = any

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

export const getMetaData = async (merchantId?: string): Promise<IMetaDataResponse | null> => {
  try {
    const urlParams = merchantId ? `/${merchantId}` : ''
    return await get(constructApiUrl(`/backoffice/api/metadata${urlParams}`)).then(function(response) {
      if (response.status === 401) {
        const authenticate: string | null = response.headers.get('www-authenticate')
        if (authenticate) {
          const oAuthPath = authenticate.split('authorization_uri="')[1].replace(/['"]+/g, '') // split to get the path, and strip away trailing comma
          window.location.href = `/${oAuthPath}`
        }
        return null
      } else {
        return response.json()
      }
    }).then(function(data) {
      return data
    })
  } catch (error) {
    console.error(error)
  }
}

export const signIn = async (payload: ISigninPayload): Promise<ISignInResponse | null> => {
  try {
    const { success, targetUrl, user } = await formPost(constructApiUrl('j_spring_security_check'), payload)
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
    const data = await post(constructApiUrl('logout'))
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}