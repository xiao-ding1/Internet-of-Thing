import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import "./assets/font/iconfont.css";
import "./assets/css/global.css";

// 创建vue实例对象
const app = createApp(App);

// 使用router
app.use(router);

// 使用element plus
// app.use(ElementPlus)
app.mount("#app");

// 引入所有的icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
