import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/uilts/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: getToken() || {}
  },
  getters: {},
  mutations: {
    setUserToken (state, data) {
      state.userToken = data
      setToken(data)
    }
  },
  actions: {},
  modules: {}
})
