<template>
<div id="loginbox" v-if="!roleId">
        <div class="background" :style="backgroundStyle" :class="{ fade: isFading }"></div>
        <div id="login">
            <h3 style="color: #fff">物联网实验平台</h3>
            <form @submit.prevent="handleSubmit" class="form">
                <input type="text" v-model="username" placeholder="请输入帐号" required>
                <input type="password" v-model="password" placeholder="请输入密码" required>
                <button type="submit" >登录</button>
            </form>
        </div>
    </div>
    <Index v-if="roleId"/>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Index from "./index.vue"
import api from '../request/index'
import {useStore} from 'vuex'
import { ElMessageBox } from 'element-plus';

const store = useStore();
// const router = useRouter();

// 导入本地图片
import bg1 from '@/assets/img/iot1.webp'
import bg2 from '@/assets/img/iot2.png'
import bg3 from '@/assets/img/iot3.jpg'
import bg4 from '@/assets/img/iot4.png'

// 用户名和密码
const username = ref('')
const password = ref('')
const roleId = computed(() => store.state.loginInfo.roleId);

// 背景图片数组)
const backgrounds = [bg1, bg2, bg3, bg4]
const currentBackgroundIndex = ref(0)
const isFading = ref(false)
// const isLogin = ref(false)

// 定时切换背景
let intervalId = null
onMounted(() => {
    intervalId = setInterval(() => {
        isFading.value = true // 开始淡出
        setTimeout(() => {
            currentBackgroundIndex.value = (currentBackgroundIndex.value + 1) % backgrounds.length
            isFading.value = false // 淡入
        }, 1000) // 动画时间与 CSS 动画时间保持一致
    }, 3000) 
})

onBeforeUnmount(() => {
    clearInterval(intervalId)
})

// 动态绑定背景样式
const backgroundStyle = computed(() => ({
    backgroundImage: `url(${backgrounds[currentBackgroundIndex.value]})`,
}))

const handleSubmit = async() => {
    // isLogin.value = true;
  try{
    const response = await api.login(username.value,password.value)   
    const role = response.data.data.roleId;
    const token = response.data.data.token;
    sessionStorage.setItem('token',token)
    console.log("loginInfo",roleId,'|',token)
    store.commit('loginInfo/setLoginInfo',{
        username:username.value,
        token:token,
        roleId:role
    })
    
    ElMessageBox.alert('登录成功', '成功', {
      confirmButtonText: '确定',
      callback: () => {
      },  
    });
    // 重置输入框
    username.value = '';
    password.value = '';
  }catch(error){
    if (error?.message) {
      // 拦截器返回的自定义错误
      ElMessageBox.alert(`登录失败。错误信息: ${error.message}`);
    } else {
      // 未知错误或网络问题
      ElMessageBox.alert("登录失败，请检查网络或稍后重试");
    }
  }
};
</script>

<style scoped>
/* 背景容器 */
#loginbox {
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 背景动画效果 */
.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: opacity 1s ease-in-out;
    z-index: -1; /* 确保背景在最底层 */
}

.background.fade {
    opacity: 0; /* 淡出效果 */
}

/* 登录框样式 */
#login {
    position: relative; /* 保持登录框独立 */
    z-index: 1; /* 确保登录框在背景之上 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(128, 126, 126, 0.504);;
    width: 500px;
    height: 360px;
    border: 0.5px solid grey;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
h3{
    font-size: 30px;
    margin-bottom: 30px;
}

.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

input {
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid grey;
    width: 300px;
}

button {
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid grey;
    width: 300px;
    background-color: #46aad8;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #5cb3e6;
}
</style>

