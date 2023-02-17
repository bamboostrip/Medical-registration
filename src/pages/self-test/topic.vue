<template>
  <view class="progress-box">
    <text>测评进度</text>
    <progress class="progress" :percent="percent" border-radius="40" stroke-width="9" color="#cce3ff"
      activeColor="#2d8dfe" active="true" active-mode="forwards" duration="15" />
    <text>{{ addQuest }}/{{ questNum }}</text>
  </view>

  <!-- 题目 -->
  <view class="question">{{ data.topic }}</view>

  <!-- 单选题 -->
  <view class="topic-view">
    <view class="topic-Title">
      <text></text>
      <text>单选题</text>
    </view>
    <view class="totic" hover-class="hover-style" hover-stay-time="300" @click="chosse(item.son_id)"
      v-for="(item, idx) in data.options" :key="idx">
      {{ item.title }}
    </view>
  </view>

  <!-- 骨架屏 -->
  <skIndex v-if="skeLeton" />
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, watch, watchEffect } from "vue"
import { RequestApi } from "@/public/request";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { Topic } from "@/public/decl-type";
// 骨架屏
import skIndex from '@/Skeleton/SK-self-test.vue'

//骨架屏
let skeLeton = ref(true)

//用于判断请求什么接口 '001':抑郁症 '002':男性功能 '003':失眠
let previously = ref('')

//接收上页面数据
onLoad((e) => {
  let { type, name } = e as { type: string, name: string }
  previously.value = type
  uni.setNavigationBarTitle({
    title: name
  })
})

//存储题目
let topicData = ref<Topic[]>([])
//总题目数量
let questNum = ref(0)
//存储每一题数据
let eachQuest = reactive<{ data: Topic }>({
  data: {
    topic: '',
    _id: '',
    options: []
  }
})
let { data } = toRefs(eachQuest)

//请求页面数据
onShow(async () => {
  //清空上一次的值
  addQuest.value = 1
  addTo.value = 0
  percent.value = 0
  topicId.data = []

  if (previously.value === '001') {
    var res: any = await RequestApi.DepressionTopics()
  } else if (previously.value === '002') {
    var res: any = await RequestApi.PrematureTopics()
  } else if (previously.value === '003') {
    var res: any = await RequestApi.InsomniaTopics()
  }
  console.log(res.data);
  topicData.value = res.data.data
  questNum.value = res.data.data.length
  eachQuest.data = res.data.data[0]

  percent.value = (100 / questNum.value)
  skeLeton.value = false
})

//存储每一道题下标:初次进入
let addQuest = ref(1)
//存储每一道题下标:点击存储
let addTo = ref(0)
//进度条计算
let percent = ref(0)
//存储每次的选项id
let topicId = reactive<{ data: string[] }>({
  data: []
})
//选择题目选项触发
const chosse = (id: string) => {
  // addTo.value++
  // //存储每一次选项
  // topicId.data.push(id)
  // if (addTo.value < questNum.value) {
  //   //题目
  //   addQuest.value++
  //   //进度条计算
  //   percent.value = (100 / questNum.value) * addQuest.value
  //   eachQuest.data = topicData.value[addTo.value]
  // }

  //题目
  addTo.value++
  //存储每一次选项
  topicId.data.push(id)

  if (addTo.value === questNum.value) {
    let OBJ = JSON.stringify({ type: previously.value, id: topicId.data, })
    uni.navigateTo({
      url: `/pages/self-test/result?value=${OBJ}`
    })
  } else {
    addQuest.value++
    //进度条计算
    percent.value = (100 / questNum.value) * addQuest.value
    eachQuest.data = topicData.value[addTo.value]
  }
}

//监听是否全部选择完毕,
// watch([addTo,questNum],(newVal,oldVal) => {
//   console.log(newVal);
//   if(newVal[0] === newVal[1]){
//     console.log('选完了');
//     let OBJ = JSON.stringify({type:previously.value,totic_id:topicId.data,})
//     uni.navigateTo({
//       url:`/pages/self-test/result?value=${OBJ}`
//     })
//   }
//  })


</script>

<style>
page {
  background: linear-gradient(to bottom, #d6e8ff 30%, #f2f7fb 55%, #f0f5f9 90%);
}

.progress-box {
  display: flex;
  align-items: center;
  padding: 20rpx;
}

.progress {
  flex: 1;
  padding: 0 40rpx;
}

.question {
  padding: 30rpx 20rpx;
  margin: 40rpx 20rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
}

.topic-view {
  background-color: #f3f8ff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin: 20rpx;
  box-shadow: #d6e8ff 0px 0px 23rpx 5rpx;
}

.topic-Title {
  display: flex;
  align-items: center;
}

.topic-Title text:nth-child(1) {
  width: 8rpx;
  height: 27rpx;
  background-color: #0d7cff;
  display: block;
  margin-right: 10rpx;
}

.totic {
  background: #ffffff;
  margin: 20rpx 0;
  padding: 40rpx 10rpx;
  border-radius: 10rpx;
}

.hover-style {
  background-color: #ebf4ff;
  color: #298cff;
}
</style>