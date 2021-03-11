import request from '../axios'

/**
 * 首页轮播图
 */
export function getBanners_() {
  return request.get<BannerListTypes>('/banner')
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
