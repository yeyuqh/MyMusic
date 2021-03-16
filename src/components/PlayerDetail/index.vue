<template>
  <div :ref="refPlayDetail_$" class="player-detail" @scroll="handlePlayerDetailScroll">
    <div
      class="background-img"
      :style="{ 'background-image': `url(${utils.getImage(playingSong.album.picUrl)})` }"
    ></div>

    <div class="player-detail__main">
      <div class="player-container"><Player /></div>

      <div class="comment-wrap" :style="!showComment ? 'height: 100px' : 'height: auto'">
        <div v-if="showComment" class="comment-container">
          <Comment :id="playingSong.id" :type="CommentRequestTypes.song" :header="true" :is-body-scroll="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useStore } from '@/store'
import { utils } from '@/utils'

import Player from './components/Player.vue'
import Comment, { CommentRequestTypes } from '@/components/Comment/index.vue'

export default {
  name: 'PlayerDetail',
  components: { Player, Comment },

  setup() {
    const store = useStore()

    let playerDetail_$: HTMLElement | null

    const showComment = ref(false)

    const playingSong = computed(() => store.getters.playingSong!)

    function refPlayDetail_$(el: HTMLElement | null) {
      if (el) nextTick(() => (playerDetail_$ = el))
    }

    // 监听滚动条事件，当滚动距离大于 50 时显示评论组件
    let timer: any
    function handlePlayerDetailScroll() {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        if (playerDetail_$ && playerDetail_$.scrollTop > 50) {
          showComment.value = true
        }
      }, 30)
    }

    onMounted(() => {
      document.body.style.overflow = 'hidden'
    })

    onUnmounted(() => {
      document.body.style.overflow = 'auto'
    })

    watch(playingSong, () => {
      if (playerDetail_$) {
        playerDetail_$.scrollTop = 0
        showComment.value = false
      }
    })

    return { utils, showComment, CommentRequestTypes, playingSong, refPlayDetail_$, handlePlayerDetailScroll }
  }
}
</script>

<style lang="scss" scoped>
.player-detail {
  box-sizing: border-box;
  overflow-y: auto;
  height: 100%;
  @include scrollbar-hide;
  @include themeify {
    background-color: Color(--bg-color_main);
  }

  .background-img {
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(25px);
    transition: background-image 0.6s;
  }

  &:after {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - #{$h-playbar - 2px});
    pointer-events: none;
    @include themeify {
      background-color: Color(--bg-color_blur);
    }
  }
}

.player-detail__main {
  .player-container {
    position: relative;
    z-index: 1;
    margin: 0 auto;
    padding: $h-topbar $h-topbar 0;
    max-width: 960px;
  }

  .comment-wrap {
    position: relative;
    z-index: 1;
    @include themeify {
      background-color: Color(--bg-color_main);
    }
  }

  .comment-container {
    margin: 0 auto;
    padding: $main-padding $h-topbar calc(#{$h-playbar + $h-topbar});
    max-width: 960px;
  }
}
</style>
