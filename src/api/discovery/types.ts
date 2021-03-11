// 轮播图
export type BannerListTypes = {
  banners: BannerItemTypes[]
  code: number
}
type BannerItemTypes = {
  imageUrl: string
  targetId: number
  targetType: number
  titleColor: string
  typeTitle: string
  url?: string
}

// 首页推荐歌单
export type RcmdPlaylistTypes = {
  hasTaste: boolean
  code: number
  category: number
  result: PlaylistsTypes[]
}
type PlaylistsTypes = {
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

// 独家放送
export type ExclusiveVideoTypes = {
  code: number
  result: ExclusiveVideoResult[]
  more: boolean
  offset: number
}

type ExclusiveVideoResult = {
  id: number
  url: string
  picUrl: string
  sPicUrl: string
  type: number
  copywriter: string
  name: string
  time: number
}

// 最新歌曲
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

// 推荐MV
export type RcmdMVTypes = {
  code: number
  category: number
  result: RcmdMVResult[]
}

type RcmdMVResult = {
  id: number
  type: number
  name: string
  copywriter: string
  picUrl: string
  canDislike: boolean
  duration: number
  playCount: number
  subed: boolean
  artists: RcmdMVResultArtist[]
  artistName: string
  artistId: number
  alg: string
}

type RcmdMVResultArtist = {
  id: number
  name: string
}

// 推荐电台
export type RcmdDjRadioTypes = {
  code: number
  category: number
  result: Result[]
}

type Result = {
  id: number
  type: number
  name: string
  copywriter: string
  picUrl: string
  canDislike: boolean
  trackNumberUpdateTime: null
  program: Program
  alg: string
}

type Program = {
  mainSong: MainSong
  songs: null
  dj: Dj
  blurCoverUrl: string
  radio: Radio
  subscribedCount: number
  reward: boolean
  mainTrackId: number
  serialNum: number
  listenerCount: number
  name: string
  id: number
  createTime: number
  description: string
  userId: number
  coverUrl: string
  commentThreadId: string
  channels: string[]
  titbits: null
  titbitImages: null
  pubStatus: number
  trackCount: number
  bdAuditStatus: number
  programFeeType: number
  buyed: boolean
  programDesc: null
  h5Links: any[]
  coverId: number
  adjustedPlayCount: number
  canReward: boolean
  auditStatus: number
  publish: boolean
  duration: number
  isPublish: boolean
}

type Dj = {
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
  description: string
  detailDescription: string
  avatarImgId: number
  backgroundImgId: number
  backgroundUrl: string
  authority: number
  mutual: boolean
  expertTags: string[] | null
  experts: null
  djStatus: number
  vipType: number
  remarkName: null
  authenticationTypes: number
  avatarDetail: null
  backgroundImgIdStr: string
  avatarImgIdStr: string
  anchor: boolean
  avatarImgId_str: string
  brand: string
}

type MainSong = {
  name: string
  id: number
  position: number
  alias: any[]
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
  ringtone: null | string
  crbt: null
  audition: null
  copyFrom: string
  commentThreadId: string
  rtUrl: null
  ftype: number
  rtUrls: any[]
  copyright: number
  transName: null
  sign: null
  mark: number
  originCoverType: number
  originSongSimpleData: null
  single: number
  noCopyrightRcmd: null
  rtype: number
  rurl: null
  mvid: number
  bMusic: Music
  mp3Url: null
  hMusic: Music | null
  mMusic: Music | null
  lMusic: Music
}

type Music = {
  name: null
  id: number
  size: number
  sr: number
  dfsId: number
  bitrate: number
  playTime: number
  volumeDelta: number
}

type Radio = {
  id: number
  dj: null
  name: string
  picUrl: string
  desc: string
  subCount: number
  programCount: number
  createTime: number
  categoryId: number
  category: string
  radioFeeType: number
  feeScope: number
  buyed: boolean
  videos: null
  finished: boolean
  underShelf: boolean
  purchaseCount: number
  price: number
  originalPrice: number
  discountPrice: null
  lastProgramCreateTime: number
  lastProgramName: null
  lastProgramId: number
  picId: number
  rcmdText: null | string
  hightQuality: boolean
  whiteList: boolean
  composeVideo: boolean
}
