<template>
  <div class="recommend">
    <Banner :banners="banners" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue'

import Banner from '@/components/Banner/index.vue'
import { BannerListTypes, getBannerList_ } from '@/api/discovery'

export default defineComponent({
  name: 'Recommend',
  components: { Banner },

  setup() {
    const state = reactive({
      banners: [] as BannerListTypes['banners']
    })

    async function getBanners() {
      const { data: res } = await getBannerList_()
      state.banners = res.banners
    }

    onBeforeMount(() => {
      getBanners()
    })

    return { ...toRefs(state) }
  }
})
</script>

<style lang="scss" scoped></style>
