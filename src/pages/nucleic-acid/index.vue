<!--
 * @Author: bamboo
 * @Date: 2023-02-09 15:03:38
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-09 16:22:14
 * @FilePath: \wx-zhyl\src\pages\nucleic-acid\index.vue
 * @Description: 
-->
<template>
  <view class="nucleic-top">
    <view class="nucleic-price">
      <image :src="nucleiData.data.logo" mode="aspectFill" />
      <view class="pay-price">
        <text>{{ nucleiData.data.name }}</text>
        <text>{{ nucleiData.data.price }}</text>
      </view>
    </view>

    <view class="nucleic-hint">
      <view v-for="(item,idx) in nucleiData.data.boon" :key="idx" >
        <icon type="success" size="15" class="icon-small" />
        <text>{{ item }}</text>
      </view>
    </view>
  </view>

  <!-- 地址 -->
  <view class="nucleic-address">
    <view>
      <text>{{ nucleiData.data.hospital }}</text>
      <text class="text-color">{{ nucleiData.data.address }}</text>
    </view>
    <view @click="makePhone(nucleiData.data.phone)" >
      <image src="/static/other/dianhua.svg" mode="widthFix" />
      <text class="text-color">电话</text>
    </view>
  </view>

  <!-- 表单 -->
  <view class="xinguan-view new-style">

    <view class="xinguan-flex">
      <text>真实姓名</text>
      <input type="text" placeholder="请输入真实姓名" v-model="submitData.name" placeholder-class="input-style">
    </view>

    <view class="xinguan-flex">
      <text>手机号</text>
      <input type="number" placeholder="请输入手机号" v-model="submitData.phone" placeholder-class="input-style">
    </view>

    <view class="xinguan-flex">
      <text>身份证</text>
      <input type="text" placeholder="请输入身份证" v-model="submitData.id_card" placeholder-class="input-style">
    </view>

  </view>

  <!-- 预约时段 -->
  <view class="nucleic-time">
    <text class="nucleic-Title">选择预约时段</text>
    <scroll-view scroll-x="true" class="scroll-view_H">
      <view class="nucleic-time-flex">
        <view :class="idx === timeIdx ? 'checkstyle' : '' "
        @click="changTime(idx,item.date)"
         v-for="(item,idx) in nucleiData.data.date" :key="idx" >
          <text>{{ item.date }}</text>
          <text>{{ item.week }}</text>
        </view>
      </view>
    </scroll-view>
  </view>

  <!-- 采样方式 -->
  <view class="nucleic-time">
    <text class="sam-Title">咽拭子采样方式</text>
    <view class="sam-content" v-for="(item,idx) in nucleiData.data.style" :key="idx" >
      <label>{{ item.title }}</label>
      <text v-for="(v,i) in item.desc" :key="i" >{{ v }}</text>
    </view>
  </view>

  <!-- 提交 -->
  <view style="height:300rpx"></view>
  <view class="Total-view">
    <text>检测费用:&yen;{{ nucleiData.data.price }}</text>
    <text @click="Submit">提交</text>
  </view>

  <!-- 骨架屏 -->
<skIndex v-if="skeLeton"></skIndex>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import { RequestApi } from '@/public/request'
import { Nucleicacid } from "@/public/decl-type";
//引入骨架屏
import skIndex from '@/Skeleton/SK-nucleic.vue'

//骨架屏
let skeLeton = ref(true)

//获取本页面数据
let nucleiData = reactive<{ data: Nucleicacid }>({
  data: {
    address: '',
    boon: [],
    date: [],
    hospital: '',
    logo: '',
    name: '',
    phone: '',
    price: 0,
    style: []
  }
})
onMounted(async () => {
  const res: any = await RequestApi.Nuataget()
  console.log('res: ', res);
  nucleiData.data = res.data.data[0]
  skeLeton.value =false
})

//拨打电话
const makePhone = (phone:string) => { 
  uni.makePhoneCall({
    phoneNumber: phone,
    success: (result) => {},
    fail: (error) => {}
  })
 }

 //选择时段
 let timeIdx = ref(-1)
 const changTime = (idx: number,time: string) => { 
  timeIdx.value = idx
  submitData.time = time
  }

 //待提交的数据
 let submitData = reactive({
  name: '',
  phone: '',
  id_card:'',
  time:''
 })

 //提交预约
 const Submit = async() => { 
  uni.showLoading({
    title: '加载中',
    mask: true
  })
  const res: any = await RequestApi.ResNuata(submitData)
  if(res.statusCode === 200){
    uni.hideLoading()
    //跳转订单页面
    uni.navigateTo({
      url:'/pages/my-service/nucleic-acid/index'
    })
  }

  }

</script>

<style>
/* 表单提交 */
@import url('../../common-style/form.css');
@import url('../../common-style/nucleic-time.css');

page {
  background-color: #fafafa;
}

.nucleic-top {
  background-color: #ffffff;
  padding: 20rpx;
}

.nucleic-price {
  display: flex;
  align-items: center;
}

.nucleic-price image {
  width: 100rpx;
  height: 100rpx;
  display: block;
}

.nucleic-price text {
  display: block;
  padding: 10rpx;
}

.pay-price text:nth-child(1) {
  font-size: 35rpx;
}

.pay-price text:nth-child(2) {
  font-weight: bold;
  color: #ff5f2c;
}

/* 提示 */
.nucleic-hint {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20rpx;
  font-size: 24rpx;
}

.nucleic-hint view {
  display: flex;
  align-items: center;
}

.nucleic-hint text {
  padding-left: 10rpx;
}

/* 地址 */
.nucleic-address {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 20rpx;
  margin: 20rpx;
  border-radius: 20rpx;
}

.nucleic-address text {
  display: block;
}

.nucleic-address image {
  width: 40rpx;
  height: 40rpx;
}

.nucleic-address view:nth-child(2) {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-color {
  font-size: 25rpx;
  padding-top: 20rpx;
}

/* 个人信息 */
.new-style {
  margin: 20rpx;
  border-radius: 20rpx;
}

/* 采样 */
.sam-Title {
  font-weight: bold;
}

.sam-content {
  margin-top: 20rpx;
}

.sam-content label {
  background-color: #0176ff;
  color: #ffffff;
  border-radius: 10rpx;
  padding: 5rpx 10rpx;
  font-size: 28rpx;
  display: inline-block;
}

.sam-content text {
  display: block;
  padding: 10rpx 0;
  line-height: 1.5;
  font-size: 28rpx;
}

/* 选中加上样式 */
.checkstyle {
  background-color: #2c76ef !important;
  color: #ffffff !important;
}
</style>