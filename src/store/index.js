import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/uilts/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: getToken() || {},
    // 根据联想词搜索结果列表
    searchResultList: [],
    // 评论回复框显示与否
    isShow: false,
    // 评论的评论
    popList: {}
  },
  getters: {},
  mutations: {
    setUserToken (state, data) {
      state.userToken = data
      setToken(data)
    },
    setSearchResultList (state, data) {
      state.searchResultList = data
    },
    setIsShow (state, data) {
      state.isShow = data
    },
    setPopList (state, data) {
      state.popList = data
    }
  },
  actions: {},
  modules: {}
})
