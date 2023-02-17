<!--
 * @Author: bamboo
 * @Date: 2023-02-06 09:41:27
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-12 21:19:59
 * @FilePath: \wx-zhyl\src\pages\registered\registered.vue
 * @Description: 
-->
<template>
  <view class="regist-view">
    <!-- 左边 -->
    <view class="regist-left">
      <text :class="addColor === idx ? 'addcolor' : ''"
       v-for="(item,idx) in deparData" :key="idx"
       @click="childrenReglist(idx,item._id)">{{item.dep_ment}}</text>
    </view>
    <!-- 右边 -->
    <view class="regist-right">
      <block v-for="(item,idx) in regListData" :key="idx" >
        <view v-for="(v,i) in item.dep_ment_list" :key="i" @click="goDoctor(v.dep_id)" >{{ v.dep_name }}</view>
      </block>
    </view>
  </view>

   <!-- 骨架屏 -->
   <skIndex v-if="skeLeton" />
</template>

<script setup lang="ts">
import { Departdata, Reglist } from "@/public/decl-type";
import { RequestApi } from "@/public/request";
import { onMounted, ref } from "vue";
// 骨架屏
import skIndex from '@/Skeleton/SK-registered.vue' 

//骨架屏
let skeLeton = ref(true)

//请求数据
let deparData = ref<Departdata[]>([]) //父科室的数据
onMounted(async () => {
  const res = await RequestApi.DeparTment() as { data: { data: Departdata[] } }
  deparData.value = res.data.data
  childrenReglist(0, res.data.data[0]._id)
  skeLeton.value =false
})

//点击父科室
let addColor = ref(0)

//请求子科室
let regListData = ref<Reglist[]>([]) //子科室的数据
const childrenReglist = async (idx: number, id: string) => {
  addColor.value = idx
  const res = await RequestApi.RegList({ id }) as { data: { data: Reglist[] } }
  regListData.value = res.data.data
}

//跳转选择医生
const goDoctor = (id:string) => {
  uni.navigateTo({
    url:`/pages/doctor/index?id=${id}`
  })
}

</script>

<style scoped>
.regist-view {
  display: flex;
  justify-content: space-between;
}

.regist-left {
  background-color: #f5f5f5;
  width: 200rpx;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  overflow: auto;
}

.regist-left text {
  display: block;
  padding: 25rpx;
}

.addcolor {
  background-color: #ffffff;
  color: #2c76ef;
}

.regist-right {
  padding-left: 200rpx;
  flex: 1;
}

.regist-right view {
  padding: 25rpx;
}
</style>