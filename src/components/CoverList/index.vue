<template>
  <div class="cover-list">
    <div class="header">
      <h2 v-if="title" class="title">{{ title }}</h2>
      <a href="javascript:;" class="show-all">查看更多</a>
    </div>

    <ul
      :class="['grid-container', { 'auto-fill': gridAutoFill }]"
      :style="`grid-template-columns: ${gridOpt}; row-gap: ${gridRowGap}; column-gap: ${gridColGap}`"
    >
      <slot />
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'CoverList',
  props: {
    title: { type: String, default: '' },

    // Grid 布局配置项
    gridAutoFill: { type: Boolean, default: true }, // 项目自动填充
    gridColNum: { type: Number, default: 4 }, // 项目列数
    gridColMinWidth: { type: String, default: '150px' }, // 列宽
    gridRowGap: { type: String, default: '30px' }, // 项目行间距
    gridColGap: { type: String, default: '15px' } // 项目间距
  },

  setup(props) {
    const gridOpt = computed(() => {
      if (props.gridAutoFill) {
        return `repeat(auto-fill, minmax(${props.gridColMinWidth}, 1fr))`
      } else return `repeat( ${props.gridColNum}, 1fr)`
    })

    return { gridOpt }
  }
})
</script>

<style lang="scss" scoped>
.cover-list {
  .header {
    margin-bottom: 5px;
    @include flex-between;

    .show-all {
      font-size: $fs_xs;
      color: $gray_1;
    }
  }

  .grid-container {
    display: grid;
  }
}
</style>
