<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史">
        <van-icon
          name="delete-o"
          slot="default"
          v-show="!isShow"
          @click="isShow = !isShow"
        />
        <span slot="default" v-show="isShow" @click="delHistoryList"
          >全部删除</span
        >&nbsp;
        <span slot="default" v-show="isShow" @click="isShow = !isShow"
          >完成</span
        >
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in list"
        :key="index"
        @click="clickFn(item)"
      >
        <van-icon name="close" v-show="isShow" @click="delOne(index)" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data () {
    return {
      // 控制是否删除
      isShow: false,
      // 傀儡
      list: []
    }
  },
  created () {
    this.list = this.historyList
  },
  methods: {
    // 点击历史记录触发
    clickFn (value) {
      if (!this.isShow) {
        this.$emit('history', value)
      }
    },
    // 全部删除
    delHistoryList () {
      // 为了响应式
      this.list = []
      localStorage.removeItem('historyList')
    },
    // 删除单个
    delOne (id) {
      if (this.isShow) {
        this.list = this.list.filter((item, index) => index !== id)
        localStorage.setItem('historyList', JSON.stringify(this.list))
      }
    }
  },
  props: {
    // 关键词
    keywords: {
      type: String,
      required: true
    },
    // 要渲染的历史记录
    historyList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style></style>
