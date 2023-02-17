<template>
  <page-container :show="submitData.show" @enter="onEnter" @clickoverlay="submitData.show = false" >
    <view class="popups">
      <text class="popups-title">选择成员</text>
      <view class="member-view">
        <image src="../static/other/touxiang.svg" mode="widthFix" />
        <text>{{ name }}</text>
        <text @click="choosePatient" >{{ name === '' ? '选择就诊人' : '重新选择' }}</text>
      </view>
      <view class="select-submit" @click="submit" >提交预约</view>
    </view>

  </page-container>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { popups } from '@/public/decl-type'
import { RequestApi } from "@/public/request";
//引入pinia
import { patientData } from "@/store/index";

//点击触发
const onEnter = () => {
  console.log('弹窗');
}

//待提交的值
let submitData = reactive({
  phy_name: '',
  phy_time:'',
  show:false,
  patient_id:''
})

//被父组件调用的方法
const trigGer = (e: popups) => {
  submitData.phy_name = e.phy_name
  submitData.phy_time = e.phy_time
  submitData.show = e.show
}
defineExpose({ trigGer })

//选择就诊人
const choosePatient = () => {
  uni.navigateTo({
    url: '/pages/my-service/my-patient/my-patient'
  })
}

//监听选择的就诊人
let name = ref('')
const store = patientData()
store.$subscribe((mutayion, state) => {
  name.value = state.patient.name
  submitData.patient_id = state.patient._id
})

//提交预约
const submit = async() => { 
  uni.showLoading({
    title:'提交中',
    mask:true
  })
  const res = await RequestApi.ResPhy(submitData) as {statusCode:number}
  if(res.statusCode === 200){
    uni.hideLoading()
    uni.redirectTo({
      url:'/pages/my-service/phy-exam/index'
    })
  }
 }
</script>

<style>
@import url('../common-style/nucleic-time.css');

.popups {
  height: 400rpx;
  width: 100%;
  background-color: #ffffff;
}
</style>