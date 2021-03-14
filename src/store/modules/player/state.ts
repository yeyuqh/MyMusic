import { PlayerState, PlayModTypes } from './types'

const state: PlayerState = {
  playDetail: { opened: false },
  isPlaying: false,
  playingSong: null,
  progress: 0,
  playqueue: [],
  history: [],
  playMod: PlayModTypes.loop
}

export default state
