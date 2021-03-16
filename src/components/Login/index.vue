<template>
  <div class="login">
    <div class="profile-photo">
      <Icon v-if="!user" name="user" />
      <img v-else :src="user.avatarUrl" />
    </div>

    <el-popover
      :append-to-body="false"
      placement="right-start"
      trigger="hover"
      popper-class="user__popper"
      :disabled="!user"
      :enterable="true"
      :show-after="200"
    >
      <template #reference>
        <div class="user-name" @click="onClickUserName">
          {{ !user ? '未登录' : user.nickname }} <Icon v-show="user" name="arrow-r_fill" />
        </div>
      </template>

      <div class="user-info">
        <p><span>动态</span><span>99</span></p>
        <el-divider direction="vertical" />
        <p><span>关注</span><span>99</span></p>
        <el-divider direction="vertical" />
        <p><span>粉丝</span><span>99</span></p>
      </div>

      <button class="btn-logout" @click="onClickLogoutBtn"><Icon name="logout" /> 退出登录</button>
    </el-popover>

    <!-- 登录弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      width="300px"
      title="手机号登录"
      :append-to-body="true"
      custom-class="login__dialog"
      destroy-on-close
      :show-close="false"
      @close="handleDialogClose"
    >
      <el-input v-model="phone" autofocus placeholder="请输入手机号"></el-input>
      <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
      <div class="msg">{{ msg }}</div>
      <el-button type="primary" round size="small" @click="onClickLoginBtn">登录</el-button>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, reactive, toRefs } from 'vue'
import { useStore } from '@/store'
import { AllATypes } from '@/store/types'

export default defineComponent({
  name: 'Login',

  setup() {
    const store = useStore()

    const state = reactive({
      dialogVisible: false,
      phone: null as number | null,
      password: null as string | null,
      msg: null as string | null
    })

    const user = computed(() => store.getters.user)

    function onClickUserName() {
      if (user.value) return
      state.dialogVisible = true
    }

    function onClickLoginBtn() {
      const phoneRE = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/

      if (!state.phone) {
        state.msg = '请输入手机号'
        return
      } else if (!phoneRE.test(state.phone.toString())) {
        state.msg = '请输入正确的手机号'
        return
      } else if (!state.password) {
        state.msg = '请输入密码'
        return
      }

      store
        .dispatch(AllATypes.LOGIN, { phone: state.phone, password: state.password })
        .then(() => {
          state.dialogVisible = false
        })
        .catch((err) => {
          state.msg = err
        })
    }

    function onClickLogoutBtn() {
      store.dispatch(AllATypes.LOGOUT)
    }

    function handleDialogClose() {
      state.msg = null
    }

    // 登录状态查询
    async function getLoginStatus() {
      store.dispatch(AllATypes.GET_LOGIN_STATUS)
    }

    onBeforeMount(() => {
      getLoginStatus()
    })

    return { ...toRefs(state), user, onClickUserName, onClickLoginBtn, onClickLogoutBtn, handleDialogClose }
  }
})
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  padding: 10px;
  font-size: $fs_xm;

  .profile-photo {
    overflow: hidden;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 50%;
    @include themeify {
      background-color: Color(--sidebar-active);
    }

    #icon {
      font-size: 30px;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .user-name {
    padding-left: 10px;
    cursor: pointer;
    @include flex-center;

    #icon {
      position: relative;
      top: -1px;
      padding-left: 5px;
      font-size: $fs_s;
    }
  }
}
</style>

<style lang="scss">
.user__popper {
  .user-info {
    padding: 5px;
    border-bottom: 1px solid;
    @include flex-between;
    @include themeify {
      border-color: Color(--border-color_00);
    }

    p {
      width: 60px;
      @include flex-between(column);
    }
  }

  .btn-logout {
    margin-top: 8px;
    padding: 0 8px;
    width: 100%;
    height: 30px;
    text-align: left;
    border-radius: $radius_2;

    &:hover {
      @include themeify {
        background-color: Color(--bg-color_main_hover);
      }
    }
  }
}

.login__dialog {
  .el-dialog__title {
    @include themeify {
      color: Color(--font-color_primary);
    }
  }

  input {
    margin-bottom: 8px;
    border-radius: 50px;
  }

  .msg {
    position: absolute;
    right: 30px;
    font-size: $fs_xs;
    text-align: right;
    color: $red;
  }

  button {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
