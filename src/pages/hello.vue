<!--  -->
<template>
<view>
  <view class="item" v-for="(value,index) in iconType" :key="index">
    <icon :type="value" size="20"/>
    <text>{{value}}</text>
  </view>
</view>
</template>

<script>
export default {
    data() {
        return {
            iconType: ['success']
        }
    },
    onLoad() {
      console.log(this.$Route)
      this.iconType = ['success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search','clear']
    }
}

</script>
<style lang='scss' scoped>
@import "@/scss/a-ui/_vars.scss";

.box {
  width: 12*$px;
  height: 12*$px;
  background: #ccc;
}
</style>