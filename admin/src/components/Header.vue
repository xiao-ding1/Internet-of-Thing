<!-- Header.vue -->
<template>
  <div class="header">
    <div class="title">物联网实验</div>
    <div class="icon" @mouseenter="showDropdown" @mouseleave="hideDropdown" @click="goToAccountManagement">
      <img :src="iconUrl" alt="个人主页" />
      <div v-if="dropdownVisible" class="dropdown">
        <button @click="logout">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineProps, defineEmits, computed, ref,onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

onMounted(() => {
    goToAccountManagement();
})
const roleId = computed(() => store.state.roleId);
// 接收 v-model 的值 (父组件传递的 a)
const props = defineProps({
  isAccount: {
    type: Boolean,
    required: true,
  },
});

// 发射更新事件
const emit = defineEmits(['update:modelValue']);

// 控制下拉菜单的显示
const dropdownVisible = ref(false);

// 显示下拉菜单
function showDropdown() {
  dropdownVisible.value = true;
}

// 隐藏下拉菜单
function hideDropdown() {
  dropdownVisible.value = false;
}

// 跳转到账号管理页面
function goToAccountManagement() {
  if (roleId.value == 1) {
    emit('update:modelValue', !props.isAccount);
  }
}

// 退出登录
function logout() {
  store.commit('setLoginInfo', { username: '', token: '', roleId: '' });
  sessionStorage.removeItem('token'); // 移除存储的 token
  router.push('/'); // 跳转到登录页面
}

// 头像临时 URL
const iconUrl = 'https://fakeimg.pl/40x40/'; // 后续替换为正式 URL
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #545c64;
  color: #fff;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.icon {
  position: relative;
}

.icon img {
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
}

.dropdown {
  position: absolute;
  top: 50px;
  right: -15px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
  z-index: 10;
}

.dropdown button {
  background-color: #f56c6c;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
}

.dropdown button:hover {
  background-color: #e45656;
}
</style>