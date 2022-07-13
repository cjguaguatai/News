<template>
  <div>
    <van-nav-bar title="登录" class="navbar" @click-left="onClickBack">
      <template #left>
        <van-icon name="cross" size="18" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="code"
        name="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-button size="small" type="#ededed" round class="yzmbtn"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="sendbtn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onClickBack () {
      this.$router.back()
    },
    async onSubmit () {
      try {
        const res = await login(this.mobile, this.code)
        console.dir(res)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.iconfont {
  font-size: 37px;
}

.sendbtn {
  color: #fff;
  background-color: #6db4fb;
  border: 0.02667rem solid #6db4fb;
}

.yzmbtn {
  border: 0.02667rem solid rgba(0, 0, 0, 0);
  width: 156px;
  height: 46px;
  line-height: 46px;
  color: #666666;
}
</style>
