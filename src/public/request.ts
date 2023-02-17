import { Hpvlist } from './decl-type.d';
/*
 * @Author: bamboo
 * @Date: 2023-02-06 11:43:46
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-14 10:00:58
 * @FilePath: \wx-zhyl\src\public\request.ts
 * @Description: 
 */
//公用的请求
const baseUrl = 'https://meituan.thexxdd.cn/api/'
//获取token //npm install --save js-base64
import { Base64 } from 'js-base64';
//类型声明
import { RescovidApi,WxinLoginApi,
  HpvpriceApi,ReshpvApi,ResnuataApi,
  Patientres,Graphics,FilterData,
  Phyres,Regappion } from "@/public/decl-type";


function getToken(): string {
  const token = uni.getStorageSync('wxuser').user_Token || ''
  const base64_token = Base64.encode(token + ':')
  return 'Basic ' + base64_token
}

//请求
function request(
  url: string,
  method: 'GET' | 'POST',
  data: string | object | ArrayBuffer) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      method,
      data,
      header: { Authorization: getToken() },
      success: (res: any) => {
        if (res.statusCode === 200) {
          resolve(res)
        } else if (res.statusCode === 401) {
          //没有权限访问接口,跳转到登录页面
          uni.showToast({
            title: '没有登录',
            icon: 'error',
            duration: 1000
          })
          setTimeout(() => {
            uni.navigateTo({
              url: '/pages/login-page/index'
            })
          }, 500)

          reject(res)
        } else if (res.statusCode === 400) {
          //参数错误
          reject(res)
        } else if (res.statusCode === 500) {
          uni.showToast({
            title: '服务器发生未知错误',
            icon: 'none',
            duration: 1000
          })
          reject(res)
        } else if (res.statusCode === 202) {
          uni.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
          reject(res)
        } else {
          uni.showToast({
            title: '服务器发生未知错误',
            icon: 'none',
            duration: 1000
          })
          reject(res)
        }
      },
      fail: (err: any) => {
        uni.showToast({
          title: '服务器发生未知错误',
          icon: 'none',
          duration: 1000
        })
        reject(err)
      }
    })
  })
}

//接口
const RequestApi = {
  //首页数据
  FrontPage: () => request('frontpage', 'GET', {}),
  //新冠疫苗预约时段
  NewappTime: () => request('newapptime', 'GET', {}),
  //新冠疫苗提交预约
  Rescovid: (data: RescovidApi) => request('rescovid', 'POST', data),
  //小程序登录
  WxinLogin: (data: WxinLoginApi) => request('wx_login', 'POST', data),
  //新冠疫苗预约订单
  CoviduserOrder:() => request('coviduser_order', 'GET', {}),
  //取消新冠疫苗预约
  CovidCancel:(data: {_id: string}) => request('covidcancel', 'GET', data),
  //HPV疫苗列表
  OtuHpv: () => request('otuhpv', 'GET', {}),
  //HPV疫苗套餐
  HpvPack: () => request('hpv_pack', 'GET', {}),
  //查询HPV套餐价格
  HpvPrice: (data: HpvpriceApi) => request('hpv_price', 'POST', data),
  //提交HPV预约套餐
  ResHpv: (data: ReshpvApi) => request('reshpv', 'POST', data),
  //HPV疫苗预约订单
  HpvuserOrder: () => request('hpvuser_order', 'GET', {}),
  //取消HPV预约
  HpvCancel:(data: {_id: string}) => request('covidcancel', 'GET', data),
  //核酸检测数据
  Nuataget: () => request('nuataget', 'GET', {}),
  //提交核酸检测预约
  ResNuata: (data: ResnuataApi) => request('resnuata', 'POST', data),
  //核酸检测订单
  NuatauserOrder: () => request('nuatauser_order', 'GET', {}),
  //取消核酸预约
  NuataCancel:(data: {_id: string}) => request('nuatacancel', 'GET', data),
  //获取就诊人信息
  GetPatient: () => request('get_patient', 'GET', {}),
  //提交就诊人
  PatientRes: (data: Patientres) => request('patient_res', 'POST', data),
  //提交图文咨询
  GrapHics: (data: Graphics) => request('patient_res', 'POST', data),
  //获取体检筛选条件
  PhyTerm: () => request('phyterm', 'GET', {}),
  //获取全部体检套餐
  PhysGet: () => request('physget', 'GET', {}),
  //查询筛选体检套餐
  PhyQuery: (data: FilterData) => request('phyquery', 'POST', data),
  //体检套餐详情页数据
  PhyDateil:(data: {id: string}) => request('phydateil', 'GET', data),
  //提交体检预约
  ResPhy:(data:Phyres) => request('resphy', 'POST', data),
  //获取体检套餐订单
  PhyuserOrder: () => request('phyuser_order', 'GET', {}),
  // 取消体检套餐订单
  PhyCancel:(data: {id: string}) => request('phycancel', 'GET', data),
  //获取抑郁症题目
  DepressionTopics: () => request('depression_topics', 'GET', {}),
  //获取抑郁症结果
  Depression: (data: {value:string[]}) => request('depression', 'GET', data),
  //获取早泄题目
  PrematureTopics: () => request('premature_topics', 'GET', {}),
  //获取早泄结果
  Premature: (data: {value:string[]}) => request('premature', 'GET', data),
  //获取失眠题目
  InsomniaTopics: () => request('insomnia_topics', 'GET', {}),
  //获取失眠结果
  Insomnia: (data: {value:string[]}) => request('insomnia', 'GET', data),
  //获取短视频的数据
  VideoList:(data:{page:number}) => request( 'video_list','GET',data ),
  //获取父科室列表
  DeparTment: () => request('department', 'GET', {}),
  //获取子科室列表
  RegList: (data:{id:string}) => request('reglist', 'GET', data),
  //获取选择的科室下的全部医生列表
  AlldList: (data:{dep_id:string}) => request('alldlist', 'GET', data),
  //获取选择医生的日期
  TimeSele: (data:{dep_id:string}) => request('timesele', 'GET', data),
  //根据时间筛选挂号医生
  EverydList: (data:{dep_id:string,week:string}) => request('everydlist', 'GET', data),
  //挂号医生主页
  DoctorHome: (data:{_id:string}) => request('doctorhome', 'GET', data),
  //提交挂号预约
  RegAppoin:(data:Regappion) => request('regappoin', 'POST', data),
  //获取用户挂号记录
  UserRegistrat: () => request('user_registrat', 'GET', {}),
  //取消挂号预约
  RegistCancel: (data:{_id:string}) => request('regist_cancel', 'GET', data),
}

  //图片上传接口
  let ImgURL =baseUrl + 'upload_picture';
    //身份证识别
  let AiCard =baseUrl + 'ai_card';

export { RequestApi,ImgURL,AiCard }