<template>
  <ul class="comment-list">
    <li v-for="(comment, index) of comments" :key="index" class="comment-item">
      <div class="profile-photo"><el-image :src="utils.getImage(comment.user.avatarUrl, '50y50')" lazy /></div>
      <div class="comment-content">
        <p>
          <a href="javascript:;">{{ comment.user.nickname }} </a>:
          {{ comment.content }}
        </p>

        <template v-if="comment.beReplied.length">
          <div class="replied">
            <p v-if="comment.beReplied[0].content">
              <a href="javascript:;">@{{ comment.beReplied[0].user.nickname }} </a>:
              {{ comment.beReplied[0].content }}
            </p>
            <div v-else style="text-align: center">该评论已被删除。</div>
          </div>
        </template>

        <div class="info">
          <div class="time">{{ utils.parseTime(comment.time, 16) }}</div>
          <div class="like">
            <button>
              <Icon name="like" />
              <span v-if="comment.likedCount > 0" style="padding-left: 5px">{{ comment.likedCount }}</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { utils } from '@/utils'

import { CommentTypes } from '@/api/comment'

export default defineComponent({
  name: 'CommentList',
  props: {
    comments: {
      type: Array as PropType<CommentTypes['comments']>,
      default: []
    } as const
  },

  setup() {
    return { utils }
  }
})
</script>

<style lang="scss" scpode>
.comment-list {
  font-size: 13px;

  .comment-item {
    display: flex;
    margin-top: 25px;

    &:first-child {
      margin-top: 15px;
    }
  }

  .profile-photo {
    overflow: hidden;
    width: 35px;
    height: 35px;
    background-color: $gray;
    border-radius: 50%;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .comment-content {
    flex: 1;
    margin-left: 15px;
    padding-bottom: 5px;
    height: 100%;
    transition: border-color 0.3s;
    @include themeify {
      border-bottom: 1px solid Color(--border-color_00);
    }

    p {
      user-select: text;
      a {
        @include themeify {
          color: Color(--font-color_link);
        }
      }
    }

    .replied {
      box-sizing: border-box;
      margin-top: 5px;
      padding: 5px;
      width: 100%;
      background-color: $gray;
      border-radius: $radius_2;
      box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
      transition: background-color 0.3s;
      @include themeify {
        background-color: Color(--bg-color_main_striped);
      }
    }

    .info {
      margin-top: 10px;
      font-size: 12px;
      color: $gray;
      @include flex-between;

      .like {
        padding-right: 10px;
      }
    }
  }
}
</style>
