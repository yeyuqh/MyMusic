<template>
  <div class="search-list">
    <div v-if="suggest && suggest.order" class="search-list-wrap">
      <ul v-for="item in suggest.order" :key="item" class="search-suggest">
        <p><Icon :name="searchGroup[item].icon" /> {{ searchGroup[item].name }}</p>
        <li v-for="sug in suggest[item]" :key="sug.id" @click="onClickSuggest(sug)">
          {{ sug.name }} <span v-if="sug.artist || sug.artists"> - </span>

          <!-- 歌曲作者 -->
          <template v-if="sug.artists">
            <span v-for="(artist, index) of sug.artists" :key="artist.id">
              <span v-if="index !== 0">/</span>
              {{ artist.name }}
            </span>
          </template>

          <!-- 专辑作者 -->
          <span v-if="sug.artist">{{ sug.artist.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchList',
  props: {
    suggest: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['clickSuggest'],

  setup(props, ctx) {
    const searchGroup: any = {
      songs: { name: '单曲', icon: 'music' },
      artists: { name: '歌手', icon: 'music' },
      albums: { name: '专辑', icon: 'music' },
      playlists: { name: '歌单', icon: 'music' }
    }

    function onClickSuggest(sug: any) {
      ctx.emit('clickSuggest', sug)
    }

    return { searchGroup, onClickSuggest }
  }
})
</script>

<style lang="scss" scoped>
.search-list {
  box-sizing: border-box;
  overflow-y: auto;
  padding: 35px 15px 15px;
  width: 350px;
  height: 100%;
  box-shadow: -5px 0 8px -5px rgba(30, 30, 30, 0.5);
  @include scrollbar-style;
  @include themeify {
    color: Color(--font-color_primary);
    background-color: Color(--bg-color_aside);
  }
}

.search-suggest {
  margin-bottom: 25px;

  p {
    margin-bottom: 10px;
    color: $gray;
    @include themeify {
      border-bottom: 1px solid Color(--border-color_00);
    }
  }

  li {
    padding: 0 10px 0;
    font-size: 13px;
    line-height: 2em;
    cursor: pointer;
    @include ellipsis;

    &:hover {
      color: $red;
    }
  }
}
</style>
