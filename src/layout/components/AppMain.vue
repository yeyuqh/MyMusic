<template>
  <div class="app-main">
    <router-view />
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
  padding: 15px;
}
</style>
