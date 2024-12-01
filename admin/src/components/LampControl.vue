<template>
  <div class="top">
    <h1 class="centered-title">网    络    控    灯</h1> 
    <text v-if="showTitle" ref="title" class="text">{{ currentText }}</text>
  </div>
  <div class="container">
    <img v-if="!isClicked" ref="lampImg" src="../assets/img/不亮灯泡.png" class="lamp1" :style="{animation: 'bounce 3s infinite alternate'}" @click="toggleImage" />
    <img v-else :style="newImageStyle" src="../assets/img/亮灯泡.png" class="lamp1" @click="toggleImage" />
    <img src="../assets/img/手机.png" class="phone">
  </div>
</template>

<script setup>
import { ref, onBeforeUpdate, onMounted } from 'vue';
const lampImg = ref(null)
const isClicked = ref(false)
const newImageStyle = ref({})
const showTitle = ref(false)
const title = ref(null)
const text = "智能控灯 由此开始"
const currentText = ref('')
let index = 0

const showCenteredTitle = () => {
  showTitle.value = true
  const interval = setInterval(() => {
    if (index < text.length) {
      currentText.value += text[index]
      index++
    } else {
      clearInterval(interval)
    }
  }, 100)
}

setTimeout(showCenteredTitle, 1000)
onMounted(() => {
})

// 在组件更新前获取灯泡跳动到底部时的样式
onBeforeUpdate(() => {
  if (lampImg.value) {
    newImageStyle.value = {
      position: 'absolute',
      zIndex: 999,
      width: '140px',
      height: '250px',
      transition: 'all 1s ease' 
    };
    setTimeout(() => {
      newImageStyle.value = {
      ...newImageStyle.value,
        left: 610 + 'px',
        top: 380 + 'px'
      }
    }, 1)
  }
})

const toggleImage = () => {
  isClicked.value =!isClicked.value;
}
</script>

<style>
.phone {
  position: relative;
  display: block;
  width: 800px;
  height: 550px;
  margin: 80px auto;
  perspective: 800px;
}
.lamp1 {
  position: absolute;
  z-index: 999;
  width: 140px;
  height: 250px;
  top: 230px;
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