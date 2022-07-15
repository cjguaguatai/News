<template>
  <div>
    <van-nav-bar title="登录" class="navbar" @click-left="onClickBack">
      <template #left>
        <van-icon name="cross" size="18" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="6 * 1000"
            v-if="isCountDown"
            format="ss s"
            @finish="isCountDown = false"
          />
          <van-button
            size="small"
            type="#ededed"
            round
            class="yzmbtn"
            v-else
            @click="codeBtn"
            native-type="button"
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
import { login, sendCode } from '@/api/user.js'
import { mobileRules, codeRules } from './rules'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isCountDown: false
    }
  },
  methods: {
    onClickBack () {
      this.$router.back()
    },
    // 请求登录
    async onSubmit () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        // console.dir(res)
        this.$router.push('/profile')
        this.$store.commit('setUserToken', res.data.data)
        this.$toast.success('登陆成功')
      } catch (e) {
        console.log(e)
        if (e.response.status === 400) {
          this.$toast.fail(e.response.data.message)
        } else {
          this.$toast.fail('登陆失败，请稍后再试')
        }
      }
    },
    // 发送验证码
    async codeBtn () {
      try {
        await sendCode(this.mobile)
        this.isCountDown = true
        await this.$refs.form.validate('mobile')
      } catch (error) {
        // this.$toast.fail('手机号非法')
        if (this.mobile.trim() === '') {
          this.$toast.fail('请不要输入空值')
        } else if (
          error.response.status === 404 ||
          error.response.status === 429
        ) {
          this.$toast.fail(error.response.data.message)
        }
        // console.log(error)
      }
    },
    addFn () {
      this.$store.commit('addNum')
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
