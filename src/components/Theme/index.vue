<template>
  <div class="theme">
    <el-popover placement="bottom" trigger="click" popper-class="theme-popper">
      <template #reference>
        <button class="btn-theme"><Icon name="theme" /></button>
      </template>

      <button
        v-for="theme of themes"
        :key="theme.name"
        :class="['btn-theme_item', { active: theme.name === currentTheme }]"
        @click="onClickThemeItemBtn(theme.name)"
      >
        <span :class="theme.name"></span>
        <p>{{ theme.title }}</p>
      </button>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted } from 'vue'
import { useStore } from '@/store'
import { AllMType } from '@/store/types'
import { ThemeTypes } from '@/store/modules/layout/types'

export default defineComponent({
  name: 'Theme',

  setup() {
    const store = useStore()

    const themes = [
      { name: ThemeTypes.light, title: '浅色' },
      { name: ThemeTypes.dark, title: '深色' },
      { name: ThemeTypes.auto, title: '跟随系统' }
    ]

    const currentTheme = computed(() => store.getters.theme)

    const mql = window.matchMedia('(prefers-color-scheme: light)')
    let isAutoChange = false

    function changeTheme(theme: ThemeTypes) {
      window.document.documentElement.setAttribute('data-theme', theme)
    }

    function setAutoChangeTheme() {
      const sysTheme = mql.matches ? ThemeTypes.light : ThemeTypes.dark // 获取当前系统主题
      changeTheme(sysTheme)
    }

    function onClickThemeItemBtn(theme: ThemeTypes) {
      // auto
      if (theme === ThemeTypes.auto && !isAutoChange) {
        isAutoChange = true
        mql.addEventListener('change', setAutoChangeTheme)
        setAutoChangeTheme()

        // lignt | dark
      } else {
        isAutoChange = false
        mql.removeEventListener('change', setAutoChangeTheme)
        changeTheme(theme)
      }

      store.commit(AllMType.ChangeTheme, theme)
    }

    onMounted(() => {
      onClickThemeItemBtn(currentTheme.value)
    })

    nextTick(() => {
      const { body } = document
      body.style.transition = 'background-color 0.3s'
    })

    return { themes, currentTheme, onClickThemeItemBtn }
  }
})
</script>

<style lang="scss" scoped>
.theme {
  .btn-theme {
    font-size: $fs_xl;

    &:hover {
      @include themeify {
        color: Color(--font-color_03);
      }
    }
  }
}
</style>

<style lang="scss">
.theme-popper {
  @include flex-between;

  .btn-theme_item {
    width: 33.3%;
    font-size: $fs_xs;

    span {
      box-sizing: border-box;
      display: inline-block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      border: 2px solid $gray_1;

      &.light {
        background-color: $white;
      }

      &.dark {
        background-color: $black;
      }

      &.auto {
        background: linear-gradient(
          90deg,
          rgb(255, 255, 255) 0%,
          rgb(255, 255, 255) 40%,
          rgb(0, 0, 0) 60%,
          rgb(0, 0, 0) 100%
        );
      }
    }

    &.active {
      color: $red;

      span {
        border-color: $red;
      }
    }
  }
}
</style>
