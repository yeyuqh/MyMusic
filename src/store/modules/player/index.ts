import { Module } from 'vuex'
import { PlayerState } from './types'

import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const player: Module<PlayerState, any> = {
  state,
  getters,
  actions,
  mutations
}

export default player
