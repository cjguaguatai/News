<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="loadNextPage"
      success-text="刷新完成"
    >
      <van-list
        @load="loadNextPage"
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/news'
import ArticleItem from './ArticleItem'
export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  components: {
    ArticleItem
  },
  created () {
    this.getArticleListFn()
  },
  methods: {
    // 获取频道文章并处理文章数据
    async getArticleListFn () {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        // console.log(data)
        this.articles = data.data.results
        this.pre_timestamp = data.data.pre_timestamp
        // console.log(data)
      } catch (e) {
        const status = e.response.status
        if (status === 400) {
          throw new Error(e.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请刷新')
        }
        console.log(e)
      }
    },
    // 获取下一页
    async loadNextPage () {
      // console.log(111)
      try {
        // 模拟错误
        // if (Math.random() < 0.7) {
        //   throw new Error('出错了')
        // }
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.refreshing) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false // try catch 语句执行完后，finally里的语句一定会执行
        this.refreshing = false
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
