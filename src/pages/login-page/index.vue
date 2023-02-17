<!--
 * @Author: bamboo
 * @Date: 2023-02-07 18:51:49
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-14 08:42:21
 * @FilePath: \wx-zhyl\src\pages\login-page\index.vue
 * @Description: 
-->
<template>
  <view class="Login-page">
    <image mode="aspectFill" src="https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/denglu-yemian.jpg">
    </image>
    <button @click="Login">授权登陆</button>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { RequestApi } from '@/public/request'

//授权登录
function Login() {
  uni.getUserInfo({
    success: res => {
      console.log('user', res);
      let { avatarUrl, nickName } = res.userInfo
      //获取code
      uni.login({
        success: code => {
          uni.showLoading({
            title: '登录中',
            mask: true
          })
          ApiLogin(avatarUrl, nickName, code.code)
        },
        fail: rej => {
          uni.showToast({
            title: '登录失败',
            icon: 'error',
            duration: 1000
          })
          console.log(rej);
        }
      })
    },
    fail: rej => {
      uni.showToast({
        title: '拒绝登录',
        icon: 'error',
        duration: 1000
      })
      console.log(rej);
    }
  })
}

//调用api接口登录
async function ApiLogin(avatarUrl: string, nickName: string, code: string) {
  try {
    let obj = { appid: 'wxa0a173600022f117', secret: 'b6751e4961b7a4445aa199143902c8a6', avatarUrl, nickName, code }
    let res: any = await RequestApi.WxinLogin(obj)
    //存储用户信息到本地缓存,然后返回上一页
    uni.setStorageSync('wxuser', res.data.data)
    setTimeout(() => {
      uni.navigateBack({ delta: 1 })
      uni.hideLoading()
    }, 500)
    console.log('登录res: ', res);
  } catch (error) {
    uni.showToast({
      title: '登录失败',
      icon: 'error',
      duration: 1000
    })
    console.log(error);
  }
}
</script>

<style>
.Login-page {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.Login-page image {
  width: 100%;
  height: 100%;
}

.Login-page button {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 30%;
  background-color: #2c76ef;
  color: #ffffff;
  padding: 0 100rpx;
  font-size: 35rpx;
}
</style>