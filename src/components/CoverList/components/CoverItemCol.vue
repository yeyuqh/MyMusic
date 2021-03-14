<template>
  <ul v-for="(colItems, colIndex) of columnList" :key="colIndex" class="cover-item-col">
    <li v-for="(colItem, colItemIndex) of colItems" :key="colItemIndex" class="col__item">
      <div class="cover"><el-image :src="utils.getImage(colItem.picUrl, '120y120')" lazy /></div>

      <div class="col__item-r">
        <span class="item__index">{{ formatterIndex(colIndex, colItemIndex) }}</span>

        <div class="song-detail">
          <p class="song-name">
            {{ colItem.name }}
            <span v-if="colItem.song.alias.length" class="song-alias">{{ `(${colItem.song.alias[0]})` }}</span>
          </p>
          <p class="song-artist">
            <template v-for="(artist, arIndex) of colItem.song.artists" :key="arIndex">
              <i v-if="arIndex > 0"> / </i><a href="javascript:;"> {{ artist.name }}</a>
            </template>
          </p>
        </div>

        <button v-if="colItem.song.mvid" class="btn-video"><Icon name="video" /></button>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { utils } from '@/utils'

import { RcmdNewSongTypes } from '@/api/song'

export default defineComponent({
  name: 'ColumnsList',
  props: {
    dataList: {
      type: Array as PropType<RcmdNewSongTypes['result']>,
      default: () => []
    }
  },

  setup(props) {
    const limit = computed(() => Math.ceil(props.dataList.length / 2))
    const columnList = computed(() => {
      return [props.dataList.slice(0, limit.value), props.dataList.slice(limit.value)]
    })

    function formatterIndex(listIndex: number, index: number) {
      return listIndex * limit.value + index + 1
    }

    return { utils, columnList, formatterIndex }
  }
})
</script>

<style lang="scss" scoped>
.col__item {
  position: relative;
  padding: 10px 0;
  border-top: 1px solid;
  cursor: pointer;
  @include flex-between;
  @include themeify {
    border-color: Color(--main-hvcolor);
  }

  &:last-child {
    border-bottom: 1px solid;
    @include themeify {
      border-color: Color(--main-hvcolor);
    }
  }

  .cover {
    overflow: hidden;
    width: 65px;
    height: 65px;
    border-radius: $radius_2;

    img {
      width: 100%;
      height: 100%;
      border-radius: $radius_2;
    }
  }

  // hover
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: -1px;
    left: -10px;
    z-index: -1;
    padding: 0 10px;
    width: 100%;
    height: calc(100% + 2px);
    opacity: 0;
    border-radius: $radius_3;
    transition: opacity 0.3s !important;
    @include themeify {
      background-color: Color(--main-hvcolor);
    }
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
}

.col__item-r {
  box-sizing: border-box;
  flex: 1;
  padding: 0 15px;
  @include flex-between(row, flex-start);

  .item__index {
    display: inline-block;
    width: 35px;
  }

  .song-detail {
    box-sizing: border-box;
    padding-right: 15px;
    width: 80%;

    > p {
      width: 100%;
      line-height: 2em;
      @include ellipsis-lines(1);
    }

    .song-alias {
      color: $gray_1;
    }

    .song-artist {
      color: $gray_1;
      font-size: $fs_xs;
    }
  }

  .btn-video {
    color: $red;
    font-size: $fs_l;

    &:hover {
      filter: brightness(120%);
    }
  }
}
</style>
