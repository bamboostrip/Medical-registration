import { createSSRApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
//创建pinia实例
const pinia = createPinia()
//这是一个关于bamboo的测试
export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia)
  return {
    app,
  };
}
