import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/uilts/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: getToken() || {},
    // 根据联想词搜索结果列表
    searchResultList: []
  },
  getters: {},
  mutations: {
    setUserToken (state, data) {
      state.userToken = data
      setToken(data)
    },
    setSearchResultList (state, data) {
      state.searchResultList = data
    }
  },
  actions: {},
  modules: {}
})
