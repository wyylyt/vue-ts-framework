/*
 * @Author: your name
 * @Date: 2020-11-06 09:42:37
 * @LastEditTime: 2020-11-06 15:16:34
 * @LastEditors: wanjikun
 * @Description: In User Settings Edit
 * @FilePath: \vue-ts\src\main.ts
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './common/mixin'
import '@/common/AddPrototype'
import './common/index.scss'
// import 'vant/lib/index.css'

import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
