<template>
  <div class="divider">
    <span class="line"></span>
    <p v-if="text">{{ text }}</p>
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
  margin: 50px 0 25px;
  @include flex-between;

  .line {
    flex: 1;
    height: 1px;
    @include themeify {
      background-color: Color(--main-bdcolor);
    }
  }

  p {
    padding: 0 20px;
    font-size: $fs_xs;
    color: $gray_1;
  }
}
</style>
