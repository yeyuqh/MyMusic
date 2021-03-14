<template>
  <div class="playing-icon icon">
    <div v-if="!isPlaying" class="state-stop">
      <svg
        t="1608043409931"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3177"
        width="100%"
        height="100%"
      >
        <path
          d="M256 832c-11.712 0-23.36-3.2-33.664-9.536A64.170667 64.170667 0 0 1 192 768V256c0-22.208 11.52-42.816 30.336-54.464a64.298667 64.298667 0 0 1 62.272-2.816l512 256a64.064 64.064 0 0 1 0 114.56l-512 256c-8.96 4.48-18.88 6.72-28.608 6.72z"
          p-id="3178"
        ></path>
      </svg>
    </div>

    <div v-if="isPlaying && !audioSvg" class="state-playing">
      <svg
        t="1610089600816"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2658"
        width="100%"
        height="100%"
      >
        <path
          d="M225.57127111 335.16202667l232.43434667-186.55914667a36.40888889 36.40888889 0 0 1 59.20085333 28.39893333v694.53596445a36.40888889 36.40888889 0 0 1-59.12803556 28.43534222l-238.8423111-190.63694222H38.68444445a36.40888889 36.40888889 0 0 1-36.4088889-36.40888889v-301.35637334a36.40888889 36.40888889 0 0 1 36.4088889-36.40888888h186.88682666zM692.66090667 748.80341333a36.40888889 36.40888889 0 0 1-51.00885334-51.95548444 243.57546667 243.57546667 0 0 0 73.18186667-174.43498667 243.39342222 243.39342222 0 0 0-63.46069333-164.34972444 36.40888889 36.40888889 0 1 1 53.88515555-48.96995556 316.2112 316.2112 0 0 1 82.39331556 213.31968 316.39324445 316.39324445 0 0 1-94.99079111 226.39047111zM865.74876445 906.67235555a36.40888889 36.40888889 0 1 1-52.21034667-50.7539911A476.73799111 476.73799111 0 0 0 948.90666667 522.41294222c0-123.68099555-47.07669333-239.89816889-130.19818667-328.11690667a36.40888889 36.40888889 0 0 1 53.01134222-49.91658666c95.75537778 101.5808 150.00462222 235.56551111 150.00462223 378.03349333 0 145.45351111-56.61582222 282.05966222-155.97568 384.25941333z"
          p-id="2659"
        ></path>
      </svg>
    </div>

    <div v-if="isPlaying && audioSvg" class="state-playing">
      <svg width="100%" height="100%" viewBox="0 0 55 55" xmlns="http://www.w3.org/2000/svg">
        <g transform="matrix(1 0 0 -1 0 55)">
          <rect width="10" height="20" rx="3">
            <animate
              attributeName="height"
              begin="0s"
              dur="4.3s"
              values="20;45;35;52;55;32;55;45;55;23;55;13"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="15" width="10" height="55" rx="3">
            <animate
              attributeName="height"
              begin="0s"
              dur="2s"
              values="55;42;33;5;55;23;55;33;12;14;25;55"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="30" width="10" height="40" rx="3">
            <animate
              attributeName="height"
              begin="0s"
              dur="1.4s"
              values="50;34;55;23;15;23;34;45;25;54;21;50"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="45" width="10" height="25" rx="3">
            <animate
              attributeName="height"
              begin="0s"
              dur="2s"
              values="30;45;13;25;45;42;37;55;34;23;55;30"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </rect>
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlayingIcon',
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    },

    audioSvg: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
.playing-icon {
  position: relative;
  width: 100%;
  height: 100%;

  div {
    position: absolute;

    svg {
      fill: $red;
    }
  }
}
</style>
