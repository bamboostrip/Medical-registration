<template>
  <!-- 表单填写 -->
  <view class="xinguan-view">
    <view class="xinguan-flex">
      <text>姓名</text>
      <input placeholder="请输入姓名" v-model="penging_data.name" placeholder-class="input-style" type="text" />
    </view>
    <view class="xinguan-flex">
      <text>身份证</text>
      <input placeholder="请输入身份证" v-model="penging_data.id_card" placeholder-class="input-style" type="text" />
    </view>
    <view class="xinguan-flex">
      <text>手机号</text>
      <input placeholder="请输入手机号" v-model="penging_data.phone" placeholder-class="input-style" type="number" />
    </view>
    <view class="xinguan-flex">
      <text>现居地址</text>
      <picker mode="region" class="flex-left" @change="changeRegion">
        <view>
          <text>{{ penging_data.address === '' ? '请选择现居地址' : penging_data.address }}</text>
          <image src="/static/other/gengduo.svg" />
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>现居详细地址</text>
      <input placeholder="请输入现居详细地址" v-model="penging_data.de_address" placeholder-class="input-style" type="text" />
    </view>
    <view class="xinguan-flex">
      <text>疫苗人群分类</text>
      <picker mode="selector" class="flex-left" :range="selector_data" @change="changeSelector">
        <view>
          <text>{{ penging_data.crowd_sort === '' ? '请选择疫苗人群分类' : penging_data.crowd_sort }}</text>
          <image src="/static/other/gengduo.svg" />
        </view>
      </picker>
    </view>
  </view>

  <!-- 预约时间 -->
  <view>
    <!-- 医院地址 -->
    <view class="reserve-address">
      <text class="resrve-name">{{ timeData.data.Hospital }}</text>
      <text class="reserve-road">{{ timeData.data.address }}</text>
      <view class="reserve-title">
        <text v-for="(item, idx) in timeData.data.company" :key="idx">{{ item }}</text>
      </view>
    </view>
    <!-- 日期 -->
    <view class="Week" v-for="(item, idx) in timeData.data.week" :key="idx">
      <view class="Week-flex" @click="chooseWeek(item.date)">
        <view class="Week-style Week-sup" :class="penging_data.date === item.date ? 'checkstyle' : ''">
          <text>{{ item.day }}</text>
          <text>{{ item.date }}</text>
          <text>{{ item.have }}</text>
        </view>
      </view>
    </view>
  </view>
  <!-- 时段 -->
  <view class="period-view" v-for="(item, idx) in timeData.data.lasting" :key="idx">
    <text class="period-title">{{ item.period }}</text>
    <view class="Week-flex">
      <view class="Week-style Week-Down" v-for="(v, i) in item.time" :key="i"
        :class="idx + '-' + i === timeIdx ? 'checkstyle' : ''"
        @click="chooseTime(idx + '-' + i, item.period, v.start_time, v.end_time, v.when)">
        <text>{{ `${v.start_time}-${v.end_time}` }}</text>
        <text>剩余{{ v.over }}</text>
      </view>
    </view>
  </view>
  <view style="height:300rpx"></view>
  <!-- 底部按钮 -->
  <view class="submit">
    <text @click="Cancel">取消</text>
    <text @click="Submit">提交预约</text>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, toRefs } from 'vue'
import { RequestApi } from '@/public/request'
import { NewappTime } from '@/public/decl-type'

//请求新冠疫苗预约页面数据
let timeData = reactive<{ data: NewappTime }>({
  data: {
    Hospital: '',
    address: '',
    company: [],
    lasting: [],
    week: []
  }
})
onMounted(async () => {
  const res: any = await RequestApi.NewappTime()
  console.log('res: ', res);
  timeData.data = res.data.data[0]
})

//待提交的数据
let SubmitData = reactive({
  penging_data: {
    name: '',
    id_card: '',
    phone: '',
    address: '',
    de_address: '',
    crowd_sort: '',
    date: '',
    period: '',
    reserve_time: '',
    when: 0
  }
})
let { penging_data } = toRefs(SubmitData)

//选择省市区
const changeRegion = (event: any) => {
  console.log(event.detail.value);
  SubmitData.penging_data.address = event.detail.value.join(' ')
}

//选择疫苗人群分类
let selector_data = ref(['医疗卫生人员', '卫生系统内工作的其他人员', '因公出国人员',
  '对外劳务派遣人员', '留学生', '因私出国人员', '海关边检人员', '公安系统,消防人员',
  '党政机关,事业单位人员', '社区工作者', '教育工作者', '小学和中学学生', '其他人员'
])
const changeSelector = (event: any) => {
  SubmitData.penging_data.crowd_sort = selector_data.value[event.detail.value]
}

//选择日期
const chooseWeek = (date: string) => {
  SubmitData.penging_data.date = date
}

//选择时段
let timeIdx = ref('1')
const chooseTime = (idx: string, period: string, start: string, end: string, when: number) => {
  timeIdx.value = idx
  SubmitData.penging_data.period = period
  SubmitData.penging_data.reserve_time = `${start}-${end}`
  SubmitData.penging_data.when = when
}

//取消
const Cancel = () => {
  uni.navigateBack({ delta: 1 })
}
//提交
const Submit = async () => {
  uni.showLoading({
    title: '提交中',
    mask: true
  })
  const res: any = await RequestApi.Rescovid(SubmitData.penging_data)
  console.log('res2: ', res);
  if (res.statusCode === 200) {
    uni.showToast({
      title: res.data.msg,
    })
    setTimeout(() => {
      uni.navigateTo({
        url: '/pages/my-service/xinguan/index'
      })
      uni.hideLoading()
    }, 500)
  }
}
</script>

<style>
/* 表单提交 */
@import url('../../common-style/form.css');

page {
  background-color: #f7f7f7;
}

/* 预约地址 */
.reserve-address {
  background-color: #ffffff;
  padding: 20rpx;
  margin: 20rpx;
  border-radius: 10rpx;
}

.reserve-address text {
  display: block;
}

.reserve-name {
  font-weight: bold;
}

.reserve-road {
  padding: 20rpx 0;
}

.reserve-title {
  display: flex;
  align-items: center;
}

.reserve-title text {
  background-color: #f7f7f7;
  padding: 5rpx 20rpx;
  font-size: 25rpx;
  margin-right: 10rpx;
}

.Week {
  background-color: #ffffff;
  padding: 20rpx;
  border-radius: 10rpx;
  margin: 20rpx;
  display: flex;
  align-items: center;
}

.Week-flex {
  display: flex;
}

.Week-style {
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  text-align: center;
  padding: 20rpx 0;
  border-radius: 10rpx;
  margin-right: 20rpx;
}

.Week-style text {
  padding: 3rpx;
}

.Week-sup {
  width: 150rpx;
}

.period-view {
  background-color: #ffffff;
  padding: 20rpx;
  border-radius: 10rpx;
  margin: 20rpx;
}

.period-title {
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.Week-Down {
  width: 200rpx;
}

/* 选中加上样式 */
.checkstyle {
  background-color: #2c76ef !important;
  color: #ffffff !important;
}
</style>