<template>
  <div class="divider">
    <span :class="['line', { 'no-line': !line }]"></span>
    <p v-if="text" class="text">{{ text }}</p>
    <span :class="['line', { 'no-line': !line }]"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Divider',
  props: {
    text: { type: String, default: '我是有底线的' },
    line: { type: Boolean, default: true }
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

    &.no-line {
      opacity: 0;
    }
  }

  .text {
    padding: 0 20px;
    font-size: $fs_xs;
    color: $gray_1;
  }
}
</style>
