import { ActionTree } from 'vuex'
import { UserActions, UserActionTypes, UserState } from './types'
import { AllMType } from '@/store/types'

import { userLoginStatus_, userLogin_, userLogout_ } from '@/api/user'

enum LoginStatusTypes {
  LOGIN_SUCCESS = 200,
  PASSWORD_ERROR = 502
}

const actions: ActionTree<UserState, any> & UserActions = {
  async [UserActionTypes.LOGIN]({ commit }, { phone, password }) {
    try {
      const { data: res } = await userLogin_(phone, password)
      if (res.code === LoginStatusTypes.LOGIN_SUCCESS) {
        commit(AllMType.SaveUserInfo, res.profile)
      } else if (res.code === LoginStatusTypes.PASSWORD_ERROR) {
        return Promise.reject('密码错误')
      }
    } catch (err) {
      console.log(err)
      return Promise.reject('账号不存在')
    }
  },
  async [UserActionTypes.LOGOUT]({ commit }) {
    await userLogout_()
    commit(AllMType.SaveUserInfo, null)
  },
  async [UserActionTypes.GET_LOGIN_STATUS]({ commit }) {
    const { data: res } = await userLoginStatus_()
    if (res.data.profile) commit(AllMType.SaveUserInfo, res.data.profile)
  }
}

export default actions
