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

    function onClickOutside(e: MouseEvent) {
      const el = e.target as HTMLElement
      if (el.className && el.className.indexOf('btn-remove') !== -1) return
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
  @include themeify {
    color: Color(--font-color_01);
  }

  .btn-playqueue {
    font-size: 18px;
  }

  .volumebar-wrap {
    margin-right: 10%;
    width: 100px;
    @include flex-between();

    .btn-volume {
      margin: 0;
      font-size: 18px;
    }

    .el-slider {
      margin-left: 12px;
      width: 100%;
    }
  }

  .playqueue-container {
    position: fixed;
    top: 50px;
    right: 0;
    height: calc(100% - 112px);
  }
}
</style>

<style lang="scss">
.volumebar-wrap {
  .el-slider__runway {
    height: 4px;

    .el-slider__bar {
      height: 4px;
    }

    .el-slider__button-wrapper {
      top: -7px;
      width: 12px;
      height: 12px;

      .el-slider__button {
        width: 100%;
        height: 100%;
        border: none;
        background-color: $red;
      }
    }
  }
}
</style>
