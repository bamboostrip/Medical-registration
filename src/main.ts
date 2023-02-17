/*
 * @Author: bamboo
 * @Date: 2023-01-29 16:10:12
 * @LastEditors: bamboo 815070110@qq.com
 * @LastEditTime: 2023-02-17 16:53:45
 * @FilePath: \wx-zhyl\src\main.ts
 * @Description: 
 */
import { createSSRApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
//创建pinia实例
const pinia = createPinia()
let master = 1
export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia)
  return {
    app,
  };
}
