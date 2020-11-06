<!--
 * @Author: wanjikun
 * @LastEditTime: 2020-11-06 15:06:48
 * @description: Do not edit
-->
<template>
  <div class="home">
    <div>哈哈哈哈</div>
    <Tabs v-model="active" scrollspy sticky>
      <Tab v-for="index in 4" :key="index" :title="'选项 ' + index">
        <div style="height:500px">
          内容 {{ index }}
        </div>
      </Tab>
    </Tabs>
    <!-- <AnimateCanvas/> -->
    <v-touch
      class="wrapper"
      @swipeleft="swiperleft"
      @swiperight="swiperright"
    >
      内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
    </v-touch>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Tab, Tabs } from 'vant'
import AnimateCanvas from '@/components/animateCanvas.vue'
@Component({
  components: {
    'Tabs': Tabs,
    'Tab': Tab,
    AnimateCanvas
  }
})
export default class Home extends Vue {
  active: number = 0;

  swiperleft() {
    console.log('swiperleft')
  }
  swiperright() {
    console.log('swiperright')
  }
}
</script>
<style lang="scss">
.van-sticky {
  opacity: 0;
  transition: opacity 1s;
  &.van-sticky--fixed {
    opacity: 1;
  }
}
</style>

