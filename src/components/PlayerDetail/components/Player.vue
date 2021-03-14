<template>
  <div class="player">
    <div class="player-l">
      <div :class="['cover', { 'is-pause': !isPlaying }]">
        <img :src="playingSong.album.picUrl" />
      </div>
    </div>

    <div class="player-r">
      <button class="btn-close" @click="onClickCloseBtn">
        <Icon name="shrink" />
      </button>

      <div class="title">
        <h1 class="song-name">{{ playingSong.name }}</h1>
        <p v-if="playingSong.alia" class="song-alia">{{ `（${playingSong.alia}）` }}</p>
      </div>

      <div class="song-info">
        <p class="song-artist">
          歌手：<template v-for="(artist, index) of playingSong.artists" :key="index">
            <i v-if="index !== 0"> / </i><a href="javascript:;">{{ artist.name }}</a>
          </template>
        </p>

        <p class="song-artist">
          专辑：<a href="javascript:;">{{ playingSong.album.name }}</a>
        </p>
      </div>

      <div :ref="refLyric_$" class="lyric-container">
        <ul class="lyric-wrap" style="padding: 15% 0 100%">
          <template v-if="lyricObj">
            <li
              v-for="(lrcLine, index) of lyricObj.lyric"
              :key="index"
              :class="[`lineT-${lrcLine.s}`, { 'is-current': lrcLine.s === currentLrcLineTime }]"
              v-html="lrcLine.text"
            ></li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeMount, onUnmounted, shallowReactive, toRefs, watch } from 'vue'
import { useStore } from '@/store'
import { AllMTypes } from '@/store/types'
import formatLyric, { LyricTypes } from '@/utils/formatLyric'

import BScroll, { BScrollInstance } from '@better-scroll/core'

import { getSongLyric_ } from '@/api/song'

export default defineComponent({
  name: 'Player',

  setup() {
    const store = useStore()

    let lyric_$: HTMLElement
    let bs: BScrollInstance

    const state = shallowReactive({
      lyricObj: {} as LyricTypes | null,
      currentLrcLineTime: 0
    })

    const isPlaying = computed(() => store.getters.isPlaying)
    const playingSong = computed(() => store.getters.playingSong!)
    const currentTime = computed(() => Math.round(store.getters.progress))

    function onClickCloseBtn() {
      store.commit(AllMTypes.TogglePlayerDetail)
    }

    // 获取歌词容器
    function refLyric_$(el: HTMLElement | null) {
      if (el) nextTick(() => (lyric_$ = el))
    }

    // 初始化 better-scroll
    function initBS() {
      bs = new BScroll(lyric_$, {
        disableMouse: true,
        disableTouch: true
      })
    }

    async function getSongLyric(id: number) {
      state.lyricObj = null // 清空歌词

      const { data: res } = await getSongLyric_(id)
      state.lyricObj = formatLyric(res.lrc.lyric) // 解析歌词

      // 判断歌词是否有翻译
      if (res.tlyric.lyric) {
        const tlyricObj = formatLyric(res.tlyric.lyric)

        for (const lrcRow of state.lyricObj.lyric) {
          for (const tlrcRow of tlyricObj.lyric) {
            if (tlrcRow.state) continue
            if (lrcRow.s === tlrcRow.s && lrcRow.text !== '') {
              lrcRow.text += `<br/><span style="font-size: 14px">${tlrcRow.text}</span>`
              tlrcRow.state = true // 标记
            }
          }
        }
      }
      // 歌词获取完成且 DOM 更新后初始化 better-scroll
      nextTick(() => initBS())
    }

    // 歌词滚动
    watch(currentTime, (val) => {
      // 判断当前时间是否为歌词行
      if (!bs || !state.lyricObj || state.lyricObj.timeLine.indexOf(val) === -1) return
      state.currentLrcLineTime = val

      bs.scrollToElement(`.lineT-${val}`, 600, true, -25, {
        style: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fn: (t: number) => 1 + --t * t * t * t * t
      })
    })

    // 切歌后将 better-scroll 重新定位到顶部
    watch(playingSong, (val) => {
      if (val) {
        getSongLyric(val.id)
        bs.scrollTo(0, 0)
      }
    })

    onBeforeMount(() => {
      getSongLyric(playingSong.value.id)
    })

    // 关闭页面后销毁 better-scroll
    onUnmounted(() => bs.destroy())

    return { ...toRefs(state), isPlaying, playingSong, refLyric_$, currentTime, onClickCloseBtn }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.player {
  display: grid;
  grid-template-columns: 3fr 4fr;
  column-gap: 25px;
  width: 100%;
  height: calc(100vh - #{2 * $h-topbar} - #{$h-playbar});
}

.player-l {
  @include flex-center;

  .cover {
    position: relative;
    display: inline-block;
    width: 100%;
    padding-bottom: 100%;
    border-radius: $radius_3;
    text-align: center;
    font-size: 0;
    line-height: 350px;
    transition: transform 0.6s cubic-bezier(0.35, 1.55, 0.65, 1);
    transform: scale(1);

    img {
      position: absolute;
      top: 0;
      left: 50%;
      display: inline-block;
      box-sizing: border-box;
      max-width: 100%;
      max-height: 100%;
      border-radius: 10px;
      vertical-align: middle;
      transform: translateX(-50%);
      @include themeify {
        box-shadow: 0px 20px 50px Color(--shadow-color);
      }
    }

    &.is-pause {
      transform: scale(0.8);
    }
  }
}

.player-r {
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  margin-left: 50px;
  padding: 25px 0 0 0;
  user-select: text;
  @include flex-center(column, flex-start);

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    color: $gray;
    font-size: 20px;
  }

  .title {
    width: 100%;

    .song-name {
      padding-right: 40px;
      @include ellipsis-lines;
      @include themeify {
        color: Color(--font-color_02);
      }
    }

    .song-alia {
      position: relative;
      left: -9px;
      padding: 0 30px 3px 0;
      @include ellipsis;
    }
  }

  .song-info {
    display: flex;
    margin-top: 5px;
    width: 100%;
    font-size: $fs_l;

    > p {
      margin-right: 20px;
      max-width: 50%;
      height: 25px;
      @include ellipsis;

      a {
        @include themeify {
          color: Color(--link-color);
        }
      }
    }
  }

  .lyric-container {
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    margin-top: 20px;
    width: 100%;
    height: 100%;
    border-right: 1px solid $gray;
    mask-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 1) 95%,
      rgba(255, 255, 255, 0) 100%
    );

    li {
      position: relative;
      padding: 10px 25px 0 3px;
      font-size: $fs_xl;
      color: transparent;
      transform: scale(0.85) translate3d(0, 0, 0);
      transform-origin: left;
      transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1) !important;
      @include themeify {
        text-shadow: 0 0 4px Color(--font-color_03);
      }

      &.is-current {
        transform: scale(1) translate3d(0, 0, 0);
        @include themeify {
          color: Color(--font-color_02);
        }
      }
    }
  }
}
</style>
