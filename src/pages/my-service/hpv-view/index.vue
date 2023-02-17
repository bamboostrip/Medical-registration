<template>
    <view class="xinguan-view" v-for="(item,idx) in order" :key="idx" >
    <text class="name">{{ item.hpv_name }}</text>
    <view class="xinguan-order">
      <text>接种人:</text>
      <text>{{ item.name }}</text>
    </view>
    <view class="xinguan-order">
      <text>接种地点:</text>
      <text>{{ item.address }}</text>
    </view>
    <view class="xinguan-order">
      <text>疫苗套餐:</text>
      <text>{{ `${item.combo} ${item.ino_time}` }}</text>
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
import {ref,reactive} from "vue"
import point from '@/com-components/point.vue'
import { onShow } from "@dcloudio/uni-app"
import { RequestApi } from "@/public/request";
import { Hpvorder } from "@/public/decl-type";


let show = ref(false)
let order = ref<Hpvorder[]>([])

onShow(async() => { 
  //获取订单数据
  const res = await RequestApi.HpvuserOrder() as {data:{data:[]}}
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