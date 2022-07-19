<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round> <van-icon name="search">搜索</van-icon> </van-button>
      </template>
    </van-nav-bar>
    <!-- tab选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in myChannels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="iconfont icon-gengduo" @click="showPopup"></span>
    </van-tabs>
    <!-- 弹框 -->
    <EditChannelPopup
      ref="popup"
      :myChannels="myChannels"
      @del-myChannel="delMyChannel"
      @change-active="changeActive"
      @add-myChannel="addMyChannel"
    ></EditChannelPopup>
  </div>
</template>

<script>
import {
  getMyChannels,
  getMyChannelsByLocal,
  setMyChannelsByLocal,
  delMyChannel,
  addMyChannel
} from '@/api/channel'

import ArticleList from './component/ArticleList.vue'
import EditChannelPopup from '@/views/Home/component/EditChannelPopup.vue'
export default {
  name: 'Home',
  components: {
    ArticleList,
    EditChannelPopup
  },
  data () {
    return {
      active: 0,
      myChannels: []
    }
  },
  created () {
    this.getMyChannels()
  },
  computed: {
    login () {
      return !!this.$store.state.userToken.token
    }
  },
  methods: {
    async getMyChannels () {
      try {
        if (!this.login) {
          // 离线状态
          const myChannels = getMyChannelsByLocal()
          // 本地有数据
          if (myChannels) {
            this.myChannels = myChannels
          } else {
            // 本地有数据
            const { data } = await getMyChannels()
            this.myChannels = data.data.channels
          }
        } else {
          // 登录状态
          // 带请求头的
          const { data } = await getMyChannels()
          this.myChannels = data.data.channels
        }
      } catch (error) {}
    },
    showPopup () {
      this.$refs.popup.isShow = true
    },
    // 删除频道
    async delMyChannel (id) {
      this.myChannels = this.myChannels.filter((item) => item.id !== id)
      if (!this.login) {
        // 离线状态
        // 数据存储在本地
        setMyChannelsByLocal(this.myChannels)
      } else {
        // 登录状态
        try {
          await delMyChannel(id)
        } catch (error) {
          return this.$toast.fail('删除用户频道失败')
        }
      }
      this.$toast.success('删除用户频道成功')
    },
    changeActive (id) {
      this.active = id
    },
    // 添加频道
    async addMyChannel (add) {
      this.myChannels.push(add)
      if (!this.login) {
        setMyChannelsByLocal(this.myChannels)
      } else {
        // 登录状态
        // 发送接口，添加频道
        try {
          await addMyChannel(add.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
      }
      this.$toast.success('添加频道成功')
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.icon-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  z-index: 99;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/素材/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.icon-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
