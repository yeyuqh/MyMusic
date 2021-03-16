<template>
  <div class="theme">
    <el-popover :append-to-body="false" placement="bottom" trigger="click" popper-class="theme-popper">
      <template #reference>
        <button class="btn-theme"><Icon name="theme" /></button>
      </template>

      <ul class="theme__list">
        <li
          v-for="theme of themes"
          :key="theme.name"
          :class="['theme__item', { 'is-active': theme.name === currentTheme }]"
          @click="onClickThemeItem(theme.name)"
        >
          <i :class="['theme-icon', theme.name]"></i>
          <p>{{ theme.title }}</p>
        </li>
      </ul>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted } from 'vue'
import { useStore } from '@/store'
import { AllMTypes } from '@/store/types'
import { ThemeTypes } from '@/store/modules/layout/types'

export default defineComponent({
  name: 'Theme',

  setup() {
    function hh(e: HTMLElement) {
      console.log(e)
    }
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

    function onClickThemeItem(theme: ThemeTypes) {
      // auto
      if (theme === ThemeTypes.auto && !isAutoChange) {
        isAutoChange = true
        mql.addEventListener('change', setAutoChangeTheme)
        setAutoChangeTheme()

        // lignt | dark
      } else if (theme !== ThemeTypes.auto) {
        isAutoChange = false
        mql.removeEventListener('change', setAutoChangeTheme)
        changeTheme(theme)
      }

      store.commit(AllMTypes.ChangeTheme, theme)
    }

    onMounted(() => {
      onClickThemeItem(currentTheme.value)
    })

    nextTick(() => {
      document.body.style.transition = 'background-color 0.3s'
    })

    return { themes, currentTheme, onClickThemeItem, hh }
  }
})
</script>

<style lang="scss" scoped>
.theme {
  .btn-theme {
    font-size: $fs_xl;

    &:hover {
      @include themeify {
        color: Color(--font-color_gray);
      }
    }
  }
}

.theme__list {
  width: 150px;
  @include flex-between;
}
</style>

<style lang="scss">
.theme-popper {
  .theme__item {
    display: inline-block;
    width: 33.3%;
    cursor: pointer;
    font-size: $fs_xs;
    text-align: center;

    .theme-icon {
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

    &.is-active {
      color: $red;

      .theme-icon {
        border-color: $red;
      }
    }
  }
}
</style>
