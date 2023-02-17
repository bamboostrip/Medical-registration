<template>
  <block v-for="(item, idx) in doctorHomeData" :key="idx">
    <!-- 医生个人信息 -->
    <view class="homepage-back">
      <view class="doctor-int">
        <image :src="item.avatar" mode="aspectFill" />
        <view>
          <view class="doctor-int name-padd">
            <text class="do-name">{{ item.name }}</text>
            <text>{{ item.post }}</text>
          </view>
          <text>{{ item.hospital }}</text>
        </view>
      </view>
      <text class="good-at">{{ item.good_at }}</text>
    </view>

    <!-- 预约时段 -->
    <view class="homepage-back">
      <text class="res-Title">预约挂号</text>
      <view class="table">
        <view class="table-left">
          <text>日期</text>
          <text>上午</text>
          <text>下午</text>
        </view>
        <scroll-view scroll-x class="scroll-view_H" enable-flex="true">
          <view class="TR" v-for="(v, i) in item.App_ment" :key="i">
            <view>
              <text class="table-day">{{ v.day }}</text>
              <text>{{ v.week }}</text>
            </view>
            <!-- 上午 -->
            <view :class="[v.time[0].nu_source <= 0 ? 'Disa' : 'Have']"
            @click="chooseTime(v.week,v.time[0].the_time,v.time[0].when)">
              {{ v.time[0].nu_source <= 0 ? '' : '预约' }} </view>
                <!-- 下午 -->
                <view :class="[v.time[1].nu_source <= 0 ? 'Disa' : 'Have']"
                @click="chooseTime(v.week,v.time[1].the_time,v.time[1].when)">
                  {{ v.time[1].nu_source <= 0 ? '' : '预约' }} </view>
                </view>
        </scroll-view>
      </view>
    </view>
  </block>
  <!-- 提示 -->
  <view class="prompt">
    <text>重要提示:</text>
    <text>1.本次预约就诊当天不可取消预约,如需取消,请在就诊前一天的24:00之前操作,累计取消或爽约三次可能会被列入医院黑名单,请按需预约</text>
    <text>2.预约挂号暂不支持医保支付,若本次挂号使用手机在线支付,就诊过程中的门诊检验检查,处方费用可能不支持医保支付</text>
  </view>

  <!-- 弹窗组件 -->
  <popUps ref="doctorPops" />

    <!-- 骨架屏 -->
    <skIndex v-if="skeLeton" />
</template>

<script setup lang="ts">
import { Doctorhome, DoctortimeData } from "@/public/decl-type"
import { RequestApi } from "@/public/request"
import { onLoad } from "@dcloudio/uni-app"
import { ref, reactive } from "vue"
//预约弹窗组件
import popUps from "./components/pop-ups.vue"
//骨架屏
import skIndex from '@/Skeleton/SK-doctor-home.vue'

//骨架屏
let skeLeton = ref(true)

//接收上页面传递数据 / 请求页面数据
let _id = ref('') //医生id
let doctorHomeData = ref<Doctorhome[]>([])//存储页面数据
onLoad(async (e) => {
  let { id } = e as { id: string }
  _id.value = id
  const res = await RequestApi.DoctorHome({ _id: id }) as { data: { data: Doctorhome[] } }
  console.log('res: ', res);
  doctorHomeData.value = res.data.data
  skeLeton.value = false
})

//调用子组件传值
let doctorPops = ref()
const chooseTime = (week: string,the_time: string[],when: number) => {
  let value: DoctortimeData = {
    show: true,
    week,
    the_time,
    when,
    _id:_id.value
  }
  doctorPops.value.trigGer(value)
}

</script>

<style>
page {
  background: linear-gradient(to bottom, #e8f4ff 30%, #f2f7fb 55%, #f0f5f9 90%);
}

.homepage-back {
  background-color: #ffffff;
  padding: 20rpx;
  margin: 20rpx;
  border-radius: 10rpx;
}

/* 顶部 */
.doctor-int image {
  display: block;
  width: 150rpx;
  height: 150rpx;
  margin-right: 20rpx;
}

.doctor-int {
  display: flex;
  align-items: center;
}

.do-name {
  font-size: 35rpx;
  font-weight: bold;
  padding-right: 10rpx;
}

.name-padd {
  padding-bottom: 20rpx;
}

.good-at {
  line-height: 1.5;
  padding-top: 20rpx;
}

/* 预约挂号 */
.res-Title {
  display: block;
  padding-bottom: 20rpx;
  font-size: 35rpx;
}

.table {
  display: flex;
}

.table-left text {
  display: block;
  height: 140rpx;
  line-height: 140rpx;
  border: 0.5rpx solid #dfdfdf;
}

.table-left {
  width: 100rpx;
  text-align: center;
}

.scroll-view_H {
  white-space: nowrap;
  overflow: scroll;
  width: 100%;
  display: flex;
  height: 440rpx;
}

.TR {
  display: inline-block;
  text-align: center;
  white-space: pre-wrap;
  height: fit-content;
}

.TR text {
  display: block;
}

.TR view {
  width: 130rpx;
  height: 140rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.5rpx solid #dfdfdf;
}

.table-day {
  color: #8c8c8c;
}

/* 禁用点击 */
.Disa {
  pointer-events: none;
}

/* 有号 */
.Have {
  background-color: #0075ff;
  color: #ffffff;
}

/* 提示 */
.prompt text {
  display: block;
  padding: 10rpx 20rpx;
  font-size: 26rpx;
  color: #636468;
  line-height: 1.5;
}
</style>