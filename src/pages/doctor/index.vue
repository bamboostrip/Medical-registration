<!--
 * @Author: bamboo
 * @Date: 2023-02-13 08:49:04
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-14 11:08:51
 * @FilePath: \wx-zhyl\src\pages\doctor\index.vue
 * @Description: 
-->
<template>
  <view class="doctor-top filter-view">
    <view class="all-text" @click="allDoctor" :class="selectIdx === -1 ? 'changeColor' : '' ">全部</view>
    <scroll-view scroll-x class="scroll-view_H">
      <view class="week" v-for="(item, idx) in doctorTime" :key="idx" @click="dayDoctor(item.dep_id, item.week, idx)">
        <text>{{ item.date }}</text>
        <text :class="selectIdx === idx ? 'changeColor' : ''">{{ item.week }}</text>
        <text>{{ item.nu_source === 1 ? '可约' : '无号' }}</text>
      </view>
    </scroll-view>
  </view>

  <!-- 医生列表 -->
  <view style="height:170rpx"></view>
  <view class="doctor-list" v-for="(item, idx) in doctorList" :key="idx" @click="goDoctorHome(item._id)">
    <image :src="item.avatar" mode="aspectFill" />
    <view class="doctor-name">
      <text>{{ item.name }}</text>
      <text>{{ item.post }}</text>
      <text>{{ item.good_at }}</text>
    </view>
    <view class="about-doctor">预约</view>
  </view>

  <!-- 公用提示组件 -->
  <point :show="doctorList.length === 0 ? true : false" :title="title" />

  <!-- 骨架屏 -->
  <skIndex v-if="skeLeton" />
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app"
import { ref, reactive } from "vue"
import point from '@/com-components/point.vue'
import { RequestApi } from "@/public/request"
import { Doctorlist, Doctortime } from "@/public/decl-type"
//骨架屏
import skIndex from '@/Skeleton/SK-doctor.vue'

//骨架屏
let skeLeton = ref(true)


let doctorTime = ref<Doctortime[]>([]) //存储选择日期
let doctorList = ref<Doctorlist[]>([]) //存储医生列表
let dep_id = ref('') //子科室的id

//接收上页面传递的子科室id
onLoad(async (e) => {
  console.log(e);
  //1658914644302
  const { id } = e as { id: string }
  dep_id.value = id
  //获取页面数据
  const res = await Promise.all([RequestApi.TimeSele({ dep_id: id }), RequestApi.AlldList({ dep_id: id })]) as { data: { data: [] } }[]
  console.log('res: ', res);
  doctorTime.value = res[0].data.data
  doctorList.value = res[1].data.data
  skeLeton.value = false
})

//是否选中时间
let selectIdx = ref(-1)

//提示组件是否显示
let title = ref('当日没有医生排班')

//请求全部医生列表
const allDoctor = async () => {
  selectIdx.value = -1
  const res = await RequestApi.AlldList({ dep_id: dep_id.value }) as { data: { data: [] } }
  doctorList.value = res.data.data
}

//请求单日医生列表
const dayDoctor = async (dep_id: string, week: string, idx: number) => {
  selectIdx.value = idx
  const res = await RequestApi.EverydList({ dep_id, week }) as { data: { data: [] } }
  doctorList.value = res.data.data
}

//跳转医生主页
const goDoctorHome = (id: string) => {
  uni.navigateTo({
    url: `/pages/doctor/doctor-Homepage?id=${id}`
  })
}

</script>

<style>
page {
  background-color: #f7f7f7;
}

/* 顶部 */
.doctor-top {
  background-color: #ffffff;
  height: 150rpx;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-top: 1rpx solid #f2f2f2;
}

.all-text {
  width: 150rpx;
  text-align: center;
  height: 150rpx;
  line-height: 150rpx;
  border-right: 1rpx solid #f2f2f2;
}

.scroll-view_H {
  white-space: nowrap;
  overflow: scroll;
  width: 100%;
  height: 150rpx;
  line-height: 50rpx;
}

.week {
  padding: 0 30rpx;
  display: inline-block;
  text-align: center;
}

.week text {
  display: block;
}

.week text:nth-child(3) {
  font-size: 26rpx;
}

/* 列表 */
.doctor-list {
  background-color: #ffffff;
  padding: 40rpx 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1rpx solid #d3d3d8;
}

.doctor-list:last-child {
  border: none !important;
}

.doctor-list image {
  width: 150rpx;
  height: 150rpx;
  display: block;
  border-radius: 50%;
}

.doctor-list text {
  display: block;
  padding: 5rpx 0;
  color: #b1b2b3;
}

.doctor-name {
  flex: 1;
  padding: 0 10rpx;
}

.doctor-name text:nth-child(1) {
  font-size: 35rpx;
  font-weight: bold;
  color: #333 !important;
}

.doctor-name text:nth-child(3) {
  display: -webkit-box;
  overflow: hidden;
  /*超出隐藏*/
  text-overflow: ellipsis;
  /*隐藏后添加省略号*/
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.about-doctor {
  padding: 8rpx 30rpx;
  border-radius: 30rpx;
  border: 1rpx solid #0176ff;
  color: #0176ff;
}

/* 选中时间加上颜色 */
.changeColor {
  color: #0176ff;
}
</style>