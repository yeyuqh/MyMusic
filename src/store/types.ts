import { LayoutActionTypes, LayoutMutationTypes } from './modules/layout/types'
import { UserActionTypes, UserMutationTypes } from './modules/user/types'
import { PlayerActionTypes, PlayerMutationTypes } from './modules/player/types'

export const AllATypes = { ...LayoutActionTypes, ...UserActionTypes, ...PlayerActionTypes }
export const AllMTypes = { ...LayoutMutationTypes, ...UserMutationTypes, ...PlayerMutationTypes }
