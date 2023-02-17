<!--
 * @Author: bamboo
 * @Date: 2023-02-08 15:07:17
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-09 14:14:04
 * @FilePath: \wx-zhyl\src\pages\hpv-vaccine\hpv-buy.vue
 * @Description: 
-->
<template>
  <view class="hpv-choose">
    <view>
      <view class="hpv-type">{{routeValue.name}}</view>
      <view class="hpv-age">
        <text v-for="(item,idx) in routeValue.describe" :key="idx" >{{ item }}</text>
      </view>
    </view>
    <view class="hpv-price">{{ `&yen;${routeValue.price[0]}-&yen;${routeValue.price[1]}` }}</view>
  </view>
  <!-- 表单填写 -->
  <view class="xinguan-view">
    <view class="xinguan-flex">
      <text>真实姓名</text>
      <input type="text" placeholder="请输入真实姓名" v-model="submitData.name" placeholder-class="input-style">
    </view>
    <view class="xinguan-flex">
      <text>身份证</text>
      <input type="text" placeholder="请输入身份证号码" v-model="submitData.id_card" placeholder-class="input-style">
    </view>

    <view class="xinguan-flex">
      <text>性别</text>
      <picker mode="selector" :range="['男', '女']" class="flex-left" @change="changeSex" >
        <view>
          <text>{{ gender === '' ? '请选择性别' : gender }}</text>
          <image src="/static/other/gengduo.svg" mode="scaleToFill" />
        </view>
      </picker>
    </view>

    <view class="xinguan-flex">
      <text>出生日期</text>
      <picker mode="date" class="flex-left" @change="changeBirthday" >
        <view>
          <text>{{ birthday === '' ? '请选择出生日期' : birthday }}</text>
          <image src="/static/other/gengduo.svg" />
        </view>
      </picker>
    </view>

    <view class="xinguan-flex">
      <text>手机号</text>
      <input type="number" placeholder="请输入手机号" v-model="submitData.phone" placeholder-class="input-style">
    </view>
  </view>
  <!-- 选择套餐 -->
  <view class="combo-view">
    <block v-for="(item, idx) in hpv_combo_name" :key="idx">
      <text class="combo-title">{{ item.title }}</text>
      <view class="combo-list">
        <text v-for="(v, i) in item.name" :key="i" :class="i == COMBO ? 'checkstyle' : ''"
          @click="changCombo(i, v.combo_id, v.combo)">{{ v.combo }}</text>
      </view>
    </block>
    <!-- 接种时间 -->
    <block v-for="(item, idx) in hpv_combo_time" :key="idx">
      <text class="combo-title">{{ item.title }}</text>
      <view class="combo-list">
        <text v-for="(v, i) in item.name" :key="i" :class="i == TIME ? 'checkstyle' : ''"
          @click="changTime(i, v.time_id, v.time)">{{ v.time }}</text>
      </view>
    </block>
  </view>
  <!-- 提交 -->
  <view style="height:300rpx"></view>
  <view class="Total-view">
    <text>合计:&yen;{{ hpvComboPrice }}</text>
    <text @click="submit" >提交</text>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app"
import { ref, reactive, watch, watchEffect, toRefs } from "vue"
import { RequestApi } from '@/public/request'
import { Hpvcomponame, Hpvcompotime } from '@/public/decl-type'

//套餐名称
let hpv_combo_name = ref<Hpvcomponame[]>([])
//套餐接种时间
let hpv_combo_time = ref<Hpvcompotime[]>([])
//接收上页面传来的值
let routeValue = reactive({
  id:'',
  name:'',
  price:[''],
  describe:['']
})
onLoad(async (e: any) => {
  //获得上页面的值
  let {id,name,price,describe} = JSON.parse(e.value)
  routeValue.id = id
  routeValue.name = name
  routeValue.price = price
  routeValue.describe = describe
  //获取HPV疫苗套餐
  const res: any = await RequestApi.HpvPack()
  console.log('res: ', res);
  hpv_combo_name.value = [res.data.data[0]]
  hpv_combo_time.value = [res.data.data[1]]
})

//选中套餐名称
let COMBO = ref(-1)
let combo_id = ref('')
let combo_name = ref('')
const changCombo = (idx: number, id: string, name: string) => {
  COMBO.value = idx
  combo_id.value = id
  combo_name.value = name
}
//选中接种时间
let TIME = ref(-1)
let time_id = ref('')
let combo_time = ref('')
const changTime = (idx: number, id: string, time: string) => {
  TIME.value = idx
  time_id.value = id
  combo_time.value = time
}
//"8d33255162dc5b22001ef71d79da04cd" //测试用

//监听选中套餐名称和接种时间请求价格
// watch([combo_id,time_id],(newVal,oldVal) => {
//   if(newVal[0] !== '' && newVal[1] !== ''){
//     uni.showLoading({
//             title: '获取价格',
//             mask: true
//           })
//   hpvPrice()
//   }
// })
watchEffect(() => {
  if (combo_id.value !== '' && time_id.value !== '') {
    uni.showLoading({
      title: '获取价格',
      mask: true
    })
    hpvPrice()
  }
})

//请求套餐价格
let hpvComboPrice = ref(0)
const hpvPrice = async () => {
  console.log(routeValue.id);
  console.log(combo_id.value);
  console.log(time_id.value);
  const res: any = await RequestApi.HpvPrice(
    { hpv_id: routeValue.id, combo_id: combo_id.value, time_id: time_id.value }
  )
  hpvComboPrice.value = res.data.data[0].price
  uni.hideLoading()
}

//选择性别
let gender = ref('')
const changeSex = (e:any) => {
  gender.value = e.detail.value === '0' ? '男' : '女'
}

//选择出生日期
let birthday = ref('')
const changeBirthday = (e: any) => {
  birthday.value = e.detail.value
}

//待提交数据
let submitData = reactive({
  name:'',
  id_card:'',
  gender,
  born_date:birthday,
  phone:'',
  combo:combo_name,
  ino_time:combo_time,
  price:hpvComboPrice,
  hpv_name:toRefs(routeValue).name
})

//提交订单
const submit = async() => { 
  uni.showLoading({
    title:'提交中',mask:true
  })
  const res: any = await RequestApi.ResHpv(submitData)
  console.log('提交: ', res);
  if(res.statusCode === 200){
    uni.hideLoading()
    //跳转订单页面
    uni.redirectTo({
      url:'/pages/my-service/hpv-view/index'
    })
  }
 }

</script>

<style>
/* 表单提交 */
@import url('../../common-style/form.css');

page {
  background-color: #fafafa;
}

.hpv-choose {
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 20rpx;
  margin-bottom: 40rpx;
}

.hpv-type {
  font-size: 35rpx;
}

.hpv-age {
  display: flex;
  align-items: center;
}

.hpv-age text {
  background-color: #f4f6fa;
  padding: 7rpx;
  font-size: 25rpx;
  margin: 10rpx 10rpx 10rpx 0;
}

.hpv-price {
  font-weight: bold;
  color: #ff5f2c;
}

/* 套餐 */
.combo-view {
  background-color: #ffffff;
  padding: 20rpx;
  margin: 20rpx 0;
}

.combo-title {
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.combo-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.combo-list text {
  padding: 20rpx 40rpx;
  background-color: #f5f5f5;
  margin: 0 20rpx 20rpx 0;
  border-radius: 10rpx;
  display: block;
}

/* 选中加上样式 */
.checkstyle {
  background-color: #2c76ef !important;
  color: #ffffff !important;
}
</style>