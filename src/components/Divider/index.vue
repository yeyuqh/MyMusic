<template>
  <div class="divider">
    <span class="line"></span>
    <p v-if="text" class="text">{{ text }}</p>
    <span class="line"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Divider',
  props: {
    text: { type: String, default: '我是有底线的' }
  }
})
</script>

<style lang="scss" scoped>
.divider {
  margin: 15px 0;
  @include flex-between;

  .line {
    flex: 1;
    height: 1px;
    @include themeify {
      background-color: Color(--border-color_00);
    }
  }

  .text {
    padding: 0 20px;
    font-size: $fs_xs;
    color: $gray_1;
  }
}
</style>
