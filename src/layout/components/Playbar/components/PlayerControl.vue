<template>
  <div class="player-control">
    <button class="btn-playmod" @click="onClickPlayModBtn">
      <Icon :name="playModIcon()" />
    </button>

    <button class="btn-prev" @click="onClickPrevBtn">
      <Icon name="backward" />
    </button>

    <el-button type="primary" circle class="btn-play" @click="onClickPlayBtn">
      <Icon :name="isPlaying ? 'stop' : 'arrow-r_fill'" />
    </el-button>

    <button class="btn-next" @click="onClickNextBtn">
      <Icon name="forward" />
    </button>

    <el-popover :show-after="200" :append-to-body="false" popper-class="volume-bar" placement="top" trigger="hover">
      <template #reference>
        <button class="btn-volume" @click="onClickVolumeBtn">
          <Icon :name="muted || volume === 0 ? 'sound-off' : 'sound-on'" />
        </button>
      </template>

      <el-slider v-model="volume" :max="1" :step="0.01" :show-tooltip="false" vertical height="80px"></el-slider>
    </el-popover>
  </div>

  <div v-if="playingSong" class="progress-bar">
    <el-slider
      v-model="currentTime"
      :show-tooltip="false"
      :step="1"
      :max="duration"
      @change="onChangeProgress"
      @mousedown="isDraging = true"
      @mouseup="isDraging = false"
    />
  </div>

  <audio
    :ref="refAudio_$"
    preload="auto"
    :src="songUrl"
    :autoplay="autoPlay"
    :volume="volume"
    :muted="muted"
    :loop="repeat"
    @timeupdate="handleTimeUpdate"
    @play="handlePlayStart"
    @pause="handlePlayPause"
    @ended="handlePlayEnded"
  />
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeMount, reactive, toRefs, watch } from 'vue'
import { useStore } from '@/store'
import { AllMTypes } from '@/store/types'
import { PlayModTypes } from '@/store/modules/player/types'

import { getSongUrl_ } from '@/api/song'

export default defineComponent({
  name: 'PlayerControl',

  setup() {
    const store = useStore()

    let audio_$: HTMLAudioElement

    const playMod = computed(() => store.getters.playmod)
    const playingSong = computed(() => store.getters.playingSong)
    const isPlaying = computed(() => store.getters.isPlaying)
    const playqueue = computed(() => store.getters.playqueue)
    const currentTime = computed({
      get: () => store.getters.progress,
      set: (val) => {
        store.commit(AllMTypes.ChangeProgress, val)
      }
    })

    const state = reactive({
      songUrl: null as string | null,
      autoPlay: false, // 自动播放
      isDraging: false, // 是否正在拖动进度条
      duration: 0, // 歌曲时长
      volume: 1,
      muted: false, // 是否静音
      repeat: playMod.value === PlayModTypes.repeat // 单曲循环
    })

    // 获取 Audio 元素
    function refAudio_$(el: HTMLAudioElement | null) {
      if (el) nextTick(() => (audio_$ = el))
    }

    // Audio 事件
    function handleTimeUpdate() {
      if (audio_$ && !state.isDraging) currentTime.value = audio_$.currentTime
    }
    function handlePlayEnded() {
      if (playMod.value !== PlayModTypes.repeat) {
        if (playqueue.value.length === 1) {
          currentTime.value = 0
          store.commit(AllMTypes.ChangePlayState, false)
        } else store.commit(AllMTypes.AddPlayingSong, store.getters.nextSong)
      }
    }
    function handlePlayStart() {
      store.commit(AllMTypes.ChangePlayState, true)
    }
    function handlePlayPause() {
      store.commit(AllMTypes.ChangePlayState, false)
    }

    // 进度条控制
    function onChangeProgress(time: number) {
      if (audio_$) audio_$.currentTime = time
      state.isDraging = false
    }

    // 播放 | 暂停
    function onClickPlayBtn() {
      if (!playingSong.value) return

      if (isPlaying.value) {
        audio_$.pause()
        store.commit(AllMTypes.ChangePlayState, false)
      } else {
        audio_$.play()
        store.commit(AllMTypes.ChangePlayState, true)
        store.commit(AllMTypes.AddSongToHistory, playingSong.value)
      }
    }

    // 播放模式切换
    function onClickPlayModBtn() {
      store.commit(AllMTypes.ChangePlayMod)
    }
    function playModIcon() {
      switch (playMod.value) {
        case PlayModTypes.loop:
          return 'loop'
        case PlayModTypes.shuffle:
          return 'shuffle'
        case PlayModTypes.repeat:
          return 'repeat'
      }
    }

    // 静音控制
    function onClickVolumeBtn() {
      if (state.volume === 0) {
        state.volume = 0.5
        state.muted = false
      } else state.muted = !state.muted
    }

    // 上一曲
    function onClickPrevBtn() {
      if (playqueue.value.length > 1) {
        store.commit(AllMTypes.AddPlayingSong, store.getters.prevSong)
      }
    }

    // 下一曲
    function onClickNextBtn() {
      if (playqueue.value.length > 1) {
        store.commit(AllMTypes.AddPlayingSong, store.getters.nextSong)
      }
    }

    // 获取歌曲播放链接
    async function getSongUrl(id: number) {
      const { data: res } = await getSongUrl_(id)
      const song = res.data[0]

      currentTime.value = 0 // 重置进度条
      state.songUrl = song.url
      state.duration = playingSong.value!.duration / 1000
    }

    watch(playingSong, (val) => {
      if (val) {
        getSongUrl(val.id)
        state.autoPlay = true
        store.commit(AllMTypes.ChangePlayState, true)
        store.commit(AllMTypes.AddSongToHistory, val) // 将歌曲添加到历史记录
      } else {
        state.songUrl = null
        currentTime.value = 0
        store.commit(AllMTypes.ChangePlayState, false)
        store.commit(AllMTypes.HidePlayerDetail)
      }
    })

    onBeforeMount(() => {
      if (playingSong.value) getSongUrl(playingSong.value.id)
    })

    return {
      ...toRefs(state),
      playMod,
      playingSong,
      isPlaying,
      currentTime,
      refAudio_$,
      handleTimeUpdate,
      handlePlayStart,
      handlePlayPause,
      handlePlayEnded,
      onChangeProgress,
      onClickPlayBtn,
      onClickPlayModBtn,
      playModIcon,
      onClickPrevBtn,
      onClickNextBtn,
      onClickVolumeBtn
    }
  }
})
</script>

