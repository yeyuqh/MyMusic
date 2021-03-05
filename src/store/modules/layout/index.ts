import { Module } from 'vuex'
import { LayoutState } from './types'

import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const layout: Module<LayoutState, any> = {
  state,
  getters,
  actions,
  mutations
}

export default layout
