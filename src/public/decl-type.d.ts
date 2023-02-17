import { patientData } from './../store/index';
/*
 * @Author: bamboo
 * @Date: 2023-02-06 16:31:36
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-14 10:03:34
 * @FilePath: \wx-zhyl\src\public\decl-type.d.ts
 * @Description: 
 */
//类型申明文件,不会转换为js d.ts

//首页第一项数据: 疫苗预约
export interface Vaccine {
  image: string;
  title: string;
}
//首页第二项数据: 挂号体检
export interface PyhData {
  describe: string;
  image: string;
  title: string;
}

//首页第三项数据: 热门挂号
export interface Registered {
  background: string
  image: string
  title: string
  dep_id: string
}

//首页第四项数据: 健康自检
export interface SelfTest {
  describe: string
  image: string
  minute: number
  name: string
  number_of_people: number
  question: number
}

//---提交新冠疫苗预约接口数据
export interface RescovidApi {
  name: string
  id_card: string
  phone: string
  address: string
  de_address: string
  crowd_sort: string
  date: string
  period: string
  reserve_time: string
  when: number
}

//小程序登录
export interface WxinLoginApi {
  appid: string
  secret: string
  avatarUrl: string
  nickName: string
  code: string
}

//-----新冠疫苗接种预约页面
//定义返回的类型
interface Time {
  end_time: string
  over: number
  start_time: string
  when: number
}
interface Period {
  period: string
  time: Time[]
}
interface Week {
  have: string
  date: string
  day: string
}
export interface NewappTime {
  Hospital: string,
  address: string,
  company: string[],
  lasting: Period[],
  week: Week[]
}

//新冠疫苗订单
export interface XinguanOrder {
  address: string
  cancel: boolean
  company: string
  date: string
  name: string
  period: string
  time: string
  _id: string
}

//HPV筛选导航
export interface Hpvselect {
  name: string
  _id: string
}

//HPV列表
export interface Hpvlist {
  describe: string[]
  hpv_id: string
  name: string
  price: string[]
  _id: string
}

//HPV详情页--套餐名称
interface Hpvname {
  combo: string
  combo_id: string
}
export interface Hpvcomponame {
  title: string
  name: Hpvname[]
}

//HPV详情页--接种时间
interface Hpvtime {
  time: string
  time_id: string
}
export interface Hpvcompotime {
  title: string
  name: Hpvtime[]
}

//查询HPV套餐价格
export interface HpvpriceApi {
  hpv_id: string
  combo_id: string
  time_id: string
}

//提交HPV疫苗预约
export interface ReshpvApi {
  name: string
  id_card: string
  gender: string
  born_date: string
  phone: string
  combo: string
  ino_time: string
  price: number
  hpv_name: string
}

//HPV疫苗预约订单
export interface Hpvorder {
  name: string
  combo: string
  ino_time: string
  price: number
  hpv_name: string
  time: string
  address: string
  order_number: string
  cancel: boolean
  _id: string
}

//核酸检测预约
interface NuDate {
  date: string
  week: string
}

interface NuStyle {
  title: string
  desc: string[]
}

export interface Nucleicacid {
  address: string
  boon: string[]
  date: NuDate[]
  hospital: string
  logo: string
  name: string
  phone: string
  price: number
  style: NuStyle[]
  _id?: string
}

//核酸检测预约
export interface ResnuataApi {
  name: string
  phone: string
  id_card: string
  time: string
}

//核酸检测订单
export interface Nuatauserorder {
  phy_name: string
  address: string
  name: string
  phone: string
  phy_time: string
  time: string
  price: number
  order_number: string
  cancel: boolean
  _id: string
}

//提交图文咨询
export interface Graphics {
  illness: string
  guide: boolean
  ins_report: string[]
  patient_id: string
}

//就诊人信息
export interface Mypatient {
  age: string
  born: string
  id_card: string
  name: string
  phone: string
  relation: string
  sex: string
  _id: string
}

//提交就诊人
export interface Patientres {
  name: string
  sex: string
  born: string
  relation: string
  id_card: string
  phone: string
}

// 获取体检套餐筛选
export interface Phyterm {
  filter_val: string[]
  query_val: string
  _id: string
}

//获取体检套餐列表
export interface Phydata {
  be_suit: string
  describe: string
  image: string
  price: number
  sales: number
  title: string
  _id: string
}

//查询体检套餐
export interface FilterData {
  type: string
  sales: string
  price: string
}

//res的格式
export type Resdata = {
  data: { data: [] }
}

//获取体检详情页数据
interface Crowd {
  image: string
  name: string
}

interface Project {
  content: Content[]
  title: string
}
interface Content {
  details: string
  thing: string
}
export interface Phydetail {
  image: string
  price: number
  sales: number
  title: string
  id: string
  crowd: Crowd[]
  date: NuDate[]
  project: Project[]
}

//体检详情传子
export interface popups {
  phy_name: string
  phy_time: string
  show: boolean
}

//提交体检套餐预约
export interface Phyres {
  phy_name: string
  phy_time: string
  patient_id: string
}

//获取体检订单
export interface Phyuserorder {
  address: string
  cancel: boolean
  name: string
  order_number: string
  phy_name: string
  phy_time: string
  price: number
  time: string
  _id: string
}

//健康自测题目
interface Option {
  son_id: string
  title: string
}
export interface Topic {
  topic: string
  _id: string
  options: Option[]
}

//测评结果
interface Recommend {
  dep_id: string
  dep_name: string
  hospital: string
}
export interface Testres {
  result: string
  scope: string
  suggest: string
  _id: string
  outline: string[]
  recommend: Recommend[] | []
}

//测评分享
export interface Sharedata {
  type: string
  name: string
  share_title: string
  share_path: string
  share_url: string
}

//医师课堂
export interface Videotype {
  avatar: string
  controls: boolean
  name: string
  play_but: boolean
  video_title: string
  video_url: string
  _id: string
}

//请求的父科室的数据
export interface Departdata {
  dep_ment: string
  _id: string
}

//请求的子科室的数据
interface Deplist {
  dep_id: string
  dep_name: string
}
export interface Reglist {
  dep_ment: string
  _id: string
  dep_ment_list: Deplist[]
}

//选择挂号医生的日期
export interface Doctortime {
  date: string
  dep_id: string
  nu_source: number
  week: string
}

//选择挂号医生的列表
export interface Doctorlist {
  avatar: string
  good_at: string
  name: string
  post: string
  _id: string
}

//挂号医生主页
interface Appment {
  day: string
  time: DoctorhomeTime[]
  total_source: number
  week: string
}

interface DoctorhomeTime {
  already: number
  nu_source: number
  the_time: string[]
  when: number
}

export interface Doctorhome {
  App_ment: Appment[]
  avatar: string
  cost: number
  good_at: string
  hospital: string
  name: string
  post: string
  _id: string
}

//医生预约页面弹窗
export interface DoctortimeData {
  show: boolean
  week: string
  the_time: string[]
  when: number
  _id: string
}

//提交挂号预约
export interface Regappion {
  week: string
  the_time: string
  when: number
  _id: string
  patient_id: string
}

//预约挂号订单
export interface Registorder {
  _id: string
  avatar: string
  cancel: boolean
  dep_ment: string
  que_number: string
  reg_cost: number
  remark: string
  se_number: string
  the_time: string
  tre_doctor: string
  tre_place: string
  tre_time: string
  patient_name: string

}