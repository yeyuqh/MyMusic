import request from '../axios'

/**
 * 首页轮播图
 */
export function getBanners_() {
  return request.get<BannerListTypes>('/banner')
}

// 搜索建议
export function getSuggest_(keywords: string) {
  return request.get<SuggestTypes>('/search/suggest', {
    params: {
      keywords: keywords
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
