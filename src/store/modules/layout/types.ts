import { Store as VuexStore, ActionContext, CommitOptions, DispatchOptions } from 'vuex'

//* LayoutStateTypes
export type LayoutState = {
  pageSize: string
  sidebar: {
    opened: boolean
  }
}

//* LayoutGetterTypes
export type LayoutGetters<S = LayoutState> = {
  pageSize(state: S): string
  sidebar(state: S): LayoutState['sidebar']
}

//* LayoutMutationTypes
export enum LayoutMutationTypes {
  TogglePageSize = 'TOGGLE_PAGE_SIZE',

  ToggleSidebar = 'TOGGLE_SIDEBAR',
  HideSidebar = 'HIDE_SIDEBAR',
  OpenSidebar = 'OPEN_SIDEBAR'
}

export type LayoutMutations<S = LayoutState> = {
  [LayoutMutationTypes.TogglePageSize](state: S, payload: string): void

  [LayoutMutationTypes.ToggleSidebar](state: S): void
  [LayoutMutationTypes.HideSidebar](state: S): void
  [LayoutMutationTypes.OpenSidebar](state: S): void
}

//* LayoutActionTypes
type LayoutActionsAugments = {
  commit<K extends keyof LayoutMutations>(
    key: K,
    payload: Parameters<LayoutMutations[K]>[1]
  ): ReturnType<LayoutMutations[K]>
} & Omit<ActionContext<LayoutState, any>, 'commit'>

export enum LayoutActionTypes {}

export type LayoutActions = {}

//* LayoutModuleTypes
export type LayoutModuleTypes = Omit<VuexStore<LayoutState>, 'getters' | 'commit' | 'dispatch'> & {
  getters: {
    [K in keyof LayoutGetters]: ReturnType<LayoutGetters[K]>
  }
} & {
  commit<K extends keyof LayoutMutations, P extends Parameters<LayoutMutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<LayoutMutations[K]>
} & {
  dispatch<K extends keyof LayoutActions, P extends Parameters<LayoutActions[K]>[1]>(
    key: K,
    payload?: P,
    options?: DispatchOptions
  ): ReturnType<LayoutActions[K]>
}
