import { PlayerState, PlayModTypes } from './types'

const state: PlayerState = {
  playDetail: { opened: false },
  isPlaying: false,
  playingSong: null,
  progress: 0,
  playMod: PlayModTypes.loop,
  playqueue: [],
  history: []
}

export default state
