import request from '../axios'
import Qs from 'qs'

import { UserLoginStatusTypes, UserTypes } from './types'

export function userLogin_(phone: number, password: string) {
  return request.post<UserTypes>(
    '/login/cellphone',
    Qs.stringify({
      phone: phone,
      password: password
    }),
    {
      params: {
        t: new Date().getTime()
      }
    }
  )
}

export function userLogout_() {
  return request.get<any>('/logout', {
    params: {
      t: new Date().getTime()
    }
  })
}

export function userLoginStatus_() {
  return request.get<UserLoginStatusTypes>('/login/status', {
    params: {
      t: new Date().getTime()
    }
  })
}
