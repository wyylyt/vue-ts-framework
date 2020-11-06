<!--
 * @Description:
 * @Author: wanjikun
 * @Date: 2020-11-06 09:42:37
 * @LastEditTime: 2020-11-06 14:55:31
 * @LastEditors: wanjikun
-->
<template>
  <div class="hl-pull-refresh">
    <van-pull-refresh success-duration="1000" v-bind="$attrs" v-on="$listeners">
      <template #pulling="props">
        <img
          class="image"
          :src="require(`../assets/refresh/diyibu_000${props.distance}.png`)"
          :style="{ width: `100%`, transform: `scale(${props.distance / 50})` }"
        >
      </template>
      <template #loading>
        <img class="image" src="../assets/refresh/refresh.gif">
      </template>
      <template #loosing>
        <img class="image" src="../assets/refresh/refresh.gif">
      </template>
      <template #success>
        <div class="image success">
          <div class="success-mask">
            <span class="success-text">已更新至最新</span>
          </div>
        </div>
      </template>
      <slot />
    </van-pull-refresh>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PullRefresh, List } from 'vant'
@Component({
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List
  }
})
export default class HLPullRefresh extends Vue {}
</script>
<style lang="scss" scoped>
.hl-pull-refresh {
  height: 100%;
  .van-pull-refresh {
    min-height: 100%;
    .van-pull-refresh__track {
      min-height: 100%;
    }
  }
  .image {
    width: 100%;
  }
  .success {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    .success-mask {
      width: 100%;
      background-color: rgba(217, 33, 15, 0.72);
      animation: toWidth 0.3s;
      .success-text {
        width: 100%;
        height: 100%;
        line-height: 1;
        color: white;
      }
    }
  }

  @keyframes toWidth {
    from {
      width: 0;
      background-color: rgba(217, 33, 15, 0.4);
    }
    to {
      width: 100%;
      background-color: rgba(217, 33, 15, 0.72);
    }
  }
}
</style>
