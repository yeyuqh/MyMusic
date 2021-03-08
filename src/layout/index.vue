<template>
  <div :class="['app-wrap', classObj]">
    <header class="topbar-container"><Topbar /></header>
    <header class="topbar-container_r"><Theme /></header>

    <transition name="left">
      <aside v-show="classObj.openSidebar" class="sidebar-container"><Sidebar /></aside>
    </transition>

    <main class="main-container"><AppMain /></main>

    <footer class="playbar-container"><Playbar /></footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from 'vue'
import { useStore } from '@/store'
import { AllMType } from '@/store/types'

import { AppMain, Topbar, Sidebar, Playbar } from './components'
import Theme from '@/components/Theme/index.vue'

export default defineComponent({
  name: 'Layout',
  components: { AppMain, Topbar, Sidebar, Playbar, Theme },

  setup() {
    const store = useStore()

    const classObj = computed(() => {
      return {
        small: store.getters.pageSize === 'small',
        hideSidebar: !store.getters.sidebar.opened,
        openSidebar: store.getters.sidebar.opened
      }
    })

    // 判断当前窗口大小
    const { body } = document
    const WIDTH = 962
    function isSmall_$() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }

    function handleResize() {
      const isSmall = isSmall_$()

      store.commit(AllMType.TogglePageSize, isSmall ? 'small' : 'large')
      store.commit(isSmall ? AllMType.HideSidebar : AllMType.OpenSidebar)
    }

    onMounted(() => {
      handleResize()
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    return { classObj }
  }
})
</script>

<style lang="scss">
body {
  font-size: $fs_m;
  @include themeify(0) {
    color: Color(--font-color_00);
    background-color: Color(--main-bgcolor);
  }
}

.app-wrap {
  .topbar-container {
    z-index: $z-topbar;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .topbar-container_r {
    z-index: $z-topbar_r;
    position: fixed;
    top: 0;
    right: 15px;
    height: $h-topbar;
    @include flex-center;
  }

  .sidebar-container {
    z-index: $z-sidebar;
    position: fixed;
    top: $h-topbar;
    left: 0;
    height: calc(100% - #{$h-topbar} - #{$h-playbar});
  }

  .main-container {
    margin: $h-topbar 0 $h-playbar $w-sidebar;
  }

  &.hideSidebar,
  &.openSidebar.small {
    .main-container {
      margin-left: 0;
    }
  }

  .playbar-container {
    z-index: $z-playbar;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
