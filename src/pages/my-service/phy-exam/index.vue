<!--
 * @Author: bamboo
 * @Date: 2023-02-12 14:24:29
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-12 14:51:41
 * @FilePath: \wx-zhyl\src\pages\my-service\phy-exam\index.vue
 * @Description: 
-->
<template>
  <view class="xinguan-view" v-for="(item,idx) in order" :key="idx" >
    <view class="xinguan-order">
      <text>体检套餐:</text>
      <text>{{ item.phy_name }}</text>
    </view>

    <view class="xinguan-order">
      <text>体检人:</text>
      <text>{{ item.name }}</text>
    </view>

    <view class="xinguan-order">
      <text>体检时间:</text>
      <text>{{ item.phy_time }}</text>
    </view>

    <view class="xinguan-order">
      <text>体检地点:</text>
      <text>{{ item.address }}</text>
    </view>

    <view class="xinguan-order">
      <text>订单编号:</text>
      <text>{{ item.order_number }}</text>
    </view>

    <!-- 价格 -->
    <view class="reg-price">
      <text>&yen;{{ item.price }}</text>
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
import {ref} from "vue"
import point from '@/com-components/point.vue'
import { onShow } from "@dcloudio/uni-app"
import { RequestApi } from "@/public/request";
import { Phyuserorder } from "@/public/decl-type";


let show = ref(false)
let order = ref<Phyuserorder[]>([])

onShow(async() => { 
  //获取订单数据
  const res = await RequestApi.PhyuserOrder() as {data:{data:[]}}
  console.log('订单数据: ', res);
  order.value = res.data.data
  if(res.data.data.length === 0 ){
    show.value = true
  }
 })

 //取消预约
 const cancel = async(id: string,idx: number) => { 
    const res = await RequestApi.HpvCancel({_id:id}) as {statusCode:number}
    if(res.statusCode === 200){
      console.log(res);
      order.value[idx].cancel = false
    }
  }
</script>

<style>
  @import url('../../../common-style/vaccine.css');
</style>