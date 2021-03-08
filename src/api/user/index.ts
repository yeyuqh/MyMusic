import request from '@/utils/request'
import Qs from 'qs'

import { UserLoginStatusTypes, UserTypes } from './types'

export function userLogin_(phone: number, password: string) {
  return request.post<UserTypes>(
    '/login/cellphone',
    Qs.stringify({
      phone: phone,
      password: password
    })
  )
}

export function userLogout_() {
  return request.get<any>('/logout')
}

export function userLoginStatus_() {
  const timesTamp = new Date().getTime()
  return request.get<UserLoginStatusTypes>('/login/status?timestamp=' + timesTamp)
}
