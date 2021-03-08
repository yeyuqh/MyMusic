import request from '@/utils/request'

import { BannerListTypes } from './types'
export { BannerListTypes }

export function getBannerList_() {
  return request.get<BannerListTypes>('/banner')
}
