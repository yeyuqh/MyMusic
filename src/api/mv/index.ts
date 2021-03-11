import request from '../axios'

/**
 * 独家放送
 * @param limit 默认30
 */
export function getExclusiveVideos_(limit?: number) {
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

//* 独家放送
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

//* 推荐MV
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
  artists: MVArtist[]
  artistName: string
  artistId: number
}

type MVArtist = {
  id: number
  name: string
  alias: string[] | null
  transNames: string[] | null
}
