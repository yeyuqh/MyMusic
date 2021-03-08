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
