import { Module } from 'vuex'
import { UserState } from './types'

import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const user: Module<UserState, any> = {
  state,
  getters,
  actions,
  mutations
}

export default user
