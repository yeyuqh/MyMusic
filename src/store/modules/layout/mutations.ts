import { MutationTree } from 'vuex'
import { LayoutMutations, LayoutMutationTypes, LayoutState } from './types'

const mutations: MutationTree<LayoutState> & LayoutMutations = {
  [LayoutMutationTypes.TogglePageSize](state, size) {
    state.pageSize = size
  },

  [LayoutMutationTypes.ToggleSidebar](state) {
    state.sidebar.opened = !state.sidebar.opened
  },
  [LayoutMutationTypes.HideSidebar](state) {
    state.sidebar.opened = false
  },
  [LayoutMutationTypes.OpenSidebar](state) {
    state.sidebar.opened = true
  }
}

export default mutations
