<template>
  <div>
    <van-cell title="暂无数据" v-if="!show" />
    <van-cell-group v-else>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset:150
      >
        <van-cell
          :title="item.title"
          v-for="item in List"
          :key="item.art_id"
          @click="pushToArticle"
        />
      </van-list>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: {
    List: {
      type: Array,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false
    }
  },
  methods: {
    // 点击结果列表，跳转到相应文章路由
    pushToArticle () {},
    async onLoad () {
      await this.$parent.onLoad()
      this.loading = false
    }
  }
}
</script>

<style></style>
