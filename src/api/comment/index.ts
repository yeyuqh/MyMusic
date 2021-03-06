import request from '../axios'

/**
 * 获取歌单评论
 * @param id 歌单ID
 */
export function getPlaylistComment_(id: number | string, pageSize: number, limit: number) {
  return request.get<CommentTypes>('/comment/playlist', {
    params: {
      id: id,
      limit: limit,
      offset: (pageSize - 1) * limit
    }
  })
}

/**
 * 获取歌曲评论
 * @param id 歌曲ID
 */
export function getSongComment_(id: number | string, pageSize: number, limit: number) {
  return request.get<CommentTypes>('/comment/music', {
    params: {
      id: id,
      limit: limit,
      offset: (pageSize - 1) * limit
    }
  })
}

export type CommentTypes = {
  isMusician: boolean
  userId: number
  topComments: any[]
  moreHot: boolean
  hotComments: CommentDetailTypes[] | undefined
  commentBanner?: any
  code: number
  comments: CommentDetailTypes[]
  total: number
  more: boolean
}
type CommentDetailTypes = {
  user: UserTypes
  beReplied: BeRepliedTypes[] | []
  pendantData?: any
  showFloorComment?: any
  status: number
  commentId: number
  content: string
  time: number
  likedCount: number
  expressionUrl?: any
  commentLocationType: number
  parentCommentId: number
  repliedMark?: any
  liked: boolean
}
type BeRepliedTypes = {
  user: UserTypes
  beRepliedCommentId: number
  content: string | null
  status: number
  expressionUrl?: any
}
type UserTypes = {
  locationInfo?: any
  liveInfo?: any
  anonym: number
  userType: number
  avatarDetail?: AvatarDetailTypes
  authStatus: number
  expertTags?: any
  experts?: any
  vipType: number
  nickname: string
  avatarUrl: string
  userId: number
  remarkName?: any
  vipRights?: VipRightTypes
}
type VipRightTypes = {
  associator?: AssociatorTypes
  musicPackage?: any
  redVipAnnualCount: number
  redVipLevel: number
}
type AssociatorTypes = {
  vipCode: number
  rights: boolean
}
type AvatarDetailTypes = {
  userType: number
  identityLevel: number
  identityIconUrl: string
}
