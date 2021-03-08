import { ActionTree } from 'vuex'
import { UserActions, UserActionTypes, UserState } from './types'

import { userLogin_ } from '@/api/user'

enum LoginStatusTypes {
  LOGIN_SUCCESS = 200,
  PASSWORD_ERROR = 502
}

const actions: ActionTree<UserState, any> & UserActions = {
  async [UserActionTypes.LOGIN]({ commit, state }, { phone, password }) {
    const { data: res } = await userLogin_(phone, password).catch(() => Promise.reject('账号不存在'))
    console.log(res)

    if (res.code === LoginStatusTypes.LOGIN_SUCCESS) state.user = res.profile
    else if (res.code === LoginStatusTypes.PASSWORD_ERROR) return Promise.reject('密码错误')
  }
}

export default actions
