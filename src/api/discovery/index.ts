import request from '@/utils/request'

import {
  BannerListTypes,
  ExclusiveVideoTypes,
  RcmdDjRadioTypes,
  RcmdMVTypes,
  RcmdNewSongTypes,
  RcmdPlaylistTypes
} from './types'
export { BannerListTypes, ExclusiveVideoTypes, RcmdDjRadioTypes, RcmdMVTypes, RcmdNewSongTypes, RcmdPlaylistTypes }

export function getBanners_() {
  return request.get<BannerListTypes>('/banner')
}

/**
 * 推荐歌单
 * @param limit 获取的推荐歌单数量 默认30
 */
export function getRcmdPlaylists_(limit?: number) {
  return request.get<RcmdPlaylistTypes>('/personalized', {
    params: {
      limit: limit,
      t: new Date().getTime()
    }
  })
}

/**
 * 独家放送
 * @param limit 获取的推荐歌单数量 默认30
 */
export function getRcmdNewSongs_() {
  return request.get<RcmdNewSongTypes>('/personalized/newsong', {})
}

/**
 * 独家放送
 * @param limit 获取的推荐歌单数量 默认30
 */
export function getRcmdExclusiveVideos_(limit?: number) {
  return request.get<ExclusiveVideoTypes>('/personalized/privatecontent/list', {
    params: {
      limit: limit
    }
  })
}

/**
 * 推荐MV
 */
export function getRcmdMVs_() {
  return request.get<RcmdMVTypes>('/personalized/mv')
}

/**
 * 推荐MV
 */
export function getRcmdDjRadios_() {
  return request.get<RcmdDjRadioTypes>('/personalized/djprogram')
}
