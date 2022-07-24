<template>
  <div>
    <van-nav-bar
      class="header"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 上传头像 -->
    <input type="file" hidden ref="file" />
    <!-- @click="onChangePhoto" -->
    <van-cell title="头像" is-link value="内容" @click="$refs.file.click()">
      <template #default>
        <van-image round width="35px" height="35px" :src="profile.photo" />
      </template>
    </van-cell>
    <!-- 昵称框 -->
    <van-cell title="昵称" is-link :value="profile.name" @click="toChangName" />
    <!-- 昵称弹出层 -->
    <van-popup v-model="showName" position="bottom" :style="{ height: '100%' }">
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="showName = false"
        @click-right="saveName"
      />
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        show-word-limit
      />
    </van-popup>
    <!-- 性别框 -->
    <van-cell
      title="性别"
      is-link
      :value="profile.gender ? '女' : '男'"
      @click="showGender = true"
    />
    <!-- 性别弹出层 -->
    <van-popup
      v-model="showGender"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        title="更新性别"
        show-toolbar
        :columns="ageColumns"
        @confirm="saveGender"
        @cancel="showGender = false"
      />
    </van-popup>
    <!-- 生日框 -->
    <van-cell
      title="生日"
      is-link
      :value="profile.birthday"
      @click="showBirthday = true"
    />
    <!-- 生日弹出层 -->
    <van-popup
      v-model="showBirthday"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showBirthday = false"
        @confirm="saveBirthday"
      />
    </van-popup>

    <!-- 头像弹出层 -->
    <!-- <van-popup
      v-model="showPhoto"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChangePhoto
        v-if="showPhoto"
        :img="img"
        @close="showPhoto = false"
        @update-photo="profile.photo = $event"
      ></ChangePhoto>
    </van-popup> -->
  </div>
</template>

<script>
import { getUserProfile, editProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      // 是否显示昵称弹出层
      showName: false,
      // 是否显示性别弹出层
      showGender: false,
      ageColumns: ['男', '女'],
      // 是否显示生日弹出层
      showBirthday: false,
      showPhoto: false,
      message: '',
      profile: {},
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2022, 7, 24),
      currentDate: new Date(2022, 7, 24)
    }
  },
  created () {
    this.getUserProfile()
  },
  methods: {
    // 获取个人资料
    async getUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.profile = data.data
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    // 点击昵称框
    toChangName () {
      this.showName = true
      this.message = this.profile.name
    },
    // 昵称弹出层提交
    async saveName () {
      try {
        await editProfile(this.message)
        // console.log(data)
        this.getUserProfile()
        this.showName = false
      } catch (error) {
        console.log(error)
      }
    },
    // 性别弹出层提交
    async saveGender (value) {
      try {
        const age = value === '男' ? 0 : 1
        // console.log(age)
        const { data } = await editProfile('', age)
        console.log(data)
        this.getUserProfile()
        this.showName = false
      } catch (error) {
        console.log(error)
      }
    },
    // 生日弹出层提交
    async saveBirthday (value) {
      const day = dayjs(value).format('YYYY-MM-DD')
      // console.log(dayjs(value).format('YYYY-MM-DD'))
      await editProfile('', '', day)
      // console.log(data)
      this.getUserProfile()
      this.showBirthday = false
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  background-color: #5093f3;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  /deep/.van-icon-arrow-left:before {
    color: #fff;
  }
}
</style>
