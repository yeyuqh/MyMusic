export type UserTypes = LoginSuccessTypes & LoginErrorTypes

export type LoginSuccessTypes = {
  loginType: number
  code: number
  account: AccountTypes
  token: string
  profile: ProfileTypes
  bindings: BindingTypes[]
  cookie: string
}

export type LoginErrorTypes = {
  code: number
  message: string
  msg: string
}

type BindingTypes = {
  userId: number
  url: string
  expiresIn: number
  tokenJsonStr: string
  refreshTime: number
  expired: boolean
  bindingTime: number
  id: number
  type: number
}

type ProfileTypes = {
  avatarImgIdStr: string
  backgroundImgIdStr: string
  userId: number
  userType: number
  defaultAvatar: boolean
  accountStatus: number
  vipType: number
  gender: number
  nickname: string
  birthday: number
  avatarImgId: number
  city: number
  backgroundImgId: number
  avatarUrl: string
  province: number
  djStatus: number
  expertTags?: any
  authStatus: number
  mutual: boolean
  remarkName?: any
  detailDescription: string
  followed: boolean
  backgroundUrl: string
  description: string
  signature: string
  authority: number
  avatarImgId_str: string
  followeds: number
  follows: number
  eventCount: number
  avatarDetail?: any
  playlistCount: number
  playlistBeSubscribedCount: number
}

type AccountTypes = {
  id: number
  userName: string
  type: number
  status: number
  whitelistAuthority: number
  createTime: number
  salt: string
  tokenVersion: number
  ban: number
  baoyueVersion: number
  donateVersion: number
  vipType: number
  viptypeVersion: number
  anonimousUser: boolean
}

export interface UserLoginStatusTypes {
  data: Data
}

interface Data {
  code: number
  account: AccountTypes | null
  profile: ProfileTypes | null
}
