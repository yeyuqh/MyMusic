<template>
  <div class="banner" @mouseover="stopAutoPlay" @mouseleave="setAutoPlay">
    <ul class="banner-list">
      <li v-for="(banner, index) of banners" :key="index" :class="['banner-item', bannerItemClass(index)]">
        <img :src="banner.imageUrl" alt="" />
        <span :class="['banner-type', banner.titleColor]">{{ banner.typeTitle }}</span>
      </li>

      <transition name="fade">
        <div v-show="arrowVisible" class="arrow-wrap">
          <button class="btn-arrow" @click="onClickPrevBtn"><Icon name="arrow-l" /></button>
          <button class="btn-arrow" @click="onClickNextBtn"><Icon name="arrow-r" /></button>
        </div>
      </transition>
    </ul>

    <div class="dots">
      <span
        v-for="index of banners.length"
        :key="index"
        :class="{ active: index - 1 === currentIndex }"
        @mouseover="currentIndex = index - 1"
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive, toRefs } from 'vue'

import { BannerListTypes } from '@/api/other'

export default defineComponent({
  name: 'Banner',
  props: {
    banners: {
      type: Array as PropType<BannerListTypes['banners']>,
      default: () => [],
      required: true
    } as const
  },

  setup(props) {
    const state = reactive({
      currentIndex: 3,
      arrowVisible: false
    })

    const prev = computed(() => {
      return state.currentIndex === 0 ? props.banners.length - 1 : state.currentIndex - 1
    })
    const next = computed(() => {
      return state.currentIndex === props.banners.length - 1 ? 0 : state.currentIndex + 1
    })

    function bannerItemClass(index: number) {
      switch (index) {
        case state.currentIndex:
          return 'current '
        case prev.value:
          return 'prev'
        case next.value:
          return 'next'
        default:
          return ''
      }
    }

    function onClickPrevBtn() {
      state.currentIndex = prev.value
    }

    function onClickNextBtn() {
      state.currentIndex = next.value
    }

    let timer: any
    function setAutoPlay() {
      state.arrowVisible = false
      timer = setInterval(() => {
        onClickNextBtn()
      }, 6000)
    }
    function stopAutoPlay() {
      state.arrowVisible = true
      clearInterval(timer)
    }

    onMounted(() => {
      setAutoPlay()
    })

    return { ...toRefs(state), bannerItemClass, onClickPrevBtn, onClickNextBtn, setAutoPlay, stopAutoPlay }
  }
})
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;

  .banner-list {
    position: relative;
    width: 100%;
    height: 200px;
    transform-style: preserve-3d;
  }

  .banner-item {
    overflow: hidden;
    position: absolute;
    margin-left: 50%;
    width: 540px;
    height: 100%;
    border-radius: $radius_4;
    transform: translate3d(-50%, 0, -300px) scale(0.8);
    transition: all 0.6s cubic-bezier(0.3, 0.5, 0.3, 1);

    img {
      width: 100%;
      object-fit: cover;
    }

    .banner-type {
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 3px 8px;
      font-size: $fs_xs;
      color: $white;
      border-radius: $radius_3 0;

      &.red {
        background-color: $red;
      }

      &.blue {
        background-color: $blue;
      }
    }

    &.current {
      cursor: pointer;
      transform: translate3d(-50%, 0, 0) scale(1);
    }

    &.prev {
      margin: 0;
      transform-origin: left;
      transform: translate3d(0, 0, -200px) scale(0.8);
    }

    &.next {
      margin: 0 100%;
      transform-origin: right;
      transform: translate3d(-100%, 0, -100px) scale(0.8);
    }

    // 遮罩
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: 0.5;
      transition: opacity 0.6s;
    }

    &.current:after {
      opacity: 0;
    }
  }

  .arrow-wrap {
    height: 100%;
    @include flex-between;

    .btn-arrow {
      padding: 5px;
      font-size: $fs_l;
      color: $gray_1;
    }
  }

  .dots {
    text-align: center;

    span {
      display: inline-block;
      margin: 0 5px;
      width: 6px;
      height: 6px;
      cursor: pointer;
      background-color: $gray_1;
      border-radius: 50%;

      &.active {
        background-color: $red;
      }
    }
  }
}
</style>
