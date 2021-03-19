import request from '../axios'

/**
 * 首页最新歌曲推荐
 */
export function getRcmdNewSongs_() {
  return request.get<RcmdNewSongTypes>('/personalized/newsong')
}

/**
 * @param id 歌曲 ID | 多首歌曲的 ID 逗号隔开
 */
export function getSongsDetail_(ids: number | string) {
  return request.get<SongsDetailTypes>('/song/detail', {
    params: {
      ids: ids
    }
  })
}

/**
 * @param id 歌曲ID
 */
export function getSongUrl_(id: number) {
  return request.get<SongUrlTypes>('/song/url', {
    params: {
      id: id
    }
  })
}

/**
 * @param id 歌曲ID
 */
export function getSongLyric_(id: number) {
  return request.get<LyricTypes>('/lyric', {
    params: {
      id: id
    }
  })
}

// 首页最新歌曲推荐
export type RcmdNewSongTypes = {
  code: number
  category: number
  result: RcmdNewSongResult[]
}
type RcmdNewSongResult = {
  id: number
  type: number
  name: string
  picUrl: string
  canDislike: boolean
  song: RcmdNewSong
}
type RcmdNewSong = {
  name: string
  id: number
  position: number
  alias: string[]
  status: number
  fee: number
  copyrightId: number
  disc: string
  no: number
  artists: Artist[]
  album: Album
  starred: boolean
  popularity: number
  score: number
  starredNum: number
  duration: number
  playedNum: number
  dayPlays: number
  hearTime: number
  ringtone: string
  copyFrom: string
  commentThreadId: string
  ftype: number
  copyright: number
  mark: number
  originCoverType: number
  single: number
  rtype: number
  mvid: number
  exclusive: boolean
  privilege: Privilege
}
type Album = {
  name: string
  id: number
  size: number
  picId: number
  blurPicUrl: string
  companyId: number
  pic: number
  picUrl: string
  publishTime: number
  description: string
  tags: string
  company: string
  briefDesc: string
  artist: Artist
  alias: string[]
  status: number
  copyrightId: number
  commentThreadId: string
  artists: Artist[]
  onSale: boolean
  mark: number
  picId_str: string
}
type Artist = {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  trans: string
  musicSize: number
  topicPerson: number
}
type Privilege = {
  id: number
  fee: number
  payed: number
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  toast: boolean
  flag: number
  preSell: boolean
  playMaxbr: number
  downloadMaxbr: number
}

//* 歌单歌曲列表详情
export type SongsDetailTypes = {
  songs: Song[]
  privileges: Privilege[]
  code: number
}
export type Song = {
  name: string
  id: number
  pst: number
  t: number
  ar: Artist[]
  alia: string[]
  pop: number
  st: number
  fee: number
  v: number
  cf: string
  al: Album
  dt: number
  cd: string
  no: number
  ftype: number
  djId: number
  copyright: number
  mark: number
  single: number
  mv: number
  rtype: number
  mst: number
  cp: number
  publishTime: number
}

// 歌曲播放连接
export type SongUrlTypes = {
  data: SongUrlDataTypes[]
  code: number
}
type SongUrlDataTypes = {
  id: number
  url: string
  br: number
  size: number
  md5: string
  code: number
  expi: number
  type: string
  gain: number
  fee: number
  payed: number
  flag: number
  canExtend: boolean
  freeTrialInfo: FreeTrialInfoTypes | null
  level: string
  encodeType: string | null
  freeTrialPrivilege: FreeTrialPrivilegeTypes
  urlSource: number
}
type FreeTrialInfoTypes = {
  start: number
  end: number
}
type FreeTrialPrivilegeTypes = {
  resConsumable: boolean
  userConsumable: boolean
}

// 歌词
export type LyricTypes = {
  lrc?: LrcTypes
  tlyric?: TlyricTypes
  nolyric?: boolean
  uncollected?: boolean
  code: number
}
type LrcTypes = {
  lyric: string
}
type TlyricTypes = {
  lyric: string
}

// 相似歌曲推荐
export type SimiSongTypes = {
  songs: SimiSongInfoTypes[]
  code: number
}
type SimiSongInfoTypes = {
  alias: string[]
  artists: ArtistTypes[]
  album: AlbumTypes
  name: string
  id: number
}
type AlbumTypes = {
  id: number
  name: string
  picUrl: string
}
type ArtistTypes = {
  id: number
  name: string
}
