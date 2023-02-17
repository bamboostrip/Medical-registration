<!--
 * @Author: bamboo
 * @Date: 2023-02-12 14:59:51
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-12 19:19:50
 * @FilePath: \wx-zhyl\src\pages\self-test\result.vue
 * @Description: 
-->
<template>
  <view class="back-color">
    <view class="result-top">
      <text>结果分析</text>
      <text>本测试及结果由AI得出,仅供参考,不能作为诊断及诊疗的依据</text>
    </view>

    <view class="result-desc" v-for="(item, idx) in testRes" :key="idx">
      <view>{{ item.scope }}:{{ item.result }}</view>
      <view>{{ item.suggest }}</view>
      <view class="bold">测评结果概述:</view>
      <view v-for="(v, i) in item.outline" :key="i">{{ `${i + 1}. ${v}`}}</view>
      <block v-if="item.recommend.length" >
        <view class="bold">AI为你推荐一下科室</view>
        <view class="recommend" v-for="(v,i) in item.recommend" :key="i" >
          <label>
            <text class="bold">{{ v.dep_name }}</text>
            <text class="hosp">{{ v.hospital }}</text>
          </label>
          <label class="regi" @click="canCel" >去挂号</label>
        </view>
      </block>
    </view>
  </view>

  <!-- 按钮 -->
  <view class="exceed"></view>
  <view class="submit">
    <button plain="true" open-type="share">邀请朋友测一测</button>
    <button plain="true" @click="canCel" >再测一次</button>
  </view>

  <!-- 骨架屏 -->
  <skIndex v-if="skeLeton" />
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue"
import { RequestApi } from "@/public/request";
import { onLoad, onShareAppMessage, onShow } from "@dcloudio/uni-app";
import { Testres,Sharedata } from "@/public/decl-type";
import { TEST } from "@/public/testing"
// 骨架屏
import skIndex from '@/Skeleton/SK-self-test-result.vue'

//骨架屏
let skeLeton = ref(true)

//接收上页面传值
let topic_id = ref<string[]>([])
let previously = ref('')//判断请求什么页面
let shareData = ref<Sharedata[]>([]) //分享的数据
onLoad((e: any) => {
  let {type,id} = JSON.parse(e.value)
  topic_id.value = id
  previously.value = type
  //过滤分享的数据
  shareData.value = TEST.filter(item => item.type === type)
})

//存储测试结果
let testRes = ref<Testres[]>([])
onShow(async () => {
  if (previously.value === '001' ) {//抑郁症
    var res: any = await RequestApi.Depression({ value: topic_id.value })
  } else if (previously.value === '002') {//男性功能
    var res: any = await RequestApi.Premature({ value: topic_id.value })
  } else if (previously.value === '003') {//失眠
    var res: any = await RequestApi.Insomnia({ value: topic_id.value })
  }
  testRes.value = res.data.data
  skeLeton.value =false
})

//分享
onShareAppMessage(() => { 
  return {
    title:shareData.value[0].share_title,
    path:shareData.value[0].share_path,
    imageUrl:shareData.value[0].share_url
  }
 })

//再测一次
const canCel = () => { 
  uni.navigateBack({
    delta:1
  })
 }

</script>

<style>
@import url('../../common-style/form.css');

page {
  background: #f0f5f9;
}

.back-color {
  background: -webkit-linear-gradient(top, #d6e8ff 30%, #f2f7fb 55%, #f0f5f9 90%);
}

.result-top {
  display: flex;
  flex-direction: column;
  padding: 20rpx;
}

.result-top text:nth-child(1) {
  font-size: 35rpx;
  font-weight: bold;
  padding-bottom: 20rpx;
}

.result-desc {
  background-color: #ffffff;
  border-radius: 10rpx;
  margin: 20rpx;
  padding: 20rpx;
}

.result-desc view {
  margin-bottom: 20rpx;
  line-height: 1.5;
}

.result-desc view:nth-child(1) {
  font-size: 40rpx;
  font-weight: bold;
  color: #0d7cff;
}

.result-desc view:nth-child(2) {
  color: #0d7cff;
}

.bold {
  font-weight: bold;
  display: block;
}

.recommend {
  background-color: #f4f7fa;
  border-radius: 10rpx;
  padding: 30rpx 20rpx;
  display: flex;
  justify-content: space-between;
}

.Hosp {
  color: #bac5cc;
}

.regi {
  align-self: center;
  background-color: #0176ff;
  color: #ffffff;
  padding: 10rpx 20rpx;
  border-radius: 10rpx;
}

.exceed {
  height: 300rpx;
  background: #f0f5f9;
}
</style>