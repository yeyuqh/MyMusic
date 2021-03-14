<template>
  <div class="playqueue">
    <div class="tabs">
      <div class="tabs-nav">
        <button v-for="tab in tabs" :key="tab" :class="{ active: tab === currentTab }" @click="onClickTabBtn(tab)">
          {{ tab }}
        </button>
      </div>
      <div class="tabs-info">
        <span class="count">{{ songlist.length }}首歌曲</span>
        <button @click="onClickClearBtn"><Icon name="del" /> 清空</button>
      </div>
    </div>

    <div v-infinite-scroll="handleSonglistLoad" class="songlist-container" :infinite-scroll-distance="200">
      <ul class="songlist">
        <li v-for="song in SonglistLoad" :key="song.id" class="songlist-item">
          <div class="cover" @mouseenter="showRemoveBtn(song.id)" @mouseleave="showRemoveBtn(-1)">
            <img :src="`${song.album.picUrl}?param=50y50`" />
            <div v-if="playingSong && song.id === playingSong.id" class="playing-icon-wrap">
              <PlayingIcon :is-playing="isPlaying" :audio-svg="true" />
            </div>

            <transition name="fade">
              <button
                v-if="
                  (!playingSong && song.id === removeBtnIndex) ||
                    (playingSong && playingSong.id !== song.id && song.id === removeBtnIndex)
                "
                class="btn-remove"
                @click="onClickRemoveBtn(song.id)"
              >
                <Icon name="del" />
              </button>
            </transition>
          </div>

          <div class="info" @dblclick="onDblclickSong(song)">
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
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'

import PlayingIcon from '@/components/PlayingIcon/index.vue'

import { useStore } from '@/store'
import { AllMTypes } from '@/store/types'
import { SongInfoTypes } from '@/store/modules/player/types'

import { utils } from '@/utils/index'

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
      ...toRefs(state),
      utils,
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
    background-color: Color(--list-box-bgcolor);
    box-shadow: -5px 0 8px -5px rgba(30, 30, 30, 0.5);
  }

  .tabs {
    box-sizing: border-box;
    padding: 15px 15px 0 15px;
    width: 100%;

    .tabs-nav {
      margin: 0 auto;
      overflow: hidden;
      width: 200px;
      height: 30px;
      text-align: center;
      border: 1px solid $gray;
      border-radius: 30px;

      button {
        width: 50%;
        height: 100%;
        border-radius: 30px;

        &.active {
          background-color: $gray_1;
          color: $white;
        }
      }
    }

    .tabs-info {
      margin-top: 15px;
      border-bottom: 1px solid $gray;
      @include flex-between();

      .count {
        font-size: 12px;
      }

      button {
        font-size: inherit;
      }
    }
  }

  .songlist-container {
    box-sizing: border-box;
    flex: 1;
    padding: 0 15px 15px 15px;
    overflow-y: auto;
    width: 100%;
    @include scrollbar-style();

    .songlist-item {
      display: flex;
    }

    .cover {
      position: relative;
      bottom: -3px;
      width: 40px;
      height: 40px;
      border-radius: $radius_1;
      font-size: 0;
      line-height: 40px;
      @include themeify {
        border: 1px solid Color(--border-color_03);
      }

      img {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }

      .playing-icon-wrap {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(20, 20, 20, 0.3);
        backdrop-filter: blur(5px);

        .icon {
          transform: scale(0.5);
        }
      }

      .btn-remove {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 16px;
        color: $white;
        background-color: rgba(20, 20, 20, 0.3);
        backdrop-filter: blur(5px);
      }
    }

    .info {
      flex: 1;
      overflow: hidden;
      padding: 5px;
      margin-left: 5px;
      font-size: 12px;
      @include flex-between;
      @include themeify {
        border-bottom: 1px solid Color(--border-color_02);
      }

      &:hover {
        @include themeify {
          background-color: Color(--queue-listhover-bgcolor);
        }
      }
    }

    .info-l {
      width: 80%;

      .name {
        width: 100%;
        font-size: 14px;
        line-height: 21px;
        @include ellipsis;
        @include themeify {
          color: Color(--font-color_00);
        }
      }

      .artist {
        line-height: 18px;
        color: $gray;
        @include ellipsis;
      }
    }

    .info-r {
      position: relative;
      display: flex;
      padding-right: 5px;
      color: $gray;
    }
  }
}
</style>
