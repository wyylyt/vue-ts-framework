<!--
 * @Author: wanjikun
 * @LastEditTime: 2020-10-12 15:14:59
 * @description: Do not edit
-->
<template>
    <canvas class="Test" ref="canvas" width="600" height="600"></canvas>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
    components: {}
})
export default class AnimateCanvas extends Vue {
    canvas:any = null;
    ctx:any = null;
    mounted() {
        this.canvas = this.$refs.canvas
        this.ctx = this.canvas.getContext('2d')
        
        // this.drawLineCanvas()
        this.variableMotion()
    }
    /**
     * 线性运动
     */
    drawLineCanvas(){
        let radialGradient;
        let distance = 50;
        const speed = 5;
        const draw=()=>{
            /**清空画布 或部分清空 */
            this.ctx.clearRect(0,0,600,600)

            /**设置绘制的颜色 */
            radialGradient = this.ctx.createRadialGradient(distance, 300, 10, distance, 300, 50);
            radialGradient.addColorStop(0, "#FFFFFF");
            radialGradient.addColorStop(1, "#EA7F26");
            this.ctx.fillStyle = radialGradient;

            /**绘制一个圆 */
            this.ctx.beginPath();
            this.ctx.moveTo(distance, 300);
            this.ctx.arc(distance, 300, 50, 0, 2 * Math.PI, false);
            this.ctx.fill();

            distance = distance + speed;
        
            if (distance > 650) distance = -50;

            requestAnimationFrame(draw);
        }
        requestAnimationFrame(draw)
    }
    /**
     * 变速运动
     */
    variableMotion(){
        let radialGradient;
        let distance = 50;
        const speed = 5;

        let count = 1;
        const draw = () => {
            /* 清空画布(或部分清空) */
            this.ctx.clearRect(0, 0, 600, 600);
            radialGradient = this.ctx.createRadialGradient(300, distance, 10, 300, distance, 50);
            radialGradient.addColorStop(0, "#FFFFFF");
            radialGradient.addColorStop(1, "#EA7F26");
            this.ctx.fillStyle = radialGradient;

            this.ctx.beginPath();
            this.ctx.moveTo(300, distance);
            this.ctx.arc(300, distance, 50, 0, 2 * Math.PI, false);
            this.ctx.fill();

            count += 1;

            distance = 9.8 * (Math.pow(count, 2)) / 100;
            if (distance > 650) {
                distance = -50;
                count = 1;
            }

            requestAnimationFrame(draw);
        }
        requestAnimationFrame(draw);
    }
}
</script>
<style lang="scss" scoped></style>