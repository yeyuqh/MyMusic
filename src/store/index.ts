import { createStore, ModuleTree, useStore as VuexStore } from 'vuex'

import layout from './modules/layout'
import { LayoutModuleTypes } from './modules/layout/types'

type Store = LayoutModuleTypes

const modules: ModuleTree<any> = {
  layout
}

const store = createStore({
  modules
})

export function useStore() {
  return VuexStore() as Store
}

export default store
