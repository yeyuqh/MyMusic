<template>
  <div class="discovery">
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
  name: 'Discovery'
})
</script>
