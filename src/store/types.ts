// AllActionTypes
import { UserActionTypes } from './modules/user/types'

export const AllAType = { ...UserActionTypes }

// AllMutationTypes
import { LayoutMutationTypes } from './modules/layout/types'
import { UserMutationTypes } from './modules/user/types'

export const AllMType = { ...LayoutMutationTypes, ...UserMutationTypes }