<style lang="scss" scoped>
.player-control {
  width: 100%;
  @include flex-center;

  button {
    margin: 0 3%;
    color: $red;
    font-size: $fs_xm;

    &.btn-playmod,
    &.btn-volume {
      margin: 0 7%;
      @include themeify {
        color: Color(--font-color_primary);
      }
    }

    &.btn-playmod {
      font-size: $fs_m;
    }
  }

  .btn-play {
    width: 40px;
    height: 40px;
    color: $white;

    #icon {
      position: relative;
      top: -1px;
      left: -1px;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<style lang="scss">
.progress-bar {
  position: absolute;
  left: 0;
  top: -2px;
  bottom: $h-playbar;
  width: 100%;

  .el-slider {
    .el-slider__runway {
      margin: 0;
      height: 2px;
      transition: background-color 0.3s;
      @include themeify {
        background-color: Color(--border-color_00);
      }

      &:after {
        content: '';
        display: block;
        position: relative;
        top: -4px;
        width: 100%;
        padding: 5px;
      }

      &:hover {
        .el-slider__button {
          transform: scale(1);
          transition: transform 0.3s;
        }
      }

      &.disabled {
        .el-slider__bar {
          background-color: $red;
        }
      }
    }

    .el-slider__bar {
      height: 2px;
    }

    .el-slider__button-wrapper {
      top: -5px;
      width: 12px;
      height: 12px;

      .el-slider__button {
        display: block;
        width: 100%;
        height: 100%;
        background-color: $red;
        border: none;
        transition: transform 0.3s;
        transform: scale(0);

        &.hover,
        &.dragging {
          transform: none;
        }
      }
    }
  }
}

.volume-bar {
  position: relative;
  width: 30px !important;
  min-width: auto !important;
  padding: 15px 0 10px !important;

  .el-slider.is-vertical {
    left: 50%;

    .el-slider__runway {
      margin: 0;
      width: 4px;
      transform: translateX(-50%);
      @include themeify {
        background-color: Color(--border-color_00);
      }
    }

    .el-slider__bar {
      width: 4px;
    }

    .el-slider__button-wrapper {
      left: -4px;
      width: 12px;
      height: 12px;

      .el-slider__button {
        display: block;
        width: 100%;
        height: 100%;
        background-color: $red;
        border: none;
      }
    }
  }
}
</style>
