<!--
 * @Author: bamboo
 * @Date: 2023-02-07 22:45:36
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-08 15:03:50
 * @FilePath: \wx-zhyl\src\pages\my-service\xinguan\index.vue
 * @Description: 
-->
<template>
  <view class="xinguan-view" v-for="(item,idx) in order" :key="idx" >
    <text class="name">{{ item.name }}</text>
    <view class="xinguan-order">
      <text>接种地点:</text>
      <text>{{ item.address }}</text>
    </view>
    <view class="xinguan-order">
      <text>疫苗厂商:</text>
      <text>{{ item.company }}</text>
    </view>
    <view class="xinguan-order">
      <text>接种时间:</text>
      <text>{{`${item.date} ${item.period}`}}</text>
    </view>
    <!-- 取消预约 -->
    <view class="reg-cancel" @click="cancel(item._id,idx)" >
      <text :class="item.cancel ? '' : 'prevent_style' ">{{ item.cancel ? '取消预约' : '已取消预约' }}</text>
    </view>
  </view>
  <!-- 提示组件 -->
  <point :show="show" />
  <view style="height:200rpx"></view>
</template>

<script setup lang="ts">
import { RequestApi } from "@/public/request";
import { onShow } from "@dcloudio/uni-app";
import {ref,reactive} from "vue"
import {XinguanOrder} from '@/public/decl-type'
import point from '@/com-components/point.vue'


let show = ref(false)
let order = ref<XinguanOrder[]>([])

onShow(async() => { 
  //获取订单数据
  const res:any = await RequestApi.CoviduserOrder()
  console.log('订单数据: ', res);
  order.value = res.data.data
  if(res.data.data.length === 0 ){
    show.value = true
  }
 })

 //取消预约
 const cancel = async(id: string,idx: number) => { 
    const res:any = await RequestApi.CovidCancel({_id:id})
    if(res.statusCode === 200){
      console.log(res);
      order.value[idx].cancel = false
    }
  }



</script>

<style>
@import url('../../../common-style/vaccine.css');
</style>