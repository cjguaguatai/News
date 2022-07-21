<template>
  <div>
    <van-cell
      @click="toDetail(articleInfo.art_id)"
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
    />
    <!-- 一张图片 -->
    <van-cell
      @click="toDetail(articleInfo.art_id)"
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>
    <!-- 三张图片 -->
    <van-cell
      @click="toDetail(articleInfo.art_id)"
      v-if="articleInfo.cover.type === 3"
      :title="articleInfo.title"
    >
      <template #label>
        <div>
          <van-image
            v-for="item in articleInfo.cover.images"
            :key="item"
            width="3rem"
            height="2rem"
            :src="item"
          />
          <span>{{ articleDesc }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/uilts/dayjs'
export default {
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleDesc () {
      const art = this.articleInfo
      const relativeTime = dayjs(art.pubdate).fromNow()
      return `${this.articleInfo.aut_name} ${this.articleInfo.comm_count}评论 ${relativeTime}`
    }
  },
  methods: {
    toDetail (id) {
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style></style>
