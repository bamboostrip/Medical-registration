<!--
 * @Author: bamboo
 * @Date: 2023-02-09 19:07:03
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-10 14:42:45
 * @FilePath: \wx-zhyl\src\pages\my-service\my-patient\add-patient.vue
 * @Description: 
-->
<template>
  <view class="AI-card" @click="upImg" >
    <image src="/static/other/AI-shibie.svg" mode="widthFix" />
    <text>身份证智能识别</text>
  </view>
  <!-- 表单 -->
  <view class="xinguan-view">

    <view class="xinguan-flex">
      <text>真实姓名</text>
      <input type="text" placeholder="请输入姓名" v-model="submitData.name" placeholder-class="input-stle" />
    </view>

    <view class="xinguan-flex">
      <text>性别</text>
      <picker mode="selector" :range="['男', '女']" class="flex-left" @change="changeSex">
        <view>
          <text>{{ submitData.sex === '' ? '请选择性别' : submitData.sex }}</text>
          <image src="/static/other/gengduo.svg" />
        </view>
      </picker>
    </view>

    <view class="xinguan-flex">
      <text>出生日期</text>
      <picker mode="date" class="flex-left" @change="changeDate" >
        <view>
          <text>{{ submitData.born === '' ? '请选择出生日期' : submitData.born }}</text>
          <image src="/static/other/gengduo.svg" />
        </view>
      </picker>
    </view>

    <view class="xinguan-flex">
      <text>成员关系</text>
      <picker mode="selector" :range="['自己', '父母', '其他']" class="flex-left" @change="changeReletion" >
        <view>
          <text>{{ submitData.relation === '' ? '请选择成员关系' : submitData.relation }}</text>
          <image src="/static/other/gengduo.svg" />
        </view>
      </picker>
    </view>

    <view class="xinguan-flex">
      <text>身份证</text>
      <input type="text" placeholder="请输入身份证" v-model="submitData.id_card" placeholder-class="input-stle" />
    </view>

    <view class="xinguan-flex">
      <text>手机号</text>
      <input type="number" placeholder="请输入手机号" v-model="submitData.phone" placeholder-class="input-stle" />
    </view>

  </view>

  <!-- 提交 -->
  <view style="height:300rpx"></view>
  <view class="submit">
    <text @click="cancel">取消</text>
    <text @click="submitAdd">确认添加</text>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import {uploadImage} from '@/public/misc'
import { AiCard, RequestApi } from "@/public/request";
import { RescovidApi } from "@/public/decl-type";


//待提交的数据
let submitData = reactive({
  name: '',
  sex: '',
  born: '',
  relation: '',
  id_card: '',
  phone: '',
})

//身份证识别上传图片
const upImg = async() => { 
  const res:any = await uploadImage(AiCard,'识别中','识别失败')
  let data = JSON.parse(res.data)
  if(res.statusCode === 200){
    let born = data.data.born.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    submitData.name = data.data.name
    submitData.sex = data.data.sex
    submitData.born = born
    submitData.id_card = data.data.id_card
  }else{
    uni.showToast({
      title:data.data,
      icon:'error',
      duration:1000
    })
  }
 }

//选择性别
const changeSex = (e: { detail: { value: string } }) => {
  submitData.sex = e.detail.value === '0' ? '男' : '女'
}

//选择出生日期
const changeDate = (e: { detail: { value: string } }) => {
  submitData.born = e.detail.value
}

//选择成员关系
const changeReletion = (e: { detail: { value: string } }) => {
  let value = e.detail.value
  submitData.relation = value === '0' ? '自己' : value === '1' ? '父母' : '其他'
}

//取消
const cancel = () => {
  uni.navigateBack({
    delta: 1
  })
}
//确认添加
const submitAdd = async() => {
  const res: any = await RequestApi.PatientRes(submitData)
  if(res.statusCode === 200){
    uni.navigateBack({ delta: 1 })
  }
}

</script>

<style>
@import url('../../../common-style/form.css');

page {
  background-color: #f6f6f6;
}

.AI-card {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  font-size: 35rpx;
  border-radius: 15rpx;
  padding: 30rpx 20rpx;
  margin: 20rpx 20rpx 50rpx 20rpx;
}

.AI-card image {
  width: 80rpx;
  height: 80rpx;
  margin-right: 20rpx;
  display: block;
}
</style>