<!--
 * @Description: 
 * @Author: wanjikun
 * @Date: 2020-11-20 17:29:11
 * @LastEditTime: 2021-09-28 09:34:02
 * @LastEditors: wanjikun
-->
<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view v-if="keepAlive" id="linkView" class="linkView" />
      </keep-alive>
    </transition>
    <transition name="fade">
      <router-view v-if="!keepAlive" id="linkView" class="linkView" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { routes } from "@/router";
import native from "@/common/Native";
import { getUrlParam, handleWXbackUrl } from "@/common/Utils";
import { wxChatShare } from "@/common/wechat.js";

@Component({
  components: {}
})
export default class App extends Vue {
  get keepAlive() {
    return this.$route.meta.keepAlive;
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  box-sizing: border-box;
  overflow: auto;
  font-size: 14px;
  position: relative;
  background-color: #f5f5f5;
  -webkit-overflow-scrolling: touch;
  .linkView {
    width: 100%;
    // height: 100%;
  }
}
html {
  font-size: 13.33333333333333vw;
}
* {
  padding: 0;
  margin: 0;
}
.fade-enter-active {
  transition: opacity 0.3s;
}
.fade-leave-active {
  opacity: 0;
}
.fade-enter {
  opacity: 0;
}
</style>
