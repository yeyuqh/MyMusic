import { Store as VuexStore, ActionContext, CommitOptions, DispatchOptions } from 'vuex'

//* PlayerStateTypes
export type PlayerState = {
  playDetail: { opened: boolean }
  isPlaying: boolean
  playingSong: SongInfoTypes | null // 当前播放的歌曲
  progress: number
  playqueue: SongInfoTypes[]
  history: SongInfoTypes[]
  playMod: PlayModTypes
}
export type SongInfoTypes = {
  id: number
  name: string
  album: AlbumTypes
  alia: string
  duration: number
  artists: ArtistTypes[]
}
type AlbumTypes = {
  id: number
  name: string
  picUrl: string
}
type ArtistTypes = {
  id: number
  name: string
}
export enum PlayModTypes {
  loop,
  shuffle,
  repeat
}

//* PlayerGetterTypes
export type PlayerGetters<S = PlayerState> = {
  playerDetail(state: S): PlayerState['playDetail']
  isPlaying(state: S): boolean
  playingSong(state: S): SongInfoTypes | null
  progress(state: S): number
  playqueue(state: S): SongInfoTypes[]
  history(state: S): SongInfoTypes[]
  playmod(state: S): PlayModTypes
  playingSongIndex(state: S): number
  nextSong(state: S): SongInfoTypes
  prevSong(state: S): SongInfoTypes
}

//* PlayerMutationTypes
export enum PlayerMutationTypes {
  TogglePlayerDetail = 'TOGGLE_PLAYER_DETAIL',
  HidePlayerDetail = 'HIDE_PLAYER_DETAIL',
  OpenPlayerDetail = 'OPEN_PLAYER_DETAIL',
  ChangePlayState = 'CHANGE_PLAY_STATE',
  AddPlayingSong = 'ADD_PLAYING_SONG',
  ClearPlayqueue = 'CLEAR_PLAYQUEUE',
  ClearHistory = 'CLEAR_HISTORY',
  ChangePlayMod = 'CHANGE_PLAYMOD',
  ChangeProgress = 'CHANGE_PROGRESS',
  AddSongsToPlayqueue = 'ADD_SONGS_TO_PLAYQUEUE',
  AddSongToHistory = 'ADD_SONG_TO_HISTORY',
  RemovePlayqueueSong = 'REMOVE_PLAYQUEUE_SONG',
  RemoveHistorySong = 'REMOVE_HISTORY_SONG'
}

export type PlayerMutations<S = PlayerState> = {
  [PlayerMutationTypes.TogglePlayerDetail](state: S): void
  [PlayerMutationTypes.HidePlayerDetail](state: S): void
  [PlayerMutationTypes.OpenPlayerDetail](state: S): void
  [PlayerMutationTypes.ChangePlayState](state: S, payload: boolean): void
  [PlayerMutationTypes.AddPlayingSong](state: S, playload: SongInfoTypes): void

  [PlayerMutationTypes.ClearPlayqueue](state: S): void
  [PlayerMutationTypes.ClearHistory](state: S): void
  [PlayerMutationTypes.ChangePlayMod](state: S): void
  [PlayerMutationTypes.ChangeProgress](state: S, payload: number): void
  [PlayerMutationTypes.AddSongsToPlayqueue](state: S, playload: SongInfoTypes[]): void
  [PlayerMutationTypes.AddSongToHistory](state: S, playload: SongInfoTypes): void
  [PlayerMutationTypes.RemovePlayqueueSong](state: S, payload: number): void
  [PlayerMutationTypes.RemoveHistorySong](state: S, payload: number): void
}

//* PlayerActionTypes
export enum PlayerActionTypes {
  ADD_PLAYING_SONG = 'ADD_PLAYING_SONG'
}

export type PlayerActions = {
  [PlayerActionTypes.ADD_PLAYING_SONG](context: PlayerActionAugments, payload: number | string): void
}

type PlayerActionAugments = {
  commit<K extends keyof PlayerMutations>(
    key: K,
    payload: Parameters<PlayerMutations[K]>[1]
  ): ReturnType<PlayerMutations[K]>
} & Omit<ActionContext<PlayerState, any>, 'commit'>

//* PlayerModuleTypes
export type PlayerModuleTypes = Omit<VuexStore<PlayerState>, 'getters' | 'commit' | 'dispatch'> & {
  getters: {
    [K in keyof PlayerGetters]: ReturnType<PlayerGetters[K]>
  }
} & {
  commit<K extends keyof PlayerMutations, P extends Parameters<PlayerMutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<PlayerMutations[K]>
} & {
  dispatch<K extends keyof PlayerActions, P extends Parameters<PlayerActions[K]>[1]>(
    key: K,
    payload?: P,
    options?: DispatchOptions
  ): ReturnType<PlayerActions[K]>
}
