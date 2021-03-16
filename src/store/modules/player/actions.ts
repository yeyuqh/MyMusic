import { ActionTree } from 'vuex'

import { PlayerActions, PlayerActionTypes, PlayerMutationTypes, PlayerState, SongInfoTypes } from './types'

import { getSongsDetail_ } from '@/api/song'

const actions: ActionTree<PlayerState, any> & PlayerActions = {
  async [PlayerActionTypes.ADD_PLAYING_SONG]({ commit, state }, id) {
    if (typeof id === 'number') {
      // 判断准备播放的歌曲是否已存在于「播放队列」或「历史记录」中
      const oldSongList = [...state.playqueue, ...state.history]
      for (let i = oldSongList.length - 1; i >= 0; i--) {
        if (oldSongList[i].id === id) {
          commit(PlayerMutationTypes.AddPlayingSong, oldSongList[i])
          return
        }
      }
    }

    const { data: res } = await getSongsDetail_(id)
    const privs = res.privileges // 歌曲列表中对应歌曲的播放权限
    const songs = res.songs

    const songList: SongInfoTypes[] = []
    let isPlaying = false

    for (let i = 0, len = privs.length; i < len; i++) {
      if (len === 1 && privs[i].fee === 4) {
        alert('付费歌曲')
        return
      } else if (len === 1 && privs[i].fee === 1) {
        alert('VIP歌曲')
        return
      } else if (len === 1 && privs[i].st === 200) {
        alert('暂时没有版权')
        return
      } else {
        if (privs[i].fee === 1 || privs[i].fee === 4 || privs[i].st === 200) continue
        state.playqueue.length = 0 // 清空播放队列
        // eslint-disable-next-line object-curly-spacing
        const songInfo = { album: {} } as SongInfoTypes

        songInfo.id = songs[i].id
        songInfo.name = songs[i].name
        songInfo.alia = songs[i].alia[0]
        songInfo.duration = songs[i].dt
        songInfo.artists = songs[i].ar
        songInfo.album.id = songs[i].al.id
        songInfo.album.name = songs[i].al.name
        songInfo.album.picUrl = songs[i].al.picUrl

        songList.push(songInfo)

        if (!isPlaying) {
          commit(PlayerMutationTypes.AddPlayingSong, songInfo)
          isPlaying = true
        }
      }
    }
    commit(PlayerMutationTypes.AddSongsToPlayqueue, songList)
  }
}

export default actions
