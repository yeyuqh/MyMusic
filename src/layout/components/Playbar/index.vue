<template>
  <div class="playbar">
    <div class="player-info-container"><PlayerInfo /></div>
    <div class="player-control-container"><PlayerControl /></div>
    <div class="player-menu-container"><PlayerMenu /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PlayerInfo from './components/PlayerInfo.vue'
import PlayerControl from './components/PlayerControl.vue'
import PlayerMenu from './components/PlayerMenu.vue'

export default defineComponent({
  name: 'Playbar',
  components: { PlayerInfo, PlayerControl, PlayerMenu }
})
</script>

<style lang="scss" scoped>
.playbar {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 35% 1fr 35%;
  column-gap: 10px;
  position: relative;
  padding: 0 10px;
  height: $h-playbar;
  border-top: 2px solid;
  @include themeify {
    border-color: Color(--border-color_00);
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(15px);
    @include themeify {
      background-color: Color(--playbar-bgcolor);
      border-color: Color(--border-color_00);
    }
  }

  .player-info-container {
    @include flex-center(column, flex-start);
  }

  .player-control-container {
    @include flex-center;
  }

  .player-menu-container {
    @include flex-center(column, flex-end);
  }
}

@supports not (backdrop-filter: blur()) {
  .playbar {
    @include themeify {
      background-color: Color(--sidebar-bgcolor);
    }
  }
}
</style>
