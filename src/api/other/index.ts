import request from '../axios'

/**
 * 首页轮播图
 */
export function getBanners_() {
  return request.get<BannerListTypes>('/banner')
}

/**
 * 搜索建议
 * @param keywords
 */
export function getSuggest_(keywords: string) {
  return request.get<SuggestTypes>('/search/suggest', {
    params: {
      keywords: keywords
    }
  })
}

/**
 * 搜索结果
 * @param keywords
 * @param limit
 * @param offset
 * @param type 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 */
export function getSearchResult_(keywords: string, limit?: number, offset?: number, type?: number) {
  return request.get<SearchResultTypes>('/cloudsearch', {
    params: {
      keywords: keywords,
      limit: limit,
      offset: offset
    }
  })
}

// 轮播图
export type BannerListTypes = {
  banners: Banner[]
  code: number
}
type Banner = {
  imageUrl: string
  targetId: number
  targetType: number
  titleColor: string
  typeTitle: string
  url?: string
}

// 搜索建议
export type SuggestTypes = {
  result: Result
  code: number
}
type Result = {
  albums: AlbumElement[]
  songs: Song[]
  order: string[]
}
type AlbumElement = {
  id: number
  name: string
  artist: Artist
  publishTime: number
  size: number
  copyrightId: number
  status: number
  picId: number
  mark: number
}
type Artist = {
  id: number
  name: string
  picUrl: null | string
  alias: string[]
  albumSize: number
  picId: number
  img1v1Url: string
  img1v1: number
  alia?: string[]
  trans: null
}
type Song = {
  id: number
  name: string
  artists: Artist[]
  album: SongAlbum
  duration: number
  copyrightId: number
  status: number
  alias: string[]
  rtype: number
  ftype: number
  mvid: number
  fee: number
  rUrl: null
  mark: number
}
type SongAlbum = {
  id: number
  name: string
  artist: Artist
  publishTime: number
  size: number
  copyrightId: number
  status: number
  picId: number
  alia?: string[]
  mark: number
}

export type SearchResultTypes = {
  result: SearchResultSongTypes
  code: number
}

type SearchResultSongTypes = {
  songs: SongElement[]
  songCount: number
}

export type SongElement = {
  name: string
  id: number
  pst: number
  t: number
  ar: Ar[]
  alia: any[]
  pop: number
  st: number
  rt: null | string
  fee: number
  v: number
  crbt: null
  cf: string
  al: Al
  dt: number
  a: null
  cd: string
  no: number
  rtUrl: null
  ftype: number
  rtUrls: any[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  single: number
  noCopyrightRcmd: null
  rtype: number
  rurl: null
  mst: number
  cp: number
  mv: number
  publishTime: number
}

export type Al = {
  id: number
  name: string
  picUrl: string
  tns: any[]
  pic_str: string
  pic: number
}

export type Ar = {
  id: number
  name: string
  tns: any[]
  alias: any[]
}

export type AlbumMeta = {
  id: number
  name: string
}
