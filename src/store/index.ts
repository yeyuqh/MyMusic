import { createStore, ModuleTree, useStore as VuexStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import layout from './modules/layout'
import { LayoutModuleTypes, LayoutState } from './modules/layout/types'

type Store = LayoutModuleTypes
type StoreModuleState = {
  layout: LayoutState
}

const modules: ModuleTree<any> = {
  layout
}

// Vuex 状态持久化
const PRESERVE = createPersistedState({
  key: 'MY_MUSIC',
  storage: window.localStorage,
  reducer: (state: StoreModuleState) => ({
    layout: {
      theme: state.layout.theme
    }
  })
})

const store = createStore({
  plugins: [PRESERVE],
  modules
})

export function useStore() {
  return VuexStore() as Store
}

export default store
