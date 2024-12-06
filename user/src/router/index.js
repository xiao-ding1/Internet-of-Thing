import { createRouter, createWebHashHistory } from "vue-router";
import BlueOpening from "@/components/BlueOpening.vue";
import SmartOpening from "@/components/SmartOpening.vue";
import SmartClass from "@/components/SmartClass.vue";
const routes = [
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
  }
];

const router = createRouter({
  history: createWebHashHistory(), // 使用 HTML5 模式的路由历史记录
  routes,
});

export default router;
