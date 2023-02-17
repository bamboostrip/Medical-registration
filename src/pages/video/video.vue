<!--
 * @Author: bamboo
 * @Date: 2023-02-06 09:42:37
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-12 20:58:17
 * @FilePath: \wx-zhyl\src\pages\video\video.vue
 * @Description: 
-->
<template>
  <view class="video-view" v-for="(item, idx) in videoData" :key="idx">
    <view class="video-area">
      <video :src="item.video_url" :id="item._id" :controls="item.controls" :show-center-play-btn="false"
        object-fit="cover" :title="item.video_title"></video>
      <text class="video-title">{{ item.video_title }}</text>
      <image v-if="item.play_but" @click="startPlay(idx, item._id)" src="/static/other/video-bofang.png"
        mode="widthFix" />
    </view>
    <view class="video-name">
      <image :src="item.avatar" mode="widthFix" />
      <text>{{ item.name }}</text>
    </view>
  </view>

  <!-- 加载图标 -->
  <view class="Loading">
    <image v-if="loading" src="/static/other/loading.svg" mode="widthFix" />
  </view>
</template>

<script setup lang="ts">
import { RequestApi } from "@/public/request";
import { onMounted, ref } from "vue";
import { Videotype } from "@/public/decl-type";
import { onReachBottom, onShow } from "@dcloudio/uni-app";

//请求页面数据
onMounted(() => {
  retriData(0)
})
let videoData = ref<Videotype[]>([])
const retriData = async (page: number) => {
  const res = await RequestApi.VideoList({ page }) as { data: { data: Videotype[] } }
  if(res.data.data.length>0){
    videoData.value = [...videoData.value, ...res.data.data]
  }else{
    toggle.value = false
    uni.showToast({
      title:'没有更多内容了!',
      icon:'error'
    })
  }
}

//进入页面暂停播放
onShow(() => {
  uni.createVideoContext(videoId.value).pause()
})

//下拉加载
let toggle = ref(true) //是否可以下拉加载
let loading = ref(false)
let pageNum = ref(0)
if (toggle.value) {
  onReachBottom( async() => {
    loading.value = true
    pageNum.value++
    await retriData(pageNum.value)
    loading.value = false
  })
}

//点击播放
const startPlay = (idx: number, id: string) => {
  videoData.value[idx].controls = true
  videoData.value[idx].play_but = false
  dealWith(id, idx)
}

//处理视频暂停播放
let videoId = ref('')
let videoIdx = ref(-1)
const dealWith = (id: string, idx: number) => {
  if (videoId.value === '') {//初次播放
    videoId.value = id
    videoIdx.value = idx
    uni.createVideoContext(id).play()
  } else {//上一个暂停,此视频播放
    let prevideo = uni.createVideoContext(videoId.value)
    if (videoId.value !== id) {
      prevideo.pause()
      pauseFun(videoIdx.value)
    }
    setTimeout(() => {
      videoId.value = id
      videoIdx.value = idx
      uni.createVideoContext(id).play()
    }, 100)
  }
}

//暂停触发
const pauseFun = (idx: number) => {
  videoData.value[idx].controls = false
  videoData.value[idx].play_but = true
}
</script>

<style>
page {
  background: #f5f5f5;
}

.video-view {
  background-color: #ffffff;
  margin-bottom: 30rpx;
}

.video-area {
  height: 400rpx;
  position: relative;
}

.video-area video {
  height: 400rpx;
  width: 100%;
  display: block;
}

.video-area image {
  width: 100rpx;
  height: 100rpx;
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.video-title {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  right: 20rpx;
  z-index: 99;
  color: #ffffff;
  font-size: 35rpx;
  font-weight: bold;
}

.video-name {
  display: flex;
  align-items: center;
  padding: 20rpx;
}

.video-name image {
  width: 40rpx;
  height: 40rpx;
  display: block;
  margin-right: 20rpx;
  border-radius: 50%;
}

/* loading */
.Loading {
  height: 150rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Loading image {
  display: block;
  width: 70rpx;
  height: 70rpx;
  animation: myfirst 1s infinite linear;
}

@keyframes myfirst {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}
</style>