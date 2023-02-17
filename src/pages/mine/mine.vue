<!--
 * @Author: bamboo
 * @Date: 2023-02-06 09:43:06
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-14 10:38:06
 * @FilePath: \wx-zhyl\src\pages\mine\mine.vue
 * @Description: 
-->
<template>
  <view class="user-name">
    <image :src="userData.avatarUrl === '' ? '/static/other/touxiang.svg' : userData.avatarUrl" mode="aspectFill" />
    <text @click="login" :class="userData.nickName === '' ? 'split-new' : 'disabled'">{{
      userData.nickName === '' ? '登录' :
        userData.nickName
    }}</text>
  </view>
  <view class="infor_mation">
    <view v-for="(item, idx) in inforMation" :key="idx">
      <text>{{ item.number }}</text>
      <text>{{ item.title }}</text>
    </view>
  </view>
  <view>
    <view class="my-order">
      <view v-for="(item,idx) in orderMenu" :key="idx" @click="goOrder(item.path)" >
        <image :src="item.icon" />
        <text>{{ item.title }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { onShow } from "@dcloudio/uni-app";


//获取用户信息
let userData = ref({
  avatarUrl: '',
  nickName: ''
})
onShow(() => {
  let wxUser = uni.getStorageSync('wxuser') as { avatarUrl: string, nickName: string }
  if (!wxUser) {
    userData.value.avatarUrl = ''
    userData.value.nickName = ''
  } else {
    userData.value.avatarUrl = wxUser.avatarUrl
    userData.value.nickName = wxUser.nickName
  }
})

//点击登录
const login = () => {
  uni.navigateTo({
    url: '/pages/login-page/index'
  })
}

//状态
let inforMation = reactive([
  {
    number: 5,
    title: '健康分'
  },
  {
    number: 5,
    title: '优惠券'
  },
  {
    number: 5,
    title: '消息'
  }
])

//订单
let orderMenu = reactive([
  {
    icon: '/static/mine/jiuzhenren.svg',
    title: '就诊人管理',
    path:'/pages/my-service/my-patient/my-patient'
  },
  {
    icon: '/static/mine/guahao.svg',
    title: '我的挂号',
    path:'/pages/my-service/my-registration/index'
  }, {
    icon: '/static/mine/xinguanyimiao.svg',
    title: '新冠疫苗',
    path:'/pages/my-service/xinguan/index'
  }, {
    icon: '/static/mine/hpvyimiao.svg',
    title: 'HPV疫苗',
    path:'/pages/my-service/hpv-view/index'
  }, {
    icon: '/static/mine/hesuan.svg',
    title: '核酸检测',
    path:'/pages/my-service/nucleic-acid/index'
  }, {
    icon: '/static/mine/tijianbaogao.svg',
    title: '我的体检',
    path:'/pages/my-service/phy-exam/index'
  },
])

//跳转相应订单页面
const goOrder = (path: string) => {
  uni.navigateTo({
    url:path
  })
}

</script>

<style>
page {
  background: linear-gradient(to bottom, #e3efff 30%, #f6f6f6 40%);
}

/* 昵称 */
.user-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font-size: 35rpx;
}

.user-name image {
  width: 80rpx;
  height: 80rpx;
  display: block;
  border-radius: 50%;
  border: 5rpx solid #ffffff;
  margin-bottom: 10rpx;
}

/* 三个排列 */
.infor_mation view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.infor_mation {
  display: flex;
  justify-content: space-around;
  font-weight: bold;
  margin: 50rpx 0;
}

.infor_mation text {
  padding-bottom: 15rpx;
}

/* 我的订单 */
.my-order {
  background-color: #ffffff;
  border-radius: 20rpx;
  margin: 0 20rpx 20rpx 20rpx;
  display: flex;
  flex-wrap: wrap;
  font-size: 28rpx;
}

.my-order image {
  width: 60rpx;
  height: 60rpx;
  margin-bottom: 25rpx;
}

.my-order view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(25% - 20rpx*2);
  margin: 20rpx;
}

/* 未登陆的背景 */
.split-new {
  background: #0176ff;
  color: #ffffff;
  border-radius: 10rpx;
  padding: 10rpx 50rpx;
}

/* 禁用点击 */
.disabled {
  pointer-events: none;
}
</style>