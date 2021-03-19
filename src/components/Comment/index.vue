<template>
  <div :ref="refCommentBox_$" class="comment" :style="{ 'padding-top': top + 'px' }">
    <header v-if="header" class="header-container">
      <h2>听友评论</h2>
      <span class="count">{{ `(已有${total}条评论)` }}</span>
    </header>

    <div v-if="hotComments && hotComments.length" class="hot-comment-container">
      <h4>精彩评论</h4>
      <CommentList :comments="hotComments" />
    </div>

    <div v-if="comments.length > 0" class="new-comment-container">
      <h4>最新评论</h4>
      <CommentList :comments="comments" />
    </div>

    <div v-if="!isLoading && !comments.length" class="no-comment">暂时还没有评论。</div>

    <el-pagination
      v-if="!isLoading && comments.length > 0"
      background
      small
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="pageNum"
      @current-change="onClickPageNumBtn"
    ></el-pagination>

    <Loading v-if="isLoading" :top="25" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeMount, PropType, shallowReactive, toRefs, watch } from 'vue'

import CommentList from './components/CommentList.vue'

import { getPlaylistComment_, getSongComment_, CommentTypes } from '@/api/comment'

export enum CommentRequestTypes {
  song,
  playlist
}

export default defineComponent({
  name: 'Comment',
  components: { CommentList },
  props: {
    id: { type: [Number, String], required: true }, // 歌曲 | 歌单 ID
    type: { type: Number as PropType<CommentRequestTypes>, required: true }, // 评论类型
    header: { type: Boolean, default: false }, // 是否显示 header
    isBodyScroll: { type: Boolean, default: true }, // 滚动容器是否为 body
    top: { type: Number, default: 0 }
  },

  setup(props) {
    const state = shallowReactive({
      hotComments: [] as CommentTypes['hotComments'],
      comments: [] as CommentTypes['comments'],
      isLoading: true,
      total: 0,
      pageNum: 1,
      pageSize: 30
    })

    let commentBox_$: HTMLElement
    function refCommentBox_$(el: HTMLElement | null) {
      if (el) nextTick(() => (commentBox_$ = el))
    }

    async function getComment() {
      // 评论的类型
      const commentRequestMap = {
        [CommentRequestTypes.song]: getSongComment_,
        [CommentRequestTypes.playlist]: getPlaylistComment_
      }

      if (state.hotComments) state.hotComments.length = 0
      state.comments.length = 0
      state.isLoading = true

      const { data: res } = await commentRequestMap[props.type](props.id, state.pageNum, state.pageSize).finally(() => {
        state.isLoading = false
      })

      state.total = res.total
      state.comments = res.comments
      state.hotComments = res.hotComments

      commentBox_$.style.height = 'auto'
    }

    function onClickPageNumBtn(pageNum: number) {
      commentBox_$.style.height = '200vh'

      // 当滚动容器为 body 时，使用滚动条定位
      if (props.isBodyScroll) document.documentElement.scrollTop = commentBox_$.offsetTop - 60
      else commentBox_$.scrollIntoView() // 当滚动容器不为 body 时，直接定位到该容器的顶部

      state.pageNum = pageNum
      getComment()
    }

    watch(
      () => props.id,
      () => {
        state.pageNum = 1
        getComment()
      }
    )

    onBeforeMount(() => {
      getComment()
    })

    return { ...toRefs(state), onClickPageNumBtn, refCommentBox_$ }
  }
})
</script>

<style lang="scss" scoped>
.comment {
  .header-container {
    margin-bottom: 15px;
    border-bottom: 1px solid $gray;

    h2 {
      display: inline-block;
    }

    .count {
      margin-left: 5px;
      font-size: $fs_xs;
      color: $gray;
    }
  }

  .hot-comment-container {
    margin-bottom: 50px;
  }

  .new-comment-container {
    margin-bottom: 15px;
  }
}
</style>
