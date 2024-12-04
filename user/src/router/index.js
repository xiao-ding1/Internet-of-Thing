import { createRouter, createWebHashHistory } from "vue-router";
import BlueOpening from "../components/BlueOpening.vue";
import SmartClass from "@/components/SmartClass.vue";
import SmartOpening from "@/components/SmartOpening.vue";
import SmartFarm from "@/components/SmartFarm.vue";
import SmartStorage from "@/components/SmartStorage.vue";
import LampControl from "@/components/LampControl.vue";
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
  },
  {
    path: "/smartFram",
    component: SmartFarm,
  },
  {
    path: "/smartStorage",
    component: SmartStorage,
  },
  {
    path: "/lampControl",
    component:LampControl
  }
];

const router = createRouter({
  history: createWebHashHistory(), // 使用 HTML5 模式的路由历史记录
  routes,
});

export default router;
