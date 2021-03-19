<template>
  <div v-if="detail.name" class="playlist">
    <div class="header-container"><Header :ids="songIds" :data="detail" /></div>

    <div class="tabs-container">
      <el-tabs v-model="defTab" @tab-click="onClickTab">
        <el-tab-pane v-for="tab in tabs" :key="tab.component" :name="tab.component">
          <template #label>
            <span>
              {{ tab.name }}
              <span v-if="tab.count" class="count">({{ commentCount }})</span>
            </span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="tabs__component-container">
      <component :is="currentTab" :id="id" :songlist="songlist" :type="CommentRequestTypes.playlist" :top="25" />
      <Loading v-if="pageNum !== 1 && loading" :top="25" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUnmounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { utils } from '@/utils'

import Header from './components/Header.vue'
import Songlist from './components/Songlist.vue'
import Comment, { CommentRequestTypes } from '@/components/Comment/index.vue'

import { getPlaylistDetail_, PlaylistDetailTypes } from '@/api/playlist'
import { getSongsDetail_, SongsDetailTypes } from '@/api/song'

export default defineComponent({
  name: 'PlaylistDetail',
  components: { Header, Songlist, Comment },

  setup() {
    const route = useRoute()

    const defTab = 'Songlist' // 默认 Tab
    const tabs = [
      { name: '歌曲列表', component: 'Songlist' },
      { name: '评论', component: 'Comment', count: true }
    ]

    const state = reactive({
      currentTab: defTab,
      commentCount: '0',
      id: route.query.id as string,
      detail: {} as PlaylistDetailTypes['playlist'],
      songlist: [] as SongsDetailTypes['songs'],
      songIds: '',
      pageNum: 1,
      pageSize: 50,
      total: 0,
      loading: false
    })

    function onClickTab(tab: any) {
      state.currentTab = tab.props.name
    }

    let trackIds: PlaylistDetailTypes['playlist']['trackIds']
    async function getPlaylistDetail() {
      state.loading = true

      const { data: detail } = await getPlaylistDetail_(Number(state.id))
      state.detail = detail.playlist
      state.commentCount = detail.playlist.commentCount.toString()

      trackIds = detail.playlist.trackIds
      state.total = Math.ceil(trackIds.length / state.pageSize)

      const ids: number[] = []
      const _trackIds = trackIds.slice((state.pageNum - 1) * state.pageSize, state.pageNum * state.pageSize)
      for (let i = 0, len = _trackIds.length; i < len; i++) {
        ids.push(_trackIds[i].id)
      }

      const _ids = ids.toString()
      const { data: songlist } = await getSongsDetail_(_ids).finally(() => (state.loading = false))
      state.songlist.push(...songlist.songs)
      state.songIds = _ids

      if (state.pageNum < state.total) state.pageNum++
    }

    let timer: any
    function handleScrollGetNextSonglist() {
      if (state.pageNum === state.total) return
      clearTimeout(timer)
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      timer = setTimeout(() => {
        console.log(1)

        if (scrollHeight - clientHeight - scrollTop < 200) getPlaylistDetail()
      }, 30)
    }

    onBeforeMount(() => {
      getPlaylistDetail()
      window.addEventListener('scroll', handleScrollGetNextSonglist)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScrollGetNextSonglist)
    })

    return { utils, CommentRequestTypes, ...toRefs(state), tabs, defTab, onClickTab }
  }
})
</script>

<style lang="scss" scoped>
.tabs-container {
  margin-top: 25px;
}
</style>

<style lang="scss">
.el-tabs {
  .el-tabs__header {
    margin: 0;
  }

  .el-tabs__nav-wrap {
    &::after {
      @include themeify {
        background-color: Color(--border-color_00);
      }
    }
  }

  .el-tabs__item {
    padding: 0 10px;
    height: 30px;
    font-weight: normal;
    line-height: 30px;
    @include themeify {
      color: Color(--font-color_primary);
    }

    .count {
      font-size: $fs_s;
      color: $gray;
    }

    &:hover {
      color: $red;

      .count {
        color: $red;
      }
    }

    &.is-active {
      color: $red;

      .count {
        color: $red;
      }
    }
  }
}
</style>
