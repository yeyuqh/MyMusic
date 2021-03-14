import { MutationTree } from 'vuex'
import { PlayerMutations, PlayerMutationTypes, PlayerState, PlayModTypes } from './types'

const mutations: MutationTree<PlayerState> & PlayerMutations = {
  [PlayerMutationTypes.TogglePlayerDetail](state) {
    state.playDetail.opened = !state.playDetail.opened
  },
  [PlayerMutationTypes.HidePlayerDetail](state) {
    state.playDetail.opened = false
  },
  [PlayerMutationTypes.OpenPlayerDetail](state) {
    state.playDetail.opened = true
  },
  [PlayerMutationTypes.ChangePlayState](state, isPlaying) {
    state.isPlaying = isPlaying
  },
  [PlayerMutationTypes.AddPlayingSong](state, song) {
    state.playingSong = song
  },
  [PlayerMutationTypes.ChangePlayMod](state) {
    const newPlayMod = ++state.playMod
    if (!PlayModTypes[newPlayMod]) state.playMod = 0
    else state.playMod = newPlayMod
  },
  [PlayerMutationTypes.ChangeProgress](state, newTime) {
    state.progress = newTime
  },
  [PlayerMutationTypes.AddSongsToPlayqueue](state, songs) {
    const index = state.playqueue.findIndex((item) => item.id === songs[0].id)
    if (index !== -1 && songs.length === 1) return
    state.playqueue.push(...songs)
  },
  [PlayerMutationTypes.AddSongToHistory](state, song) {
    // 限制历史记录最大数量
    if (state.history.length > 99) state.history.splice(0, 1)
    // 使当前播放的歌曲永远处于历史记录的第一项
    const index = state.history.findIndex((item) => item.id === song.id)
    if (index !== -1) state.history.splice(index, 1)
    state.history.push(song)
  },
  [PlayerMutationTypes.ClearPlayqueue](state) {
    state.playqueue = []
    state.playingSong = null
  },
  [PlayerMutationTypes.ClearHistory](state) {
    state.history = []
  },
  [PlayerMutationTypes.RemovePlayqueueSong](state, songId) {
    const index = state.playqueue.findIndex((item) => item.id === songId)
    state.playqueue.splice(index, 1)
  },
  [PlayerMutationTypes.RemoveHistorySong](state, songId) {
    const index = state.history.findIndex((item) => item.id === songId)
    state.history.splice(index, 1)
  }
}

export default mutations
