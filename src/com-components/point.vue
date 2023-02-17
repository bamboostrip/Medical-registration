<!--
 * @Author: bamboo
 * @Date: 2023-02-08 14:02:29
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-08 14:18:42
 * @FilePath: \wx-zhyl\src\com-components\point.vue
 * @Description: 公用的提示
-->
<template>
  <view class="point" v-if="show" >
    <image
      src="/static/other/kongshuju.jpg"
      mode="widthFix"
    />
    <text>{{ title }}</text>
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{show:boolean,title?:string}>(),{
  show:false,
  title:'你还没有订单数据'
})
</script>

<style scoped>
.point{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200rpx;
  color: #858585;
}
.point image{
  display: block;
  width: 230rpx;
  height: 230rpx;
}
</style>