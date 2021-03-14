<template>
  <li class="cover-item" @click="goPlaylistDetail(id)">
    <div class="cover" :style="`padding-top: ${height}`">
      <el-image :src="utils.getImage(picUrl, imgSize)" lazy />
      <span v-if="playCount" class="info">
        <Icon name="arrow-r_fill" />
        {{ utils.numberFormatter(playCount) }}
      </span>
    </div>
    <a href="javascript:;" class="name">{{ name }}</a>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { utils } from '@/utils'

export default defineComponent({
  name: 'MVCard',
  props: {
    id: { type: Number, default: 0 },
    picUrl: { type: String, required: true },
    imgSize: { type: String, default: null },
    name: { type: String, default: '' },
    playCount: { type: Number, default: null },
    height: { type: String, default: '0' } // 容器高度百分比
  },

  setup() {
    const router = useRouter()

    function goPlaylistDetail(id: number) {
      router.push({
        path: '/playlist',
        query: { id: id }
      })
    }
    return { utils, goPlaylistDetail }
  }
})
</script>

<style lang="scss" scoped>
.cover-item {
  .cover {
    display: table;
    position: relative;
    width: 100%;
    cursor: pointer;
    border-radius: $radius_2;
    transition: transform 0.3s;

    .el-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      border-radius: $radius_2;
    }

    .info {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 10px;
      font-size: $fs_xs;
      line-height: 2em;
      color: $white;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 0 $radius_2;
      backdrop-filter: blur(5px);

      #icon {
        position: relative;
        top: -2px;
        font-size: $fs_s;
      }
    }

    &:hover {
      transform: scale(1.1);
      transition: transform 0.3s;
    }
  }

  .name {
    margin-top: 3px;
    font-size: 13px;
    @include ellipsis-lines;
  }
}
</style>
