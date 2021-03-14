<template>
  <i id="icon">
    <svg aria-hidden="true">
      <use :xlink:href="id"></use>
    </svg>
  </i>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const id = computed(() => `#i-${props.name}`)

    return { id }
  }
})
</script>

<style scoped>
#icon {
  pointer-events: none;
}

#icon svg {
  overflow: hidden;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
