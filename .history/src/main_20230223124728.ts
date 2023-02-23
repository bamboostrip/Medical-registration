/*
 * @Author: bamboo
 * @Date: 2023-01-29 16:10:12
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-23 12:47:28
 * @FilePath: \wx-zhyl\src\main.ts
 * @Description: 
 */
import { createSSRApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
//创建pinia实例
const pinia = createPinia()

export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia)
  return {
    app,
  };
}
