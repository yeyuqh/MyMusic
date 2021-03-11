export type UserTypes = LoginSuccessTypes & LoginErrorTypes

type LoginSuccessTypes = {
  loginType: number
  code: number
  account: Account
  token: string
  profile: Profile
  bindings: Bindings[]
  cookie: string
}

type LoginErrorTypes = {
  code: number
  message: string
  msg: string
}

type Bindings = {
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

type Profile = {
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

type Account = {
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

export type UserLoginStatusTypes = {
  data: UserLoginData
}

type UserLoginData = {
  code: number
  account: Account | null
  profile: Profile | null
}
