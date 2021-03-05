<template>
  <div class="topbar">
    <button v-if="isSmall" class="btn-toggle" @click="onClickToggleBtn">
      <Hamburger :is-active="sidebar.opened" />
    </button>

    <nav :class="['topbar-nav', isSmall ? 'small' : '']">
      <router-link v-for="nav in navs" :key="nav.name" tag="a" :to="nav.path">
        <template v-if="nav.meta">{{ nav.meta.title }}</template>
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, shallowRef } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useStore } from '@/store'
import { AllMType } from '@/store/mutation-types'

import Hamburger from '@/components/base/Hamburger/index.vue'

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
      store.commit(AllMType.ToggleSidebar)
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
  position: relative;
  width: 100%;
  height: $h-topbar;
  @include themeify {
    background-color: Color(--topbar-bgcolor);
  }

  .btn-toggle {
    position: absolute;
    top: 10px;
    left: 15px;
    width: 30px;
  }

  .topbar-nav {
    margin-left: $w-sidebar;
    line-height: $h-topbar;
    @include themeify {
      color: Color(--font-color_03);
    }

    a {
      padding: 0 15px;

      &:hover {
        @include themeify {
          color: Color(--font-color_02);
        }
      }
    }

    &.small {
      margin-left: 50px;
    }

    .router-link-active {
      font-weight: bold;
      @include themeify {
        color: Color(--font-color_02);
      }
    }
  }
}
</style>
