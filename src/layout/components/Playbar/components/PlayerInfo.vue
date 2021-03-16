<template>
  <div v-if="playingSong" class="player-info">
    <div class="cover">
      <img :src="utils.getImage(playingSong.album.picUrl, '100y100')" alt="" />
      <button class="btn-open" @click="onClickOpenBtn">
        <Icon :name="playerDetail.opened ? 'shrink' : 'arrow-expand'" />
      </button>
    </div>

    <div class="player-info-r">
      <div class="song-info">
        <p class="song-name">{{ playingSong.name }}</p>
        <p class="song-artist">
          <i style="margin: 0 5px"> -</i>
          <template v-for="(artist, index) of playingSong.artists" :key="index">
            <i v-if="index > 0"> / </i><a href="javascript:;"> {{ artist.name }} </a>
          </template>
        </p>
      </div>

      <div class="duration">{{ utils.timeFormat(progress) }} / {{ utils.timeFormat(playingSong.duration, 'ms') }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { AllMTypes } from '@/store/types'
import { utils } from '@/utils'

export default defineComponent({
  name: 'PlayerInfo',

  setup() {
    const store = useStore()

    const playerDetail = computed(() => store.getters.playerDetail)
    const playingSong = computed(() => store.getters.playingSong)
    const progress = computed(() => store.getters.progress)

    function onClickOpenBtn() {
      store.commit(AllMTypes.TogglePlayerDetail)
    }

    return { utils, playerDetail, playingSong, progress, onClickOpenBtn }
  }
})
</script>

<style lang="scss" scoped>
.player-info {
  display: flex;
  width: 100%;

  .cover {
    position: relative;
    overflow: hidden;
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: $radius_1;

    img {
      width: 100%;
      height: 100%;
    }

    .btn-open {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: $fs_xl;
      color: $white;
      background-color: rgba(0, 0, 0, 0.3);
      opacity: 0;
      transition: opacity 0.3s;
      backdrop-filter: blur(5px);

      &:hover {
        opacity: 1;
      }
    }
  }
}

.player-info-r {
  flex: 1;
  overflow: hidden;
  margin-left: 10px;
  font-size: $fs_xs;
  color: $gray;

  .song-info {
    display: flex;
    margin-bottom: 5px;
    line-height: 20px;
    @include themeify {
      color: Color(--font-color_primary);
    }

    .song-name {
      max-width: 60%;
      font-size: $fs_m;
      @include ellipsis;
    }

    .song-artist {
      position: relative;
      bottom: -1px;
      max-width: 40%;
      @include ellipsis;
      @include themeify {
        color: Color(--font-color_gray);
      }
    }
  }

  .duration {
    font-family: 'Monaco', 'Helvetica Neue', 'Helvetica', 'Arial';
  }
}
</style>
