import request from '../axios'

/**
 * 首页推荐歌单
 * @param limit 默认 30
 */
export function getRcmdPlaylists_(limit?: number) {
  return request.get<RcmdPlaylistsTypes>('/personalized', {
    params: {
      limit: limit,
      t: new Date().getTime()
    }
  })
}

/**
 * 歌单分类
 */
export function getPlaylistCatlist_() {
  return request.get<PlaylistCatlistTypes>('/playlist/catlist')
}

/**
 * 歌单
 * @param cat Tag, 如 "华语"、"古风"、"欧美"、"流行", 默认为 "全部"
 * @param offset 偏移数量, 用于分页, 如:(评论页数 - 1) * 50, 其中 50 为 limit 的值
 * @param limit 默认 50
 */
export function getPlaylists_(cat: string, offset: number, limit?: number) {
  return request.get<PlaylistTypes>('/top/playlist', {
    params: {
      cat: cat,
      offset: offset,
      limit: limit
    }
  })
}

/**
 * 精品歌单
 * @param cat Tag, 如 "华语"、"古风"、"欧美"、"流行", 默认为 "全部"
 * @param before 分页参数, 取上一页最后一个歌单的 updateTime 获取下一页数据
 * @param limit 默认 30
 */
export function getHQPlaylists_(cat: string, limit?: number, before?: number) {
  return request.get<HQPlaylistTypes>('/top/playlist/highquality', {
    params: {
      cat: cat,
      limit: limit,
      before: before
    }
  })
}

/**
 * @param id 歌单 ID
 */
export function getPlaylistDetail_(id: number) {
  return request.get<PlaylistDetailTypes>('/playlist/detail', {
    params: {
      id: id
    }
  })
}

//* 首页推荐歌单
export type RcmdPlaylistsTypes = {
  hasTaste: boolean
  code: number
  category: number
  result: RcmdPlaylistResult[]
}
type RcmdPlaylistResult = {
  id: number
  type: number
  name: string
  copywriter: string
  picUrl: string
  canDislike: boolean
  trackNumberUpdateTime: number
  playCount: number
  trackCount: number
  highQuality: boolean
  alg: string
}

//* 歌单分类
export type PlaylistCatlistTypes = {
  code: number
  all: AllPlaylist
  sub: AllPlaylist[]
  categories: { [key: string]: string }
}
export type AllPlaylist = {
  name: string
  resourceCount: number
  imgId: number
  imgUrl: null
  type: number
  category: number
  resourceType: number
  hot: boolean
  activity: boolean
}

//* 歌单 (网友精选碟)
export type PlaylistTypes = {
  playlists: Playlist[]
  total: number
  code: number
  more: boolean
  cat: string
}

//* 精品歌单
export type HQPlaylistTypes = {
  playlists: Playlist[]
  code: number
  more: boolean
  lasttime: number
  total: number
}

//* 歌单详情
export type PlaylistDetailTypes = {
  code: number
  playlist: Playlist
}

type Playlist = {
  name: string
  id: number
  trackIds: TrackId[]
  trackNumberUpdateTime: number
  status: number
  userId: number
  createTime: number
  updateTime: number
  subscribedCount: number
  trackCount: number
  copywriter?: string
  cloudTrackCount: number
  coverImgUrl: string
  coverImgId: number
  description: string
  tags: string[]
  playCount: number
  trackUpdateTime: number
  specialType: number
  totalDuration: number
  creator: Creator
  tracks: null
  subscribers: Creator[]
  subscribed: null
  commentThreadId: string
  newImported: boolean
  adType: number
  highQuality: boolean
  privacy: number
  ordered: boolean
  anonimous: boolean
  coverStatus: number
  recommendInfo: null
  shareCount: number
  coverImgId_str: string
  commentCount: number
}
type Creator = {
  defaultAvatar: boolean
  province: number
  authStatus: number
  followed: boolean
  avatarUrl: string
  accountStatus: number
  gender: number
  city: number
  birthday: number
  userId: number
  userType: number
  nickname: string
  signature: string
  avatarImgId: number
  backgroundImgId: number
  backgroundUrl: null | string
  authority: number
  mutual: boolean
  expertTags: string[] | null
  djStatus: number
  vipType: number
  remarkName: null
  authenticationTypes: number
  avatarDetail: AvatarDetail | null
  anchor: boolean
  avatarImgIdStr: string
  backgroundImgIdStr: string
  avatarImgId_str?: string
}
type AvatarDetail = {
  userType: number
  identityLevel: number
  identityIconUrl: string
}
type TrackId = {
  id: number
  v: number
  at: number
}
