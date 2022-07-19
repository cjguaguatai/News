<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/ "
        ><i slot="icon" class="iconfont icon-shouye"></i> 首页</van-tabbar-item
      >
      <van-tabbar-item to="/video"
        ><i slot="icon" class="iconfont icon-shipin"></i> 视频</van-tabbar-item
      >
      <van-tabbar-item to="/qa"
        ><i slot="icon" class="iconfont icon-wenda"></i> 问答</van-tabbar-item
      >
      <van-tabbar-item to="/profile"
        ><i slot="icon" class="iconfont icon-wode"></i>
        <span>{{
          $store.state.userToken.token ? '我的' : '未登录'
        }}</span></van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  .iconfont {
    font-size: 40px;
  }
}
</style>
