<!--
 * @Author: bamboo
 * @Date: 2023-02-10 16:53:58
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-12 14:02:36
 * @FilePath: \wx-zhyl\src\pages\phy-exam\Details.vue
 * @Description: 
-->
<template>
  <view class="details-Top" v-for="(item, idx) in phyData" :key="idx">
    <image :src="item.image" mode="aspectFill" />
    <view class="details-price">
      <text>{{ item.price }}</text>
      <text>已约{{ item.sales }}</text>
    </view>

    <text class="details-Title">{{ item.title }}</text>
  </view>

  <!-- 预约时段 -->
  <view class="nucleic-time">
    <text class="nucleic-Title">体检时间选择</text>
    <scroll-view scroll-x="true" class="scroll-view_H">
      <view class="nucleic-time-flex">
        <block v-for="(item, idx) in phyData" :key="idx">
          <view :class="i === timeIdx ? 'checkstyle' : ''" @click="changTime(i,v.date)" v-for="(v, i) in item.date"
            :key="i">
            <text>{{ v.date }}</text>
            <text>{{ v.week }}</text>
          </view>
        </block>
      </view>
    </scroll-view>
  </view>

  <!-- 适用人群 -->
  <view class="nucleic-time">
    <text class="nucleic-Title">适用人群</text>
    <view class="nucleic-crowd">
      <block v-for="(item, idx) in phyData" :key="idx">
        <view v-for="(v, i) in item.crowd" :key="i">
          <image :src="v.image" mode="aspectFill" />
          <text>{{ v.name }}</text>
        </view>
      </block>
    </view>
  </view>

  <!-- 套餐项目 -->
  <view class="nucleic-time">
    <view class="nucleic-Title">套餐项目</view>
    <view class="project-view" v-for="(item, idx) in phyData" :key="idx">
      <block v-for="(v,i) in item.project" :key="i" >
        <text class="project-Title">{{ v.title }}</text>
        <view class="project-card" v-for="(vv,j) in v.content" :key="j" >
          <view>{{ vv.thing }}</view>
          <view>{{ vv.details }}</view>
        </view>
      </block>
    </view>
  </view>

  <!-- 选择成员 -->
  <view style="height:300rpx"></view>

  <view class="Total-view" v-if="phyData[0]" >
    <text>检测费用:{{ phyData[0].price }}</text>
    <text @click="openPop" >选择成员</text>
  </view>

  <!-- 弹窗选择成员 -->
  <SemenMber ref="comPop" />

    <!-- 骨架屏 -->
    <skIndex v-if="skeLeton"></skIndex>

</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app"
import { ref, reactive } from "vue"
import { RequestApi } from '@/public/request'
import { Resdata, Phydetail,popups } from '@/public/decl-type'
import SemenMber from '@/com-components/se-member.vue'
// 骨架屏
import skIndex from '@/Skeleton/SK-phy-details.vue'

//骨架屏
let skeLeton = ref(true)

//接收上页面路径参数
let phyData = ref<Phydetail[]>([])
onLoad(async (e: any) => {
  //af2b6af462debec10006c2786e8ad647
  const res = await RequestApi.PhyDateil({ id: e.id }) as Resdata
  phyData.value = res.data.data
  subData.phy_name = e.tit
  skeLeton.value =false
})

//交给子组件的值
let subData = reactive<popups>({
  phy_name: '',
  phy_time:'',
  show:true
})

//选中预约时段
let timeIdx = ref(-1)
const changTime = (i: number,time:string) => {
  timeIdx.value = i
  subData.phy_time = time
}

//调用子组件的方法,选择成员打开弹窗
let comPop = ref()
const openPop = () => { 
  comPop.value.trigGer(subData)
 }


</script>

<style>
/* 表单提交 */
@import url('../../common-style/form.css');
/* 预约时间段 */
@import url('../../common-style/nucleic-time.css');

page {
  background-color: #fafafa;
}

/* 顶部 */
.details-Top {
  background-color: #ffffff;
}

.details-Top image {
  width: 100%;
  height: 400rpx;
  display: block;
}

.details-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
}

.details-price text:nth-child(1) {
  font-size: 35rpx;
  font-weight: bold;
  color: #ff5f2c;
}

.details-Title {
  padding: 0 0 20rpx 20rpx;
  display: block;
  font-weight: bold;
  font-size: 35rpx;
}

/* 适用人群 */
.nucleic-crowd {
  display: flex;
  justify-content: space-between;
  padding-top: 20rpx;
}

.nucleic-crowd view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nucleic-crowd image {
  width: 100rpx;
  height: 100rpx;
  display: block;
  margin-bottom: 10rpx;
  border-radius: 10rpx;
}

/* 套餐项目 */
.project-Title {
  background-color: #f0f2f8;
  display: block;
  border-radius: 10rpx;
  font-weight: bold;
  text-align: center;
  padding: 20rpx 0;
  margin: 20rpx 0;
}

.project-card {
  display: flex;
  flex-wrap: wrap;
}

.project-card view {
  margin: 5rpx;
  background-color: #f0f2f8;
  border-radius: 10rpx;
  padding: 20rpx 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-card view:nth-child(1) {
  width: 200rpx;
  margin-left: auto;
}

.project-card view:nth-child(2) {
  flex: 1;
  margin-right: auto;
}

/* 选中加上样式 */
.checkstyle {
  background-color: #2c76ef !important;
  color: #ffffff !important;
}
</style>