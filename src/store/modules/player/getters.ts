import { GetterTree } from 'vuex'
import { PlayerGetters, PlayerState, PlayModTypes } from './types'

const getters: GetterTree<PlayerState, any> & PlayerGetters = {
  playerDetail: (state) => state.playDetail,
  isPlaying: (state) => state.isPlaying,
  playingSong: (state) => state.playingSong,
  progress: (state) => state.progress,
  playqueue: (state) => state.playqueue,
  history: (state) => state.history,
  playmod: (state) => state.playMod,

  playingSongIndex: (state) => {
    return state.playqueue.findIndex((item) => {
      if (state.playingSong) return item.id === state.playingSong.id
      else return -1
    })
  },

  nextSong: (state) => {
    function getSequenceNextIndex() {
      let nextIndex = getters.playingSongIndex(state) + 1
      if (nextIndex > state.playqueue.length - 1) nextIndex = 0
      return nextIndex
    }

    function getShuffleNextIndex() {
      let nextIndex = Math.round(Math.random() * (state.playqueue.length - 1))
      if (nextIndex === getters.playingSongIndex(state)) nextIndex = getShuffleNextIndex()
      return nextIndex
    }

    const nextStartMap = {
      [PlayModTypes.loop]: getSequenceNextIndex,
      [PlayModTypes.repeat]: getSequenceNextIndex,
      [PlayModTypes.shuffle]: getShuffleNextIndex
    }
    const index = nextStartMap[state.playMod]()
    return state.playqueue[index]
  },

  prevSong: (state) => {
    function getSequenceNextIndex() {
      let nextIndex = getters.playingSongIndex(state) - 1
      if (nextIndex < 0) nextIndex = state.playqueue.length - 1
      return nextIndex
    }

    function getShuffleNextIndex() {
      let nextIndex = Math.round(Math.random() * (state.playqueue.length - 1))
      if (nextIndex === getters.playingSongIndex(state)) nextIndex = getShuffleNextIndex()
      return nextIndex
    }

    const nextStartMap = {
      [PlayModTypes.loop]: getSequenceNextIndex,
      [PlayModTypes.repeat]: getSequenceNextIndex,
      [PlayModTypes.shuffle]: getShuffleNextIndex
    }
    const index = nextStartMap[state.playMod]()
    return state.playqueue[index]
  }
}

export default getters
