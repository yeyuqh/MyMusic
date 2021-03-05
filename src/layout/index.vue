<template>
  <div :class="['app-wrap', classObj]">
    <header class="topbar-container"><Topbar /></header>
    <header class="topbar-container_r">topbar_r</header>

    <aside v-if="classObj.openSidebar" class="sidebar-container"><Sidebar /></aside>

    <main class="main-container"><AppMain /></main>

    <footer class="playbar-container"><Playbar /></footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from '@/store'
import { AllMType } from '@/store/mutation-types'

import { AppMain, Topbar, Sidebar, Playbar } from './components'

export default defineComponent({
  name: 'Layout',
  components: { AppMain, Topbar, Sidebar, Playbar },

  setup() {
    const store = useStore()

    const classObj = computed(() => {
      return {
        isSmall: store.getters.pageSize === 'small',
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
}

.app-wrap {
  .topbar-container {
    z-index: $z-topbar;
    position: fixed;
    top: 0;
    left: 0;
  }

  .topbar-container_r {
    z-index: $z-topbar_r;
    position: fixed;
    top: 0;
    right: 0;
  }

  .sidebar-container {
    z-index: $z-sidebar;
    position: fixed;
    top: $h-topbar;
    left: 0;
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
    z-index: $z-playbar;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
