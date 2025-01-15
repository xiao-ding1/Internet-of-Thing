<template>
  <Title :text="text" :subtext="subtext" />
  <div>
    <Loading :loadingMessage="loadingMessage" v-if="loading"/>
    <img v-if="!isClicked" ref="lampImg" src="../assets/img/不亮灯泡.png" class="lamp1"
         :style="{animation: 'bounce 3s infinite alternate'}" @click="toggleImage" />
    <img v-else :style="newImageStyle" src="../assets/img/亮灯泡.png" class="lamp1" @click="toggleImage" />
    <img src="../assets/img/手机.png" class="phone" />
  </div>
</template>

<script lang="ts" setup>

import Title from './Title.vue';
import { ref, onBeforeUpdate, onMounted, watch, defineProps } from 'vue';
import { controlLamp } from '@/request/modules/lampControl';
import Loading from './Loading.vue'
let { lampDeviceStatus } = defineProps(['lampDeviceStatus'])
const lampImg = ref(null)
const isClicked = ref(lampDeviceStatus)//控制灯泡开关状态
const newImageStyle = ref({})
const loading = ref(false)//加载状态
const loadingMessage=ref('')
const subtext = "智能控灯 由此开始"
const text = '网    络    控    灯'
//灯泡开关
const toggleImage = async () => {
  loading.value = true
  try {
    if (isClicked.value) {
      loadingMessage.value='正在关闭灯泡'
      const res = await controlLamp(0)
      if (res && res.data.msg === 'success'){
      isClicked.value = false//更新灯泡状态为关闭
      ElMessage.success('已关闭灯泡')}
    } else {
      loadingMessage.value='正在开启灯泡'
      // 发送请求来打开灯泡
      const res = await controlLamp(1)
      if (res && res.data.msg === 'success'){
      isClicked.value = true// 更新灯泡状态为打开
      ElMessage.success('已开启灯泡')}
    }
  } catch (error) {
    console.error('请求失败:', error)
    ElMessage.error(isClicked.value? `${error.message}关灯操作失败，请稍后再试` : `${error.message}开灯操作失败，请稍后再试`)
  } finally {
    loading.value = false
  }
}
watch(() => lampDeviceStatus, 
  (newValue) => {isClicked.value = newValue},
  { immediate: true }
)
onMounted(
  async () =>{
    try {
      await controlLamp(0)
    }
    catch (error){
    console.log(error)            
    }
  })
onBeforeUpdate(() => {
  if (lampImg.value) {
    newImageStyle.value = {
      position: 'absolute',
      zIndex: 999,
      width: '140px',
      height: '250px',
      transition: 'all 2s ease',
    }
    setTimeout(() => {
      newImageStyle.value = {
       ...newImageStyle.value,
        left: 610 + 'px',
        top: 320 + 'px',
      }
    }, 1)
  }
})
</script>

<style>
.phone {
  display: block;
  width: 800px;
  height: 420px;
  margin: 80px auto;
  perspective: 800px;
}

.lamp1 {
  position: absolute;
  z-Index: 999;
  width: 140px;
  height: 250px;
  top: 190px;
  left: 610px;
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(150px);
  }
}

</style>