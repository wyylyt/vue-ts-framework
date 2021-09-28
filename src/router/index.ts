import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import native from "@/common/Native";
Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "首页"
      // needHeader: true
      // keepAlive: true,
      // needToken: true
    }
  }

  // wjk end
];
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (ZWY_CLOUD.isOpenInApp()) {
    native.bottomBarConfig();
    // native.topBarConfig();
  }
  if (to.meta.title) document.title = to.meta.title;
  next();
});
export default router;
