<template>
  <div class="songlist">
    <el-table
      class="songlist__table"
      stripe
      :data="songlist"
      size="mini"
      :row-class-name="customTableRowIndex"
      @row-dblclick="onDblclickRow"
    >
      <el-table-column width="50" align="right">
        <template #default="scope">
          <!-- 列表中正在播放的歌曲 -->
          <div v-if="playingSong && scope.row.id === playingSong.id" class="playing-icon-wrap">
            <PlayingIcon :is-playing="isPlaying" />
          </div>
          <!-- 未在播放的歌曲显示序号 -->
          <div v-else>{{ scope.row.cusRowIndex }}</div>
        </template>
      </el-table-column>

      <el-table-column width="35">
        <Icon name="love" />
      </el-table-column>

      <el-table-column prop="name" label="音乐标题" min-width="130" show-overflow-tooltip></el-table-column>

      <el-table-column label="歌手" show-overflow-tooltip>
        <template #default="scope">
          <template v-for="(artist, index) of scope.row.ar" :key="index">
            <i v-if="index > 0"> / </i><a href="javascript:;"> {{ artist.name }} </a>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="al.name" label="专辑" show-overflow-tooltip></el-table-column>

      <el-table-column prop="dt" :formatter="msFormat" label="时长" width="70"></el-table-column>

      <template #empty><Loading /></template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { AllATypes } from '@/store/types'
import { utils } from '@/utils'

import PlayingIcon from '@/components/PlayingIcon/index.vue'

import { SongsDetailTypes } from '@/api/song'

export default defineComponent({
  name: 'Songlist',
  components: { PlayingIcon },
  props: {
    songlist: {
      type: Array,
      default: () => []
    }
  },

  setup() {
    const store = useStore()

    const playingSong = computed(() => store.getters.playingSong)
    const isPlaying = computed(() => store.getters.isPlaying)

    function customTableRowIndex({ row, rowIndex }: any) {
      let cusRowIndex: string
      if (rowIndex < 9) cusRowIndex = `0${rowIndex + 1}`
      else cusRowIndex = `${rowIndex + 1}`
      row.cusRowIndex = cusRowIndex
    }

    // ms => 02:02
    function msFormat(song: SongsDetailTypes['songs'][0]) {
      return utils.timeFormat(song.dt, 'ms')
    }

    function onDblclickRow(song: SongsDetailTypes['songs'][0]) {
      store.dispatch(AllATypes.ADD_PLAYING_SONG, song.id)
    }

    return { playingSong, isPlaying, customTableRowIndex, msFormat, onDblclickRow }
  }
})
</script>

<style lang="scss" scoped>
.playing-icon-wrap {
  position: relative;
  top: 0px;
  right: -14px;
  width: 15px;
  height: 15px;
}
</style>

<style lang="scss">
.songlist {
  #icon {
    font-size: 15px;
  }

  .el-table td,
  .el-table th.is-leaf {
    border-bottom: none !important;
  }

  .songlist__table {
    color: $gray_1 !important;
    @include themeify {
      color: Color(--font-color_primary);
    }

    th {
      @include themeify {
        background-color: Color(--bg-color_main_striped);
      }
    }

    &:before {
      content: none;
    }
  }

  .el-table__row {
    @include themeify {
      background-color: Color(--bg-color_main);
    }

    &.el-table__row--striped {
      @include themeify {
        background-color: Color(--bg-color_main_striped);
      }
    }

    td {
      padding: 3px 0;
      background: none !important;

      &:nth-child(3) {
        @include themeify {
          color: Color(--font-color_primary);
        }
      }
    }

    .el-table_1_column_1 {
      font-family: 'Monaco', 'Helvetica Neue', 'Helvetica', 'Arial';
    }

    .el-table_1_column_6 {
      font-family: 'Monaco', 'Helvetica Neue', 'Helvetica', 'Arial';
    }
  }

  .el-table--enable-row-hover .el-table__body tr:hover {
    @include themeify {
      background-color: Color(--bg-color_main_hover) !important;
    }
  }

  .el-table__empty-block {
    @include themeify {
      background-color: Color(--bg-color_main);
    }
  }
}
</style>
