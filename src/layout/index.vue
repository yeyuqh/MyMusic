<template>
  <div :class="['app-wrap', classObj]">
    <header class="topbar-container"><Topbar /></header>
    <header class="topbar-container-r">
      <div class="search-bar-container"><SearchBar /></div>
      <Theme />
    </header>

    <transition name="left">
      <aside v-if="classObj.openSidebar" v-click-outside="onClickOutside" class="sidebar-container">
        <Sidebar />
      </aside>
    </transition>

    <main class="main-container"><AppMain /></main>

    <footer class="playbar-container"><Playbar /></footer>

    <transition name="scale">
      <div v-if="playerDetail.opened" class="player-detail-container">
        <PlayerDetail />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useStore } from '@/store'
import { AllMTypes } from '@/store/types'
import clickOutside from '@/directives/click-outside'

import { AppMain, Topbar, Sidebar, Playbar } from './components'
import Theme from '@/components/Theme/index.vue'
import SearchBar from '@/components/SearchBar/index.vue'
import PlayerDetail from '@/components/PlayerDetail/index.vue'

export default defineComponent({
  name: 'Layout',
  components: { AppMain, Topbar, Sidebar, Playbar, Theme, SearchBar, PlayerDetail },
  directives: { clickOutside },

  setup() {
    const store = useStore()

    const classObj = computed(() => {
      return {
        isSmall: store.getters.pageSize === 'small',
        hideSidebar: !store.getters.sidebar.opened,
        openSidebar: store.getters.sidebar.opened
      }
    })

    const playerDetail = computed(() => store.getters.playerDetail)

    // 判断当前窗口大小
    const { body } = document
    const WIDTH = 962
    function isSmall_$() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }

    function handleResize() {
      const isSmall = isSmall_$()

      store.commit(AllMTypes.TogglePageSize, isSmall ? 'small' : 'large')
      store.commit(isSmall ? AllMTypes.HideSidebar : AllMTypes.OpenSidebar)
    }

    function onClickOutside() {
      if (classObj.value.isSmall) store.commit(AllMTypes.HideSidebar)
    }

    onMounted(() => {
      handleResize()
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    onBeforeRouteUpdate(() => {
      onClickOutside()
      store.commit(AllMTypes.HidePlayerDetail) // 路由发生变化时关闭播放详情页
    })

    return { classObj, playerDetail, onClickOutside }
  }
})
</script>

<style lang="scss">
body {
  min-width: 768px;
  font-size: $fs_m;
  @include themeify(0) {
    color: Color(--font-color_primary);
    background-color: Color(--bg-color_main);
  }
}

.app-wrap {
  .topbar-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $z-topbar;
    width: 100%;
  }

  .topbar-container-r {
    position: fixed;
    top: 0;
    right: $main-padding;
    z-index: $z-topbar_r;
    height: $h-topbar;
    @include flex-center;

    .search-bar-container {
      margin-right: 10px;
    }
  }

  .sidebar-container {
    position: fixed;
    top: $h-topbar;
    left: 0;
    z-index: $z-sidebar;
    height: calc(100% - #{$h-topbar} - #{$h-playbar});
  }

  .main-container {
    margin: $h-topbar 0 $h-playbar $w-sidebar;
  }

  &.hideSidebar,
  &.openSidebar.isSmall {
    .main-container {
      margin-left: 0;
    }
  }

  .playbar-container {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: $z-playbar;
    width: 100%;
  }

  .player-detail-container {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: $z-player;
    width: 100%;
    min-width: 640px;
    height: 100%;
  }
}
</style>
