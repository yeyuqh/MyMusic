<template>
  <div class="search-bar">
    <div :ref="refInputContainer_$" class="search-bar__input-container">
      <label for="search">
        <Icon name="search" />
        <input
          id="search"
          v-model.trim="keywords"
          class="input"
          type="text"
          placeholder="搜索"
          @focus="openSearchList"
          @keyup.enter="goToSearchDetail(keywords)"
        />
      </label>
      <transition name="right">
        <div v-if="showSearchList" class="search-list-container">
          <SearchList v-click-outside="hideSearchList" :suggest="suggests" @clickSuggest="onClickSuggest($event)" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { AllATypes } from '@/store/types'
import clickOutside from '@/directives/click-outside'

import SearchList from './components/SearchList.vue'

import { getSuggest_, SuggestTypes } from '@/api/other'

export default defineComponent({
  name: 'SearchBar',
  components: { SearchList },
  directives: { clickOutside },

  setup() {
    const router = useRouter()
    const store = useStore()

    const state = reactive({
      keywords: '',
      suggests: null as SuggestTypes['result'] | null,
      showSearchList: false
    })

    async function getSuggest() {
      const { data: res } = await getSuggest_(state.keywords)
      state.suggests = res.result
    }

    let inputContainer_$: HTMLElement
    function refInputContainer_$(el: HTMLElement | null) {
      if (el) nextTick(() => (inputContainer_$ = el))
    }

    function openSearchList() {
      state.showSearchList = true
    }

    function hideSearchList(e?: MouseEvent) {
      if (e && inputContainer_$.contains(e.target as HTMLElement)) return
      state.showSearchList = false
    }

    function goToSearchDetail(keywords: string) {
      if (keywords === '') return
      router.push({
        path: '/search',
        query: { keywords: keywords }
      })
    }

    function onClickSuggest(sug: any) {
      // 判断点击的是否为歌曲。歌曲直接播放，其他则跳转到搜索详情页
      if (sug.duration) {
        store.dispatch(AllATypes.ADD_PLAYING_SONG, sug.id)
        hideSearchList()
      } else goToSearchDetail(state.keywords)
    }

    let timer: any
    watch(
      () => state.keywords,
      (val) => {
        clearTimeout(timer)
        if (val !== '') {
          timer = setTimeout(() => getSuggest(), 100)
        } else state.suggests = null
      }
    )

    return { ...toRefs(state), refInputContainer_$, openSearchList, hideSearchList, goToSearchDetail, onClickSuggest }
  }
})
</script>

<style lang="scss" scoped>
.search-bar {
  line-height: 50px;

  .search-bar__input-container {
    position: relative;

    #icon {
      position: absolute;
      top: 50%;
      left: 8px;
      cursor: pointer;
      transform: translate(0, -50%);
    }

    .input {
      box-sizing: border-box;
      padding: 0 10px 0 30px;
      width: 150px;
      height: 25px;
      border-radius: 25px;
      font-size: 13px;
      line-height: 25px;
      @include themeify {
        color: Color(--font-color_primary);
        background-color: Color(--bg-color_main_striped);
      }

      &::-webkit-input-placeholder {
        color: $gray;
      }

      &::-moz-placeholder {
        color: $gray;
      }

      &::-ms-input-placeholder {
        color: $gray;
      }
    }
  }

  .search-list-container {
    position: fixed;
    top: 0;
    right: 0;
    z-index: -1;
    height: 100%;
    border-top-left-radius: 8px;
  }
}
</style>
