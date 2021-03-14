import { createStore, ModuleTree, useStore as VuexStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import layout from './modules/layout'
import { LayoutModuleTypes, LayoutState } from './modules/layout/types'

import user from './modules/user'
import { UserModuleTypes, UserState } from './modules/user/types'

import player from './modules/player'
import { PlayerModuleTypes, PlayerState } from './modules/player/types'

type Store = LayoutModuleTypes & UserModuleTypes & PlayerModuleTypes
type StoreModuleState = {
  layout: LayoutState
  user: UserState
  player: PlayerState
}

const modules: ModuleTree<any> = {
  layout,
  user,
  player
}

// Vuex 状态持久化
const PRESERVE = createPersistedState({
  key: 'MY_MUSIC',
  storage: window.localStorage,
  reducer: (state: StoreModuleState) => ({
    layout: {
      theme: state.layout.theme
    },
    player: {
      playingSong: state.player.playingSong,
      playqueue: state.player.playqueue,
      history: state.player.history
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
