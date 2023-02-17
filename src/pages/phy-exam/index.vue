<template>
  <view class="Top-view">
    <view v-for="(item, idx) in phyTerm" :key="idx" @click="chooseCombo(idx,item.filter_val)" >
      <text>{{ item.query_val }}</text>
      <image :src="idx === 0 ? '../../static/other/shaixuan-jiantou.png' : '../../static/other/shaixuan.png'" />
    </view>
  </view>
  <view style="height:100rpx"></view>

  <!-- 点击全部筛选的弹窗 -->
  <view class="mask-view" v-show="modal" ></view>
  <view class="con-view" v-show="modal">
    <block v-if="phyTerm.length > 0" >
      <text v-for="(item,idx) in phyTerm[0].filter_val" :key="idx"
      @click="selectType(item)"
      >{{ item }}</text>
    </block>
  </view>

  <!-- 列表 -->
  <view class="phy-exam-back" v-for="(item, idx) in phyData" :key="idx"
  @click="goPhyDetail(item._id,item.title)"
  >
    <text class="phy-exam-type">{{ item.title }}</text>
    <view class="phy-exam-flex">
      <image :src="item.image" mode="aspectFill" />
      <view>
        <text class="phy-exam-title">{{ item.be_suit }}</text>
        <text class="phy-exam-label">{{ item.describe }}</text>
      </view>
    </view>

    <view class="phy-exam-price">
      <text>已约{{ item.sales }}</text>
      <text>{{ item.price }}</text>
    </view>

  </view>

  <view style="height:300rpx"></view>

    <!-- 骨架屏 -->
    <skIndex v-if="skeLeton"></skIndex>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import { RequestApi } from "@/public/request";
import { Phyterm, Phydata,Resdata } from "@/public/decl-type";
// 骨架屏
import skIndex from '@/Skeleton/SK-phy-exam.vue'

//骨架屏
let skeLeton = ref(true)

let phyTerm = ref<Phyterm[]>([]) //筛选条件
let phyData = ref<Phydata[]>([]) //套餐列表

//请求页面数据

onMounted(async () => {
  const res = await Promise.all([RequestApi.PhyTerm(), RequestApi.PhysGet()]) as Resdata[]
  console.log('res: ', res);
  phyTerm.value = res[0].data.data
  phyData.value = res[1].data.data
  skeLeton.value =false
})

//显示隐藏弹窗
let modal = ref(false)
//存储筛选值
let filterData = reactive({
  type:'',
  sales:'',
  price:''
})
//类型查询
const selectType = (value: string) => { 
  phyTerm.value[0].query_val = value
  modal.value = false
  filterData.type = value
  queryCombo()
 }

//点击筛选条件
const chooseCombo = (idx: number,value:string[]) => { 
  if(idx === 0){ 
    modal.value = !modal.value
  }else if(idx === 1){//按销量
    filterData.sales = value[0]
    phyTerm.value[idx].filter_val[0]= value[0] ==='desc' ? 'asc' : 'desc'
    queryCombo()
  }else {//按价格
    filterData.price =value[0]
    phyTerm.value[idx].filter_val[0]= value[0] === 'desc' ? 'asc' : 'desc'
    queryCombo()
  }
 }

 //查询体检套餐
 const queryCombo = async() => { 
  const res = await RequestApi.PhyQuery(filterData) as Resdata
  phyData.value = res.data.data
  }

  //跳转详情页
  const goPhyDetail = (id:string,tit:string) => { 
    uni.navigateTo({
      url:`/pages/phy-exam/Details?id=${id}&tit=${tit}`
    })
   }

</script>

<style>
page {
  background-color: #fafafa;
}

.Top-view {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50rpx;
  height: 100rpx;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}

.Top-view view {
  display: flex;
  align-items: center;
}

.Top-view image {
  width: 20rpx;
  height: 20rpx;
  display: block;
  padding-left: 10rpx;
}

/* 筛选条件 */
.mask-view {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 100rpx;
  background-color: rgba(0, 0, 0, 0.5);
}

.con-view {
  background-color: #ffffff;
  padding: 0 50rpx;
  position: fixed;
  top: 100rpx;
  left: 0;
  right: 0;
}

.con-view text {
  display: block;
  padding: 20rpx 0;
}

/* 体检套餐 */
.phy-exam-back {
  background-color: #ffffff;
  padding: 20rpx;
  margin: 20rpx;
  border-radius: 10rpx;
}

.phy-exam-type {
  font-size: 35rpx;
  font-weight: bold;
}

.phy-exam-flex image {
  width: 200rpx;
  height: 200rpx;
  display: block;
}

.phy-exam-flex {
  display: flex;
  justify-content: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f6f6f6;
}

.phy-exam-flex view {
  flex: 1;
  padding-left: 20rpx;
}

.phy-exam-flex text {
  display: block;
}

.phy-exam-title {
  font-weight: bold;
  padding-bottom: 20rpx;
}

.phy-exam-label {
  color: #5555;
}

.phy-exam-price {
  display: flex;
  justify-content: space-between;
  padding-top: 20rpx;
  font-weight: bold;
  color: #ff5f2c;
}
</style>