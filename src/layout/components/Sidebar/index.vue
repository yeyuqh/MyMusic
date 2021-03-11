<template>
  <div class="sidebar">
    <div class="login-container"><Login /></div>

    <nav class="sidebar-nav">
      <template v-for="nav of navs" :key="nav.name">
        <router-link v-if="nav.meta && nav.meta.isNav" tag="a" :to="nav.path">
          <Icon :name="nav.meta.icon" />{{ nav.meta.title }}
        </router-link>
      </template>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

import Login from '@/components/Login/index.vue'

export default defineComponent({
  name: 'Sidebar',
  components: { Login },

  setup() {
    const route = useRoute()

    const navs = route.matched[0].children

    return { navs }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  overflow-y: auto;
  width: $w-sidebar;
  height: 100%;

  @include themeify() {
    background-color: Color(--sidebar-bgcolor);
  }

  .sidebar-nav {
    a {
      display: block;
      padding: 8px 15px 8px 20px;
      @include ellipsis;
      @include themeify {
        color: Color(--font-color_00);
      }

      &:hover {
        @include themeify {
          background-color: Color(--sidebar-hvcolor);
        }
      }

      &.router-link-active {
        color: $red;
        @include themeify {
          background-color: Color(--sidebar-atcolor);
        }
      }

      #icon {
        position: relative;
        bottom: -1px;
        padding-right: 5px;
        font-size: $fs_l;
      }
    }
  }
}
</style>
