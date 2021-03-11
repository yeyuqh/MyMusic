import request from '../axios'

/**
 * 推荐歌单
 * @param limit 默认30
 */
export function getRcmdPlaylists_(limit?: number) {
  return request.get<RcmdPlaylistsTypes>('/personalized', {
    params: {
      limit: limit,
      t: new Date().getTime()
    }
  })
}

// 首页推荐歌单
export type RcmdPlaylistsTypes = {
  hasTaste: boolean
  code: number
  category: number
  result: PlaylistResult[]
}
type PlaylistResult = {
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
