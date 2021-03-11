import request from '../axios'

/**
 * 首页最新歌曲推荐
 */
export function getRcmdNewSongs_() {
  return request.get<RcmdNewSongTypes>('/personalized/newsong')
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
  song: Song
}
type Song = {
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
