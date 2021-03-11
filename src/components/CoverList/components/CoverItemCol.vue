<template>
  <ul v-for="(colItems, colIndex) of columnList" :key="colIndex" class="cover-item-col">
    <li v-for="(item, itemIndex) of colItems" :key="itemIndex" class="col-item">
      <div class="cover"><el-image :src="utils.getImage(item.picUrl, 120)" lazy /></div>

      <div class="col-item_r">
        <span class="index">{{ formatterIndex(colIndex, itemIndex) }}</span>

        <div class="song-detail">
          <p class="name">
            {{ item.name }}
            <span v-if="item.song.alias.length" class="alias">{{ `(${item.song.alias[0]})` }}</span>
          </p>
          <p class="artist">
            <template v-for="(artist, arIndex) of item.song.artists" :key="arIndex">
              <i v-if="arIndex > 0"> / </i><a href="javascript:;"> {{ artist.name }}</a>
            </template>
          </p>
        </div>

        <button v-if="item.song.mvid" class="btn-video"><Icon name="video" /></button>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { utils } from '@/utils'
import { RcmdNewSongTypes } from '@/api/discovery'

export default defineComponent({
  name: 'ColumnsList',
  props: {
    list: {
      type: Array as PropType<RcmdNewSongTypes['result']>,
      default: () => []
    }
  },

  setup(props) {
    const limit = computed(() => Math.ceil(props.list.length / 2))
    const columnList = computed(() => {
      return [props.list.slice(0, limit.value), props.list.slice(limit.value)]
    })

    function formatterIndex(listIndex: number, index: number) {
      return listIndex * limit.value + index + 1
    }

    return { utils, columnList, formatterIndex }
  }
})
</script>

<style lang="scss" scoped>
.col-item {
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
}

.col-item_r {
  box-sizing: border-box;
  flex: 1;
  padding: 0 15px;
  @include flex-between(row, start);

  .index {
    display: inline-block;
    width: 35px;
  }

  .song-detail {
    box-sizing: border-box;
    padding-right: 15px;
    width: 80%;

    > :nth-child(n + 1) {
      width: 100%;
      line-height: 2em;
      @include ellipsis-lines(1);
    }
  }

  .alias {
    color: $gray_1;
  }

  .artist {
    color: $gray_1;
    font-size: $fs_xs;
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
