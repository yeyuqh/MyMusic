<template>
  <div class="topbar">
    <button v-if="isSmall" class="btn-toggle" @click="onClickToggleBtn">
      <Hamburger :is-open="sidebar.opened" />
    </button>

    <nav :class="['topbar__nav', isSmall ? 'small' : '']">
      <router-link v-for="nav of navs" :key="nav.name" class="nav__item" tag="a" :to="nav.path">
        <template v-if="nav.meta">{{ nav.meta.title }}</template>
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, shallowRef } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useStore } from '@/store'
import { AllMTypes } from '@/store/types'

import Hamburger from '@/components/_base/Hamburger/index.vue'

export default defineComponent({
  name: 'Topbar',
  components: { Hamburger },

  setup() {
    const route = useRoute()
    const store = useStore()

    const isSmall = computed(() => store.getters.pageSize === 'small')
    const sidebar = computed(() => store.getters.sidebar)

    const navs = shallowRef(route.matched[1].meta.isNav ? route.matched[1].children : [])

    function onClickToggleBtn() {
      store.commit(AllMTypes.ToggleSidebar)
    }

    onBeforeRouteUpdate((to) => {
      to.matched[1].meta.isNav ? (navs.value = to.matched[1].children) : (navs.value = [])
    })

    return { isSmall, sidebar, navs, onClickToggleBtn }
  }
})
</script>

<style lang="scss" scoped>
.topbar {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: $h-topbar;
  border-bottom: 1px solid;
  backdrop-filter: blur(15px);
  @include themeify {
    background-color: Color(--topbar-bgcolor);
    border-color: Color(--border-color_00);
  }

  .btn-toggle {
    position: absolute;
    top: 10px;
    left: $main-padding;
    width: 30px;
  }

  .topbar__nav {
    margin-left: $w-sidebar;
    line-height: $h-topbar;
    @include themeify {
      color: Color(--font-color_03);
    }

    &.small {
      margin-left: 50px;
    }
  }

  .nav__item {
    margin: 0 15px;

    &:first-child {
      margin-left: $main-padding;
    }

    &:hover {
      @include themeify {
        color: Color(--font-color_02);
      }
    }

    &.router-link-active {
      font-weight: bold;
      @include themeify {
        color: Color(--font-color_02);
      }
    }
  }
}

@supports not (backdrop-filter: blur()) {
  .topbar {
    @include themeify {
      background-color: Color(--sidebar-bgcolor);
    }
  }
}
</style>
