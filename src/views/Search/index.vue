<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="visibleSearchSuggestion"
      />
    </form>
    <component
      :is="componentName"
      :keywords="value"
      @changeKeywords="changeKeywords"
      :List="searchResultList"
      :historyList="list"
      :show="show"
      @history="changeKeywords"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import { getSearch } from '@/api/search'
// import { json } from 'body-parser'

export default {
  data () {
    return {
      value: '',
      isShowSearchResult: false,
      // 根据联想词请求回来的结果
      searchResultList: [],
      list: JSON.parse(localStorage.getItem('historyList')) || [],
      // 传到结果组件
      show: ''
    }
  },
  methods: {
    onSearch () {
      this.isShowSearchResult = true
      this.getSearch()
      this.saveKeywords()
    },
    onCancel () {
      this.$router.go(-1)
    },
    visibleSearchSuggestion () {
      this.isShowSearchResult = false
    },
    // 联想结果点击后，改变keyword的为联想结果
    changeKeywords (text) {
      this.isShowSearchResult = true
      // console.log(text)
      this.value = text
      this.saveKeywords()
      this.getSearch()
    },
    // 根据关键词获取搜索结果
    async getSearch () {
      try {
        const { data } = await getSearch(this.value)
        // console.log(data.data.results)
        // if (data.data.results.length === 0) {
        //   return (this.searchResultList = ['暂无数据'])
        // }
        console.log(data.data.results)
        this.searchResultList = data.data.results
        if (this.searchResultList[0]) {
          this.show = true
        } else {
          this.show = false
        }
        // this.$store.commit('setSearchResultList', data.data.results)
      } catch (error) {
        console.log(error)
      }
    },
    // 将keywords存入vuex
    saveKeywords () {
      this.list.unshift(this.value)
      this.list = Array.from(new Set(this.list))
      // console.log(111)
      localStorage.setItem('historyList', JSON.stringify(this.list))
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  computed: {
    componentName () {
      if (this.value.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  }
}
</script>

<style></style>
