<template>
  <div class="playqueue">
    <div class="playqueue__header">
      <div class="header__tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="['btn-tab', { active: tab === currentTab }]"
          @click="onClickTabBtn(tab)"
        >
          {{ tab }}
        </button>
      </div>
      <div class="header__info">
        <span class="count">{{ songlist.length }}首歌曲</span>
        <button class="btn-clear" @click="onClickClearBtn"><Icon name="del" /> 清空</button>
      </div>
    </div>

    <div v-infinite-scroll="handleSonglistLoad" class="songlist-wrap" :infinite-scroll-distance="200">
      <ul class="songlist-container">
        <li v-for="song in SonglistLoad" :key="song.id" class="songlist__item">
          <div class="cover" @mouseenter="showRemoveBtn(song.id)" @mouseleave="showRemoveBtn(-1)">
            <el-image :src="utils.getImage(song.album.picUrl, '100y100')" lazy />

            <!-- 正在播放图标 -->
            <div v-if="playingSong && song.id === playingSong.id" class="playing-icon-wrap">
              <PlayingIcon :is-playing="isPlaying" :audio-svg="true" />
            </div>

            <!-- 移除单首歌曲按钮 -->
            <transition name="fade">
              <button
                v-if="
                  (playingSong && playingSong.id !== song.id && song.id === removeBtnIndex) ||
                    (!playingSong && song.id === removeBtnIndex)
                "
                class="btn-remove"
                @click.stop="onClickRemoveBtn(song.id)"
              >
                <Icon name="del" />
              </button>
            </transition>
          </div>

          <div class="song-info" @dblclick="onDblclickSong(song)">
            <div class="info-l">
              <div class="name">{{ song.name }}</div>
              <div class="artist">
                <span v-for="(artist, index) of song.artists" :key="index">
                  <span v-if="index !== 0"> / </span>{{ artist.name }}
                </span>
                - {{ song.album.name }}
              </div>
            </div>

            <div class="info-r">
              <div class="duration">{{ utils.timeFormat(song.duration, 'ms') }}</div>
            </div>
          </div>
        </li>
      </ul>

      <Divider text="没有更多数据了～" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useStore } from '@/store'
import { AllMTypes } from '@/store/types'
import { SongInfoTypes } from '@/store/modules/player/types'
import { utils } from '@/utils/index'

import PlayingIcon from '@/components/PlayingIcon/index.vue'

export default defineComponent({
  name: 'Playqueue',
  components: { PlayingIcon },

  setup() {
    const store = useStore()

    const state = reactive({
      tabs: ['播放队列', '历史记录'],
      currentTab: '播放队列',
      removeBtnIndex: -1,
      pageNum: 1
    })

    const isPlaying = computed(() => store.getters.isPlaying)
    const playingSong = computed(() => store.getters.playingSong)
    const songlist = computed(() => {
      if (state.currentTab === '播放队列') return store.getters.playqueue
      else return store.getters.history
    })

    // 列表按需加载
    const SonglistLoad = computed(() => {
      return songlist.value.slice(0, state.pageNum * 10)
    })

    function handleSonglistLoad() {
      state.pageNum++
    }

    function showRemoveBtn(index: number) {
      state.removeBtnIndex = index
    }

    function onClickClearBtn() {
      if (state.currentTab === '播放队列') store.commit(AllMTypes.ClearPlayqueue)
      else store.commit(AllMTypes.ClearHistory)
    }

    function onDblclickSong(song: SongInfoTypes) {
      store.commit(AllMTypes.AddPlayingSong, song)
      if (state.currentTab === '历史记录') {
        store.commit(AllMTypes.AddSongsToPlayqueue, [song]) // 将歌曲添加到播放队列
      }
    }

    function onClickTabBtn(tabName: string) {
      state.currentTab = tabName
      state.pageNum = 1
      handleSonglistLoad()
    }

    function onClickRemoveBtn(songId: number) {
      store.commit(
        state.currentTab === '播放队列' ? AllMTypes.RemovePlayqueueSong : AllMTypes.RemoveHistorySong,
        songId
      )
    }

    return {
      utils,
      ...toRefs(state),
      showRemoveBtn,
      songlist,
      SonglistLoad,
      isPlaying,
      playingSong,
      onClickClearBtn,
      onDblclickSong,
      onClickTabBtn,
      onClickRemoveBtn,
      handleSonglistLoad
    }
  }
})
</script>

<style lang="scss" scoped>
.playqueue {
  width: 350px;
  height: 100%;
  border-top-left-radius: $radius_3;
  @include flex-between(column);
  @include themeify {
    background-color: Color(--bg-color_aside);
    box-shadow: -5px 0 8px -5px rgba(30, 30, 30, 0.5);
  }

  &__header {
    box-sizing: border-box;
    padding: 15px 15px 0 15px;
    width: 100%;

    .header__tabs {
      overflow: hidden;
      margin: 0 auto;
      width: 200px;
      height: 30px;
      text-align: center;
      border: 1px solid $gray;
      border-radius: 30px;

      .btn-tab {
        width: 50%;
        height: 100%;
        border-radius: 30px;

        &.active {
          color: $white;
          background-color: $gray_1;
        }
      }
    }

    .header__info {
      margin-top: 15px;
      border-bottom: 1px solid $gray;
      @include flex-between();

      .count {
        font-size: $fs_xs;
      }
    }
  }
}

.songlist-wrap {
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
  padding: 0 15px;
  width: 100%;
  @include scrollbar-style();

  .songlist__item {
    display: flex;
    position: relative;
    z-index: 0;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: -1px;
      left: -5px;
      z-index: -1;
      padding: 0 5px;
      width: 100%;
      height: calc(100% + 1px);
      opacity: 0;
      border-radius: $radius_1;
      transition: opacity 0.3s !important;
      @include themeify {
        background-color: Color(--bg-color_aside_hover);
      }
    }

    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }

  .cover {
    overflow: hidden;
    position: relative;
    bottom: -3px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: $radius_1;
    @include themeify {
      border: 1px solid Color(--bg-color_aside_hover);
    }

    img {
      width: 100%;
      height: 100%;
    }

    .playing-icon-wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(20, 20, 20, 0.3);
      backdrop-filter: blur(5px);

      .playing-icon {
        transform: scale(0.5);
      }
    }

    .btn-remove {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: $fs_xm;
      color: $white;
      background-color: rgba(20, 20, 20, 0.3);
      backdrop-filter: blur(5px);
    }
  }

  .song-info {
    flex: 1;
    overflow: hidden;
    margin-left: 5px;
    padding: 5px;
    font-size: $fs_xs;
    @include flex-between;
    @include themeify {
      border-bottom: 1px solid Color(--bg-color_aside_hover);
    }
  }

  .info-l {
    width: 80%;

    .name {
      width: 100%;
      font-size: $fs_m;
      line-height: 1.5em;
      @include ellipsis;
      @include themeify {
        color: Color(--font-color_primary);
      }
    }

    .artist {
      line-height: 18px;
      color: $gray_1;
      @include ellipsis;
    }
  }

  .info-r {
    display: flex;
    padding-right: 5px;
    color: $gray_1;
  }
}
</style>
