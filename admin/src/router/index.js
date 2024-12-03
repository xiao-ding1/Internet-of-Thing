import { createRouter, createWebHashHistory } from "vue-router";
import CodePage from "@/components/CodePage.vue";
import BlueOpening from "../components/BlueOpening.vue";
import SmartClass from "@/components/SmartClass.vue";
import SmartOpening from "@/components/SmartOpening.vue";
import LampControl from "@/components/LampControl.vue";
import SmartStorage from "@/components/SmartStorage.vue";
import SmartFarm from "@/components/SmartFarm.vue";
const routes = [
  {
    path: "/code",
    component: CodePage, // 确保组件路径正确
  },
  {
    path: "/blue",
    component: BlueOpening,
  },
  {
    path: "/smartOpen",
    component: SmartOpening,
  },
  {
    path: "/smartClass",
    component: SmartClass,
  },
  {
    path:"/lampControl",
    component:LampControl
  },
  {
    path:"/smartStorage",
    component:SmartStorage
  },
  {
    path:"/smartFarm",
    component:SmartFarm
  }
];

const router = createRouter({
  history:createWebHashHistory(), // 使用 HTML5 模式的路由历史记录
  routes,
});

export default router;
