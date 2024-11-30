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
.top {
  margin: auto;
  margin-top: 40px;
  height: 80px;
  width: 500px;
}
.centered-title {
  font-size: 40px;
  text-align: center;
  margin: 0px auto; 
  width: 50%; 
  opacity: 0; 
  animation: show-up 1s linear forwards;
  text-shadow: 0 4px 10px rgb(0, 0, 0, 0.2);
}
@keyframes show-up {
  to {
    opacity: 1;
  }
}
.text {
  display: block;
  width: 150px;
  height: 20px;
  opacity: 1;
  margin: 10px auto;
  font-size: 16px;
  color: rgb(79, 83, 83);
  transition: opacity 1s ease-in-out; 
}
.text.show {
  opacity: 1;
  animation: text-pop 0.6s linear forwards; /* 添加文字弹出动画 */
}
@keyframes text-pop {
  0% {
    transform: translateY(20px); /* 初始位置向上偏移 20 像素 */
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
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