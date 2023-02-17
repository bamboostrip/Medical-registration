<!--
 * @Author: bamboo
 * @Date: 2023-02-09 19:07:13
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-10 15:55:28
 * @FilePath: \wx-zhyl\src\pages\my-service\my-patient\my-patient.vue
 * @Description: 
-->
<template>
  <view class="patient-infor" @click="checkedData(item.name, item._id)" v-for="(item,idx) in patient" :key="idx">
    <view class="patient-flex">
      <text class="patient-name">{{ item.name }}</text>
      <text class="patient-text">{{ item.relation }}</text>
    </view>
    <view>
      <view class="patient-flex patient-sex">
        <text>{{ item.sex }}</text>
        <text>{{ item.age }}岁</text>
        <text>{{ item.phone }}</text>
      </view>
    </view>
  </view>

  <!-- 提交 -->
  <view class="submit">
    <text @click="cancel">取消</text>
    <text @click="addNew">添加就诊人</text>
  </view>
  <point :show="show" title="请添加就诊人" />
  <view style="height:300rpx"></view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
//公用提示组件
import point from "@/com-components/point.vue";
import { onShow } from "@dcloudio/uni-app";
import { RequestApi } from "@/public/request";
import { Mypatient } from "@/public/decl-type";
//引入pinia
import { patientData } from "@/store/index";

//公用提示展示
let show = ref(false)

//请求页面数据
let patient = ref<Mypatient[]>([])
onShow(async () => {
  const res: any = await RequestApi.GetPatient()
  patient.value = res.data.data
  res.data.data.length === 0 ? show.value = true : show.value = false
})

//选择就诊人
const store = patientData()
const checkedData = (name: string, _id: string) => {
  store.addPatient({ name, _id })
  uni.navigateBack({delta:1})
}

//取消
const cancel = () => {
  uni.navigateBack({
    delta: 1
  })
}
//添加
const addNew = () => {
  uni.navigateTo({
    url: '/pages/my-service/my-patient/add-patient'
  })
}
</script>

<style>
@import url('../../../common-style/form.css');

page {
  background-color: #f6f6f6;
}

.patient-infor {
  background-color: #ffffff;
  margin: 20rpx;
  border-radius: 15rpx;
  font-size: 28rpx;
}

.patient-flex {
  display: flex;
  align-items: center;
  padding: 20rpx;
}

.patient-name {
  font-size: 35rpx;
  font-weight: bold;
}

.patient-flex text {
  margin-right: 15rpx;
}

.patient-text {
  background-color: #d6f3ff;
  color: #78beff;
  padding: 2rpx 15rpx;
}

.patient-sex {
  color: #7c96af;
}
</style>