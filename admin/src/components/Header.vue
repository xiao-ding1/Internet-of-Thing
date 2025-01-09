<!-- Header.vue -->
<template>
  <div class="header">
    <div class="title">物联网实验</div>
    <div 
      class="icon-container"
      @mouseenter="showDropdown"
      @mouseleave="scheduleHideDropdown"
    >
      <img :src="iconUrl" alt="个人主页" class="user-icon" />
      <transition name="fade">
        <div 
          v-if="dropdownVisible" 
          class="dropdown"
          @mouseenter="cancelHideDropdown"
          @mouseleave="scheduleHideDropdown"
        >
          <button @click="logout">退出登录</button>
        </div>
      </transition>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const dropdownVisible = ref(false);
let hideTimer: ReturnType<typeof setTimeout> | null = null;

// 显示下拉菜单
function showDropdown() {
  dropdownVisible.value = true;
}

// 延迟隐藏下拉菜单
function scheduleHideDropdown() {
  hideTimer = setTimeout(() => {
    dropdownVisible.value = false;
    hideTimer = null;
  }, 200); // 延时 300 毫秒
}

// 取消隐藏下拉菜单
function cancelHideDropdown() {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
}

// 退出登录
function logout() {
  store.commit('setLoginInfo', { username: '', token: '', roleId: '' });
  sessionStorage.removeItem('token');
  router.push('/');
}

// 替代头像 URL
const iconUrl = 'https://fakeimg.pl/40x40/';
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

.icon-container {
  position: relative;
}

.user-icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
}

.dropdown {
  position: absolute;
  top: 60px;
  right: -15px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

</style>