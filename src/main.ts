/*
 * @Author: bamboo
 * @Date: 2023-01-29 16:10:12
 * @LastEditors: bamboo 815070110@qq.com
 * @LastEditTime: 2023-03-31 08:45:50
 * @FilePath: \wx-zhyl\src\main.ts
 * @Description: 
 */
import { createSSRApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
//创建pinia实例
const pinia = createPinia()

export function createApp() {
  const app = createSSRApp(App); // 创建vue实例
  app.use(pinia)
  return {
    app,
  };
}
