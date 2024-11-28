import { createRouter, createWebHashHistory } from 'vue-router'

// import User from '../components/User.vue'
// import Home from '../components/Home.vue'
// import Register from '../components/Register.vue'
// import UpdateUser from '../components/UpdateUser.vue'

// const routes = [{
//         path: '/',
//         redirect: '/User',
//     },
//     {
//         path: '/User',
//         name: User,
//         component: User
//     },
//     {
//         path: '/Home',
//         name: Home,
//         component: Home
//     },
//     {
//         path: '/Register',
//         name: Register,
//         component: Register
//     },
//     {
//         path: '/UpdateUser',
//         name: UpdateUser,
//         component: UpdateUser
//     }
// ]
// const router = createRouter({
//     // 采用哈希模式
//     history: createWebHashHistory(
//         import.meta.env.BASE_URL),
//     routes
// })

// router.beforeEach((to, from, next) => {
//     if (to.fullPath === '/User') {
//         // 跳转登录页面
//         next()
//     } else if (to.fullPath === '/Register') {
//         // 跳转注册页面
//         next()
//     } else if (to.fullPath === '/UpdateUser') {
//         // 跳转修改密码页面
//         next()
//     } else {
//         if (sessionStorage.getItem('token')) {
//             // 检查是否有登陆过，否之跳转去登陆页面
//             next()
//         } else {
//             next('/User')
//         }
//     }
// })


export default router