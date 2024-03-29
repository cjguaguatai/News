import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
// 引入全局css样式
import '@/style/index.less'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/style/news.css'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
