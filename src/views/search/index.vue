<template>
  <div class="search">
    <div class="header">
      <h1>{{ keywords }}</h1>
      <span>已找到 {{ songCount }} 首</span>
    </div>
    <div class="tabs-container">
      <el-tabs v-model="defTab">
        <el-tab-pane v-for="tab in tabs" :key="tab.component" :name="tab.component">
          <template #label>
            <span>{{ tab.name }}</span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="tabs__component-container">
      <Songlist :is="defTab" :songlist="songlist" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'

import Songlist from '@/components/Songlist/index.vue'

import { getSearchResult_, SearchResultTypes } from '@/api/other'

export default defineComponent({
  name: 'Search',
  components: { Songlist },

  setup() {
    const route = useRoute()

    const defTab = 'Songlist' // 默认 Tab
    const tabs = [{ name: '歌曲', component: 'Songlist' }]
    const state = reactive({
      songlist: [] as SearchResultTypes['result']['songs'],
      songCount: 0,
      pageNum: 1,
      pageSize: 50,
      total: 0,
      keywords: computed(() => route.query.keywords as string)
    })

    async function getSearchResult() {
      state.songlist.length = 0

      const { data: res } = await getSearchResult_(state.keywords, 100)

      state.songlist = res.result.songs
      state.songCount = res.result.songCount
    }

    watch(
      () => state.keywords,
      (val) => {
        if (!val) return
        getSearchResult()
      }
    )

    onMounted(() => {
      getSearchResult()
    })

    onBeforeRouteLeave(() => {
      state.keywords = ''
    })

    return { defTab, tabs, ...toRefs(state), getSearchResult }
  }
})
</script>

<style lang="scss" scoped>
.search {
  .header {
    display: flex;

    span {
      align-self: flex-end;
      padding: 5px;
    }
  }
}
</style>
