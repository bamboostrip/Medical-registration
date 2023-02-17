/*
 * @Author: bamboo
 * @Date: 2023-02-10 15:14:02
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-10 16:06:27
 * @FilePath: \wx-zhyl\src\store\index.ts
 * @Description: 
 */
//pinia
import { defineStore } from 'pinia'
interface Patient{
  name: string
  _id: string
}
export const patientData = defineStore('myData', {
  // other options...
  //数据仓库
  state:() => ({ 
    //用户选择就诊人需要的值
    patient:{} as Patient
   }),
   //同步异步传值
   actions:{
    //调用传值给state=>patient 
    addPatient(value:Patient){
      this.patient = value
    }
   },
   //计算属性

})