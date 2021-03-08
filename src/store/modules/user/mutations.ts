import { MutationTree } from 'vuex'
import { UserMutations, UserMutationTypes, UserState } from './types'

const mutations: MutationTree<UserState> & UserMutations = {
  [UserMutationTypes.SaveUserInfo](state, userInfo) {
    state.user = userInfo
  }
}

export default mutations
