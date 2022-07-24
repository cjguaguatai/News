<template>
  <div>
    <van-cell-group>
      <van-cell
        v-for="(item, index) in highlightData"
        :key="index"
        @click="searchResult(index)"
      >
        <van-icon name="search" slot="icon" class="search-icon" />
        <span v-html="item" slot="title"></span>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
      // searchResultList: []
    }
  },
  watch: {
    // 关键词变化，请求新的联想
    keywords: {
      immediate: true,
      handler () {
        this.getSearchResult()
      }
      // console.log(this.keywords)
    }
  },
  methods: {
    // 获取联想建议
    async getSearchResult () {
      try {
        const { data } = await getSearchResult(this.keywords)
        this.suggestions = data.data.options.filter(Boolean)
        // console.log(data.data.options)
      } catch (error) {
        console.log(error)
      }
    },
    // 根据联想词搜索结果
    async searchResult (index) {
      this.$emit('changeKeywords', this.suggestions[index])
    }
  },
  computed: {
    // 联想词中的关键词高亮
    highlightData () {
      const reg = new RegExp(this.keywords, 'gi')
      return this.suggestions.map((item) =>
        item.replace(reg, (match) => `<span style='color:red'>${match}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less">
.search-icon {
  padding-top: 10px;
}
</style>
