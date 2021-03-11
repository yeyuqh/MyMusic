<template>
  <div class="recommend">
    <div class="banner-container"><Banner :banners="banners" /></div>

    <div class="playlist-container">
      <CoverList v-if="rcmdPlaylists.length" title="推荐歌单">
        <template v-for="(item, index) of rcmdPlaylists" :key="index">
          <CoverItem height="100%" :pic-url="item.picUrl" :img-w="200" :name="item.name" :play-count="item.playCount" />
        </template>
      </CoverList>
    </div>

    <div class="newsong-container">
      <CoverList
        v-if="rcmdNewSongs.length"
        title="最新音乐"
        :grid-auto-fill="false"
        :grid-col-num="2"
        grid-col-gap="25px"
      >
        <CoverItemCol :list="rcmdNewSongs" />
      </CoverList>
    </div>

    <div class="exclusive-container">
      <CoverList v-if="rcmdExclusiveVideos.length" title="独家放送" :grid-auto-fill="false">
        <template v-for="(item, index) of rcmdExclusiveVideos" :key="index">
          <CoverItem height="37%" :pic-url="item.picUrl" :img-w="405" :img-h="150" :name="item.name" />
        </template>
      </CoverList>
    </div>

    <div class="mv-container">
      <CoverList v-if="rcmdMVs.length" title="推荐MV" :grid-auto-fill="false">
        <template v-for="(item, index) of rcmdMVs" :key="index">
          <CoverItem
            height="56%"
            :pic-url="item.picUrl"
            :img-w="355"
            :img-h="200"
            :name="item.name"
            :play-count="item.playCount"
          />
        </template>
      </CoverList>
    </div>

    <Divider />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, shallowReactive, toRefs } from 'vue'

import Banner from '@/components/Banner/index.vue'
import CoverList from '@/components/CoverList/index.vue'
import CoverItem from '@/components/CoverList/components/CoverItem.vue'
import CoverItemCol from '@/components/CoverList/components/CoverItemCol.vue'

import {
  BannerListTypes,
  ExclusiveVideoTypes,
  getBanners_,
  getRcmdExclusiveVideos_,
  getRcmdMVs_,
  getRcmdNewSongs_,
  getRcmdPlaylists_,
  RcmdMVTypes,
  RcmdNewSongTypes,
  RcmdPlaylistTypes
} from '@/api/discovery'

export default defineComponent({
  name: 'Recommend',
  components: { Banner, CoverList, CoverItem, CoverItemCol },

  setup() {
    const state = shallowReactive({
      loding: true,
      banners: [] as BannerListTypes['banners'],
      rcmdPlaylists: [] as RcmdPlaylistTypes['result'],
      rcmdExclusiveVideos: [] as ExclusiveVideoTypes['result'],
      rcmdNewSongs: [] as RcmdNewSongTypes['result'],
      rcmdMVs: [] as RcmdMVTypes['result']
    })

    async function getRcmdData() {
      const { data: banners } = await getBanners_()
      state.banners = banners.banners

      const { data: rcmdPlaylists } = await getRcmdPlaylists_(12)
      state.rcmdPlaylists = rcmdPlaylists.result

      const { data: rcmdExclusiveVideos } = await getRcmdExclusiveVideos_(4)
      state.rcmdExclusiveVideos = rcmdExclusiveVideos.result

      const { data: rcmdNewSongs } = await getRcmdNewSongs_()
      state.rcmdNewSongs = rcmdNewSongs.result

      const { data: rcmdMVs } = await getRcmdMVs_()
      state.rcmdMVs = rcmdMVs.result

      state.loding = false
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
