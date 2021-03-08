import { GetterTree } from 'vuex'
import { UserGetters, UserState } from './types'

const getters: GetterTree<UserState, any> & UserGetters = {
  user: (state) => state.user
}

export default getters
