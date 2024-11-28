import { createRouter, createWebHistory } from 'vue-router';
import Coding from '../components/Coding.vue';

const routes = [
  {
    path: '/code',
    component: Coding, // 确保组件路径正确
  },
];

const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 模式的路由历史记录
  routes,
});

export default router;