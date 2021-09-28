/*
 * @Author: your name
 * @Date: 2020-11-06 09:42:37
 * @LastEditTime: 2021-09-28 09:34:22
 * @LastEditors: wanjikun
 * @Description: In User Settings Edit
 * @FilePath: \vue-ts\src\main.ts
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import 'vant/lib/index.css'
import { Lazyload } from "vant";
import VueTouch from "vue-touch";
Vue.use(VueTouch, { name: "v-touch" });
Vue.use(Lazyload, {
  preLoad: 1,
  error: `https://imagecdntest.cqliving.com/test/testfiles/images/app_0/cms/2020/12/fd96d0825b59db41c9b47763f4494a2f82836f3d.png`,
  loading: `https://imagecdntest.cqliving.com/test/testfiles/images/app_0/cms/2020/12/fd96d0825b59db41c9b47763f4494a2f82836f3d.png`,
  attempt: 1
});
Vue.use(Lazyload, {
  lazyComponent: true
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
