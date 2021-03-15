<template>
  <div class="player-detail">
    <div
      class="background-img"
      :style="{ 'background-image': `url(${utils.getImage(playingSong.album.picUrl)})` }"
    ></div>

    <div class="player-main">
      <div class="player-container"><Player /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useStore } from '@/store'

import Player from './components/Player.vue'

import { utils } from '@/utils'

export default {
  name: 'PlayerDetail',
  components: { Player },

  setup() {
    const store = useStore()

    const playingSong = computed(() => store.getters.playingSong!)

    onMounted(() => {
      document.body.style.overflow = 'hidden'
    })

    onUnmounted(() => {
      document.body.style.overflow = 'auto'
    })

    return { utils, playingSong }
  }
}
</script>

<style lang="scss" scoped>
.player-detail {
  box-sizing: border-box;
  overflow-y: auto;
  padding: $h-topbar $h-topbar calc(#{$h-topbar} + #{$h-playbar});
  height: 100%;
  @include scrollbar-hide;
  @include themeify {
    background-color: Color(--bg-color_main);
  }

  .background-img {
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(15px);
    transition: background-image 0.6s;
  }

  &:after {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - #{$h-playbar - 2px});
    @include themeify {
      background-color: Color(--bg-color_blur);
    }
  }
}

.player-main {
  margin: 0 auto;
  max-width: 960px;

  .player-container {
    position: relative;
    z-index: 1;
  }
}
</style>
