<template>
  <div class="recommend">
    <div class="banner-container"><Banner :banners="banners" /></div>

    <div class="playlist-container">
      <CoverList v-if="playlists.length" title="推荐歌单">
        <template v-for="(playlist, index) of playlists" :key="index">
          <CoverItem
            :id="playlist.id"
            :name="playlist.name"
            :pic-url="playlist.picUrl"
            :play-count="playlist.playCount"
            height="100%"
            img-size="200y200"
          />
        </template>
      </CoverList>
    </div>

    <div class="newsong-container">
      <CoverList v-if="newSongs.length" title="最新音乐" :grid-auto-fill="false" :grid-col-num="2" grid-col-gap="25px">
        <CoverItemCol :data-list="newSongs" />
      </CoverList>
    </div>

    <div class="exclusive-container">
      <CoverList v-if="exclusiveVideos.length" title="独家放送" :grid-auto-fill="false">
        <template v-for="(video, index) of exclusiveVideos" :key="index">
          <CoverItem height="37%" :pic-url="video.picUrl" img-size="405y150" :name="video.name" />
        </template>
      </CoverList>
    </div>

    <div class="mv-container">
      <CoverList v-if="mvs.length" title="推荐MV" :grid-auto-fill="false">
        <template v-for="(mv, index) of mvs" :key="index">
          <CoverItem height="56%" :pic-url="mv.picUrl" img-size="355y200" :name="mv.name" :play-count="mv.playCount" />
        </template>
      </CoverList>
    </div>

    <Loading v-if="Loading" :top="50" />
    <Divider v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, shallowReactive, toRefs } from 'vue'

import Banner from '@/components/Banner/index.vue'
import CoverList from '@/components/CoverList/index.vue'
import CoverItem from '@/components/CoverList/components/CoverItem.vue'
import CoverItemCol from '@/components/CoverList/components/CoverItemCol.vue'

import { BannerListTypes, getBanners_ } from '@/api/other'
import { getRcmdPlaylists_, RcmdPlaylistsTypes } from '@/api/playlist'
import { getRcmdNewSongs_, RcmdNewSongTypes } from '@/api/song'
import { ExclusiveVideoTypes, getExclusiveVideos_, getRcmdMVs_, RcmdMVTypes } from '@/api/mv'

export default defineComponent({
  name: 'Recommend',
  components: { Banner, CoverList, CoverItem, CoverItemCol },

  setup() {
    const state = shallowReactive({
      Loading: true,

      banners: [] as BannerListTypes['banners'],
      playlists: [] as RcmdPlaylistsTypes['result'],
      exclusiveVideos: [] as ExclusiveVideoTypes['result'],
      newSongs: [] as RcmdNewSongTypes['result'],
      mvs: [] as RcmdMVTypes['result']
    })

    async function getRcmdData() {
      const { data: banners } = await getBanners_()
      state.banners = banners.banners

      const { data: Playlists } = await getRcmdPlaylists_(12)
      state.playlists = Playlists.result

      const { data: exclusiveVideos } = await getExclusiveVideos_(4)
      state.exclusiveVideos = exclusiveVideos.result

      const { data: newSongs } = await getRcmdNewSongs_()
      state.newSongs = newSongs.result

      const { data: mvs } = await getRcmdMVs_()
      state.mvs = mvs.result

      state.Loading = false
    }

    onBeforeMount(() => {
      getRcmdData()
    })

    return { ...toRefs(state) }
  }
})
</script>

<style lang="scss" scoped>
.recommend {
  > :nth-child(n + 2) {
    margin-top: 50px;
  }
}
</style>
