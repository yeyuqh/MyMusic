<template>
  <div class="player-menu">
    <button class="btn-playqueue" @click="togglePlayqueue">
      <Icon name="playlist_1" />
    </button>

    <transition name="right">
      <div v-if="showPlayqueue" v-click-outside="onClickOutside" class="playqueue-container">
        <Playqueue />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import clickOutside from '@/directives/click-outside'

import Playqueue from '@/components/Playqueue/index.vue'

export default defineComponent({
  name: 'PlayerMenu',
  components: { Playqueue },
  directives: { clickOutside },

  setup() {
    const state = reactive({
      showPlayqueue: false
    })

    function togglePlayqueue() {
      state.showPlayqueue = !state.showPlayqueue
    }

    function onClickOutside() {
      state.showPlayqueue = false
    }

    return { ...toRefs(state), togglePlayqueue, onClickOutside }
  }
})
</script>

<style lang="scss" scoped>
.player-menu {
  padding-right: 15px;
  @include flex-between(row, flex-end);

  .btn-playqueue {
    font-size: $fs_l;
  }

  .playqueue-container {
    position: fixed;
    top: 50px;
    right: 0;
    height: calc(100% - #{$h-topbar} - #{$h-playbar});
  }
}
</style>
