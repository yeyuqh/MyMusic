import { createStore, ModuleTree, useStore as VuexStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import layout from './modules/layout'
import { LayoutModuleTypes, LayoutState } from './modules/layout/types'

import user from './modules/user'
import { UserModuleTypes, UserState } from './modules/user/types'

type Store = LayoutModuleTypes & UserModuleTypes
type StoreModuleState = {
  layout: LayoutState
  user: UserState
}

const modules: ModuleTree<any> = {
  layout,
  user
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
