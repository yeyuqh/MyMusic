import { UserTypes } from '@/api/user/types'
import { Store as VuexStore, ActionContext, CommitOptions, DispatchOptions } from 'vuex'

//* UserStateTypes
export type UserState = {
  user: UserTypes['profile'] | null
}

//* UserGetterTypes
export type UserGetters<S = UserState> = {
  user(state: S): UserTypes['profile'] | null
}

//* UserMutationTypes
export enum UserMutationTypes {
  SaveUserInfo = 'SAVE_USER_INFO'
}

export type UserMutations<S = UserState> = {
  [UserMutationTypes.SaveUserInfo](state: S, payload: UserTypes['profile'] | null): void
}

//* UserActionTypes
export enum UserActionTypes {
  LOGIN = 'LOGIN'
}

export type UserActions = {
  [UserActionTypes.LOGIN](context: UserActionsAugments, payload: { phone: number; password: string }): Promise<any>
}

type UserActionsAugments = {
  commit<K extends keyof UserMutations>(key: K, payload: Parameters<UserMutations[K]>[1]): ReturnType<UserMutations[K]>
} & Omit<ActionContext<UserState, any>, 'commit'>

//* UserModuleTypes
export type UserModuleTypes = Omit<VuexStore<UserState>, 'getters' | 'commit' | 'dispatch'> & {
  getters: {
    [K in keyof UserGetters]: ReturnType<UserGetters[K]>
  }
} & {
  commit<K extends keyof UserMutations, P extends Parameters<UserMutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<UserMutations[K]>
} & {
  dispatch<K extends keyof UserActions, P extends Parameters<UserActions[K]>[1]>(
    key: K,
    payload?: P,
    options?: DispatchOptions
  ): ReturnType<UserActions[K]>
}
