
<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view
          v-if="keepAlive"
          id="linkView"
          class="linkView"
        />
      </keep-alive>
    </transition>
    <transition name="fade">
      <router-view
        v-if="!keepAlive"
        id="linkView"
        class="linkView"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Countys } from '@/common/baseConfig'
import { routes } from '@/router'
@Component
export default class App extends Vue {
  get keepAlive() {
    return this.$route.meta.keepAlive
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
  overflow: auto;
  font-size: 14px;
  position: relative;
  .linkView {
    width: 100%;
    height: 100%;
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
