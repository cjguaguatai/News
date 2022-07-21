<template>
  <div>
    <van-cell title="暂无数据" v-if="!show" />
    <van-cell-group v-else>
      <van-cell
        :title="item.title"
        v-for="item in List"
        :key="item.art_id"
        @click="pushToArticle"
      />
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
    return {}
  },
  methods: {
    // 点击结果列表，跳转到相应文章路由
    pushToArticle () {}
  }
}
</script>

<style></style>
