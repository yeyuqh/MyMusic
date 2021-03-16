<template>
  <div class="video">🇨🇳</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Video'
})
</script>

<style lang="scss" scoped>
.video {
  height: 50vh;
  font-size: 60px;
  @include flex-center;
}
</style>
