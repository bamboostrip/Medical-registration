<template>
  <page-container :show="show" @enter="onEnter" @clickoverlay="clickoverlay">
    <view class="popups">
      <text class="popups-title">请选择预约时间段</text>
      <view class="table-time">
        <text :class="idx === selectIdx ? 'backTime' : ''  "
         v-for="(item,idx) in the_time" :key="idx" 
         @click="chooseTime(idx,item)">{{ item }}</text>
      </view>
      <view>
        <text class="popups-title">选择成员</text>
        <view class="member-view">
          <image src="/static/other/touxiang.svg" mode="widthFix" />
          <text>{{ name }}</text>
        <text @click="choosePatient" >{{ name === '' ? '选择就诊人' : '重新选择' }}</text>
        </view>
        <view class="select-submit" @click="submit" >提交预约</view>
      </view>
    </view>
  </page-container>
</template>

<script setup lang="ts">
import { DoctortimeData } from "@/public/decl-type";
import { RequestApi } from "@/public/request"
import { ref, reactive } from "vue"
//引入pinia
import { patientData } from "@/store/index";


let show = ref(false) //是否显示弹窗

//打开弹窗触发
const onEnter = () => {

}

//关闭弹窗
const clickoverlay = () => {
  show.value = false
  //清空上次数据
  the_time.value = []
  selectIdx.value = -1
  submitData.the_time = ''
}

//可选预约时段
let the_time = ref<string[]>([])

//选择预约时段
let selectIdx = ref(-1) 
const chooseTime = (idx: number,item: string) => {
  selectIdx.value = idx
  submitData.the_time = item
}

const trigGer = (value: DoctortimeData) => {
  console.log('value: ', value);
  show.value = value.show
  the_time.value = value.the_time
  submitData.week = value.week
  submitData.when =value.when
  submitData._id = value._id
}

defineExpose({trigGer})

//待提交的值
let submitData = reactive({
  week:'',
  the_time:'',
  when:0,
  _id:'',
  patient_id:''
})

//选择成员
const choosePatient = () => {
  uni.navigateTo({
    url: '/pages/my-service/my-patient/my-patient'
  })
}

//监听选择的成员
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
  const res = await RequestApi.RegAppoin(submitData) as {statusCode:number}
  if(res.statusCode === 200){
    uni.hideLoading()
    uni.showToast({
      title:'提交成功',
      icon:'none',
      duration:1000
    })
    uni.redirectTo({
      url:'/pages/my-service/my-registration/index'
    })
  }
 }

</script>

<style scoped>
/* 选择成员 */
@import url('../../../common-style/nucleic-time.css');

.popups {
  /* height: 900rpx;
  overflow-y: hidden; */
  width: 100%;
  background-color: #ffffff;
}

.popups-title {
  font-size: 35rpx;
  text-align: center;
  font-weight: bold;
  display: block;
  padding: 20rpx 0;
}

.table-time {
  display: flex;
  flex-wrap: wrap;
  margin: 40rpx 20rpx;
}

.table-time text {
  width: 33.3%;
  display: block;
  text-align: center;
  padding: 30rpx 0;
  box-sizing: border-box;
  color: #0176ff;
  border: 1rpx solid #dfdfdf;
}

/* 选择成员 */
.backTime {
  color: #ffffff !important;
  background-color: #0176ff;
  border: 1rpx solid #0176ff;
}
</style>