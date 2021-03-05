import { GetterTree } from 'vuex'
import { LayoutGetters, LayoutState } from './types'

const getters: GetterTree<LayoutState, any> & LayoutGetters = {
  pageSize: (state) => state.pageSize,
  sidebar: (state) => state.sidebar,
  theme: (state) => state.theme
}

export default getters
