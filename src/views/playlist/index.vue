<template>
  <div v-if="detail.name" class="playlist">
    <div class="header-container"><PlaylistHeader :data="detail" /></div>

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

    <div class="songlist-container"><Songlist :songlist="songlist" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, shallowReactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

import PlaylistHeader from './components/PlaylistHeader.vue'
import Songlist from './components/Songlist.vue'

import { utils } from '@/utils'

import { getPlaylistDetail_, PlaylistDetailTypes } from '@/api/playlist'
import { getSongsDetail_, SongsDetailTypes } from '@/api/song'

export default defineComponent({
  name: 'PlaylistDetail',
  components: { PlaylistHeader, Songlist },

  setup() {
    const route = useRoute()

    const defTab = 'Songlist' // 默认 Tab
    const tabs = [
      { name: '歌曲列表', component: 'Songlist' },
      { name: '评论', component: 'Comment', count: true }
    ]

    const state = shallowReactive({
      currentTab: defTab,
      commentCount: '0',
      id: route.query.id as string,
      detail: {} as PlaylistDetailTypes['playlist'],
      songlist: [] as SongsDetailTypes['songs'],
      songIds: ''
    })

    function onClickTab(tab: any) {
      state.currentTab = tab.props.name
    }

    async function getPlaylistDetail() {
      const { data: detail } = await getPlaylistDetail_(Number(state.id))
      state.detail = detail.playlist
      state.commentCount = detail.playlist.commentCount.toString()

      const songsId = detail.playlist.trackIds
      const ids: number[] = []
      for (let i = 0, len = songsId.length; i < len; i++) {
        ids.push(songsId[i].id)
      }

      const _ids = ids.toString()
      const { data: songlist } = await getSongsDetail_(_ids)
      state.songlist = songlist.songs
      state.songIds = _ids
    }

    onBeforeMount(() => {
      getPlaylistDetail()
    })

    return { utils, ...toRefs(state), tabs, defTab, onClickTab }
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
      color: Color(--font-color_00);
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
