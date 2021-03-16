<template>
  <div class="playlist">
    <div class="playlist__header">
      <img class="background-img" :src="HQPlaylists.coverImgUrl" alt="" />
      <div class="cover"><img :src="HQPlaylists.coverImgUrl" alt="" /></div>

      <div class="header__r">
        <div class="type">精品歌单</div>
        <h2 class="title">{{ HQPlaylists.name }}</h2>
        <p v-if="HQPlaylists.copywriter" class="copywriter">{{ HQPlaylists.copywriter }}</p>
      </div>
    </div>

    <div class="tabs-container">
      <div class="default-tabs">
        <a
          v-for="tab of defaultTabs"
          :key="tab"
          :class="['tab', { active: tab === currentCat }]"
          href="javascript:;"
          @click="onClickTab(tab)"
          >{{ tab }}
        </a>
      </div>
    </div>

    <div class="playlist-container">
      <CoverList v-show="playlists.length">
        <template v-for="(playlist, index) of playlists" :key="index">
          <CoverItem
            :id="playlist.id"
            :name="playlist.name"
            :pic-url="playlist.coverImgUrl"
            :play-count="playlist.playCount"
            height="100%"
            img-size="200y200"
          />
        </template>
      </CoverList>
    </div>

    <Loading v-if="loading" />
    <el-pagination
      v-else
      small
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="pageNum"
      @current-change="onClickPageNumBtn"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, shallowReactive, toRefs, watch } from 'vue'

import CoverList from '@/components/CoverList/index.vue'
import CoverItem from '@/components/CoverList/components/CoverItem.vue'

import {
  getHQPlaylists_,
  getPlaylistCatlist_,
  getPlaylists_,
  HQPlaylistTypes,
  PlaylistCatlistTypes,
  PlaylistTypes
} from '@/api/playlist'

export default defineComponent({
  name: 'Playlist',
  components: { CoverList, CoverItem },

  setup() {
    const state = shallowReactive({
      loading: true,
      currentCat: '全部歌单',
      catlistSub: [] as PlaylistCatlistTypes['sub'],
      playlists: [] as PlaylistTypes['playlists'],
      HQPlaylists: {} as HQPlaylistTypes['playlists'][0],
      total: 0,
      pageNum: 1,
      pageSize: 60
    })

    const defaultTabs = ['全部歌单', '华语', '流行', '经典', '民谣', '古风', '乡村', '古典', '民族', '影视原声']

    function onClickTab(tab: string) {
      state.currentCat = tab
    }

    async function getHQPlaylists() {
      const { data: res } = await getHQPlaylists_(state.currentCat, 1)
      state.HQPlaylists = res.playlists[0]
    }

    async function getPlaylistCatlist() {
      const { data: res } = await getPlaylistCatlist_()
      state.catlistSub = res.sub
    }

    async function getPlaylists() {
      state.playlists.length = 0
      state.loading = true
      const { data: res } = await getPlaylists_(state.currentCat, state.pageNum, state.pageSize).finally(() => {
        state.loading = false
      })

      state.playlists = res.playlists
      state.total = res.total
    }

    function onClickPageNumBtn(pageNum: number) {
      state.pageNum = pageNum
      getPlaylists()
    }

    onBeforeMount(() => {
      getPlaylistCatlist(), getPlaylists(), getHQPlaylists()
    })

    watch(
      () => state.currentCat,
      () => {
        state.playlists.length = 0
        getPlaylists()
        getHQPlaylists()
      }
    )

    return { ...toRefs(state), defaultTabs, onClickTab, onClickPageNumBtn }
  }
})
</script>

<style lang="scss" scoped>
.playlist__header {
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  padding: 15px;
  width: 100%;
  border-radius: $radius_3;
  @include flex-between(row, flex-start);

  .background-img {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(50px);
  }

  .cover {
    width: 150px;
    height: 150px;

    img {
      width: 100%;
      height: 100%;
      border-radius: $radius_2;
    }
  }

  .header__r {
    overflow: hidden;
    flex: 1;
    padding-left: 15px;
    color: $white;
    user-select: text;

    .type {
      display: inline-block;
      margin-bottom: 10px;
      padding: 5px 25px;
      font-size: $fs_xm;
      color: #e4a959;
      border: 1px solid #e4a959;
      border-radius: 50px;
    }

    .title {
      width: 100%;
      @include ellipsis;
    }

    .copywriter {
      width: 100%;
      line-height: 2.5em;
      @include ellipsis;
    }
  }
}

.tabs-container {
  margin: 25px 0;
  @include flex-between;
}

.default-tabs {
  .tab {
    margin: 0 10px;

    &.active {
      color: $red;
    }

    &:first-child {
      margin-left: 0;
    }
  }
}

.playlist-container {
  margin-bottom: 25px;
}
</style>
