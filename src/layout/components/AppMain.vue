<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <!-- 只缓存首页数据 -->
      <keep-alive>
        <component :is="Component" v-if="route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" v-if="!route.meta.keepAlive" />
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppMain'
})
</script>

<style lang="scss">
.app-main {
  margin: 0 auto;
  padding: $main-padding;
  max-width: 1040px;
}
</style>
