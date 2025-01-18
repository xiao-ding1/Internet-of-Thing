<template>
<div class="login-container">
    <div class="login-box">
    <h2 class="title">登录</h2>
    <el-input
        v-model="username"
        placeholder="请输入用户名"
        class="input-field"
        prefix-icon="el-icon-user"
    />
    <el-input
        v-model="password"
        type="password"
        placeholder="请输入密码"
        class="input-field"
        prefix-icon="el-icon-lock"
    />
    <el-button
        type="primary"
        class="login-btn"
        @click="handleLogin"
        :loading="isLoading"
    >
        登录
    </el-button>
    <!-- <div class="footer">
        <el-button type="text" @click="handleForgotPassword">
        忘记密码
        </el-button>
    </div> -->
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { ElInput, ElButton } from 'element-plus';
import Login from '@/request/modules/login';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();
// const loginForm = ref({
// username: '',
// password: '',
// });
const username = ref('');
const password = ref('');

const isLoading = ref(false);

const handleLogin = async() => {
// isLoading.value = true;
if(!username.value || !password.value) return ElMessageBox.alert('请输入用户名和密码');
try{
    const response = await Login(username.value,password.value)   
    // const role = response.data.data.roleId;
    const token = response.data.data.token;
    sessionStorage.setItem('token',token)
    console.log("loginInfo",'|',token)
    store.commit('loginInfo/setLoginInfo',{
        username:username.value,
        token:token,
        // roleId:role
    })

    ElMessageBox.alert('登录成功', '成功', {
        confirmButtonText: '确定',
        callback: () => {
        },  
    });
    router.push('/menue');
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
.login-container {
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background: linear-gradient(to right, #4facfe, #00f2fe);
}

.login-box {
background-color: white;
padding: 30px;
border-radius: 8px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
width: 90%;
max-width: 400px;
text-align: center;
}

.title {
font-size: 24px;
font-weight: bold;
margin-bottom: 20px;
color: #333;
}

.input-field {
margin-bottom: 15px;
}

.login-btn {
width: 100%;
margin-top: 20px;
}

.footer {
display: flex;
justify-content: space-between;
margin-top: 10px;
font-size: 14px;
color: #888;
}

.footer .el-button {
padding: 0;
}
</style>
  