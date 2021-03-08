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
  margin: 0 auto;
  padding: 15px;
  max-width: 1040px;
}
</style>
