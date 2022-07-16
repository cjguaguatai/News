<template>
  <div class="my">
    <header>
      <div v-if="isLogin" class="user-info banner">
        <!-- 占位 -->
        <van-row></van-row>
        <!-- 头像栏 -->
        <van-row>
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="info.photo"
              />
              <span class="mobile">{{ info.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button class="code-btn" size="mini" round
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <!-- 用户文章数量 -->
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条"
              ><i slot="icon">{{ info.art_count }}</i></van-grid-item
            >
            <van-grid-item text="粉丝"
              ><i slot="icon">{{ info.fans_count }}</i></van-grid-item
            >
            <van-grid-item text="关注"
              ><i slot="icon">{{ info.follow_count }}</i></van-grid-item
            >
            <van-grid-item text="获赞"
              ><i slot="icon">{{ info.like_count }}</i></van-grid-item
            >
          </van-grid>
        </van-row>
      </div>
      <div v-else class="login-register banner">
        <div class="wrap" @click="$router.push('/login')">
          <img src="@/assets/素材/mobile.png" alt="" />
          <span>登录/注册</span>
        </div>
      </div>
    </header>
    <!-- 主题 -->
    <main>
      <!-- 历史/搜索 -->
      <div>
        <van-grid :column-num="2" class="grid" clickable>
          <van-grid-item text="收藏"
            ><i slot="icon" class="iconfont icon-shoucang"></i
          ></van-grid-item>
          <van-grid-item text="历史"
            ><i slot="icon" class="iconfont icon-lishi"></i
          ></van-grid-item>
        </van-grid>
      </div>
      <!-- 消息通知/小智同学 -->
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <van-button v-if="isLogin" block class="login-btn" @click="logoutFn"
      >退出按钮</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      info: ''
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.userToken.token
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    logoutFn () {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否退出登陆'
        })
        .then(() => {
          this.$store.commit('setUserToken', {})
        })
        .catch(() => {})
    },
    // 获取用户信息
    async getUser () {
      if (this.isLogin) {
        const {
          data: { data } // 多次解构
        } = await getUserInfo()
        console.log(data)
        this.info = data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.banner {
  background: url(@/assets/素材/banner.png) no-repeat;
  background-size: cover;
  width: 100%;
  height: 400px;
}
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }

  .code-row {
    height: 133.4px;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}

// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .iconfont {
      font-size: 0.6rem;

      &.icon-lishi {
        color: #ffb31d;
      }
      &.icon-shoucang {
        color: #ed5253;
      }
    }
  }
}
.login-btn {
  /deep/.van-button__text {
    color: red;
  }
}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    img {
      width: 160px;
      height: 160px;
      margin-bottom: 10px;
    }
  }
}
</style>
