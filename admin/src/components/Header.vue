<!-- Header.vue -->
<template>
  <div class="header">
    <div class="title">物联网实验</div>
    <div class="icon" @click="goToAccountManagement">
      <img :src="iconUrl" alt="个人主页" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineProps, defineEmits } from 'vue';

// 接收 v-model 的值 (父组件传递的 a)
const props = defineProps({
  isAccount: {
    type: Boolean,
    required: true,
  },
});

// 发射更新事件
const emit = defineEmits(['update:modelValue']);

// 跳转到账号管理页面
function goToAccountManagement() {
  emit('update:modelValue', !props.isAccount); 
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

.icon img {
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
}
</style>