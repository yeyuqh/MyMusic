<template>
  <div class="playlist-header">
    <div class="cover">
      <img :src="utils.getImage(data.coverImgUrl, '400y400')" alt="" />
    </div>

    <div class="playlist__detail">
      <h2 class="title"><span class="type">歌单</span>{{ data.name }}</h2>

      <p class="creator">
        <a href="javascript:;" class="link">
          <span class="profile-photo">
            <img :src="utils.getImage(data.creator.avatarUrl, '400y400')" alt="" />
          </span>
          <span class="user-name">{{ data.creator.nickname }}</span>
        </a>
        <span class="create-time">{{ utils.parseTime(data.createTime) }} 创建</span>
      </p>

      <div class="menu-container">
        <el-button size="small" type="primary" round>
          <Icon name="play" />
          播放全部
        </el-button>
        <el-button size="small" round class="el-btn-color ">
          <Icon name="star" />
          收藏 ({{ utils.numberFormatter(data.subscribedCount) }})
        </el-button>
        <el-button size="small" round class="el-btn-color ">
          <Icon name="share" />
          分享 ({{ utils.numberFormatter(data.shareCount) }})
        </el-button>
      </div>

      <p v-if="data.tags.length" class="tags">
        标签:
        <template v-for="(tag, index) of data.tags" :key="index">
          <i v-if="index > 0"> / </i>
          <a href="javascript:;" class="tag link">{{ tag }}</a>
        </template>
      </p>

      <p class="count">
        <span class="song-count">歌曲数: {{ data.trackCount }}</span>
        <span class="play-count"> 播放次数: {{ utils.numberFormatter(data.playCount) }}</span>
      </p>

      <p v-if="data.description" :class="['descrip', { 'is-open': openDescrip === true }]">
        <!-- 此注释用于消除换行产生的空格
        -->简介: {{ data.description }}
        <button
          v-show="openDescripBtnVisible"
          :class="['btn-open', { 'is-open': openDescrip === true }]"
          @click="openDescrip = !openDescrip"
        >
          <Icon name="arrow-d_fill" />
        </button>
      </p>

      <!-- 用于获取简介容器的高度，判断是否需要显示展开按钮 -->
      <div v-if="data.description" :ref="refDescription_$" class="descrip-copy">简介: {{ data.description }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType, reactive, toRefs } from 'vue'

import { utils } from '@/utils'

import { PlaylistDetailTypes } from '@/api/playlist'

export default defineComponent({
  name: 'PlaylistHeader',
  props: {
    data: {
      type: Object as PropType<PlaylistDetailTypes['playlist']>,
      default: () => ({})
    }
  },

  setup() {
    const state = reactive({
      openDescrip: false,
      openDescripBtnVisible: false
    })

    function refDescription_$(el: HTMLElement | null) {
      if (el) {
        nextTick(() => {
          el.offsetHeight > 25 || el.offsetWidth > 780
            ? (state.openDescripBtnVisible = true)
            : (state.openDescripBtnVisible = false) // 780 为简介的最大宽度
        })
      }
    }

    return { utils, ...toRefs(state), refDescription_$, open }
  }
})
</script>

<style lang="scss" scoped>
.playlist-header {
  display: flex;
  width: 100%;

  .cover {
    overflow: hidden;
    position: sticky;
    top: 70px;
    width: 200px;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      border-radius: $radius_2;
    }
  }
}

.playlist__detail {
  flex: 1;
  overflow: hidden;
  margin-left: 30px;
  font-size: 12px;
  line-height: 25px;

  .type {
    display: inline-block;
    position: relative;
    top: -2px;
    margin-right: 10px;
    padding: 0 5px;
    height: 18px;
    font-size: $fs_xs;
    line-height: 20px;
    color: $red;
    border: 1px solid $red;
    border-radius: $radius_2;
  }

  .title {
    user-select: text;
    @include ellipsis;
  }

  .creator {
    margin-top: 10px;
    @include ellipsis;

    .user-name {
      margin: 0 8px;
    }

    .profile-photo {
      display: inline-block;
      overflow: hidden;
      width: 25px;
      height: 25px;
      vertical-align: middle;
      border-radius: 50%;
      background-color: $red;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .menu-container {
    margin: 15px 0;
  }

  .count {
    .play-count {
      margin-left: 10px;
    }
  }

  .descrip {
    position: relative;
    padding-right: 20px;
    height: 22px;
    white-space: pre-line; // 保留原文本格式
    user-select: text;
    @include ellipsis-lines(1);

    &.is-open {
      display: block !important;
      height: auto !important;
    }
  }

  .descrip-copy {
    position: absolute;
    top: -100%;
    left: -100%;
    max-width: 780px;
    visibility: hidden;
    white-space: pre-line;
  }

  .btn-open {
    position: absolute;
    top: 5px;
    right: 0;
    cursor: pointer;
    user-select: none;
    font-size: 10px;
    color: $gray;

    &.is-open {
      transform: rotate(-180deg);
    }
  }
}
</style>

<style lang="scss">
.playlist-header {
  .el-btn-color {
    @include themeify {
      color: Color(--font-color_00);
      background-color: Color(--main-bgcolor);
      border-color: Color(--border-color_00);
    }
  }
}
</style>
