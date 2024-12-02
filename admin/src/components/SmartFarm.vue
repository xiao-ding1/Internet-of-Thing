<template>
  <div>
    <div class="top">
      <h1 class="centered-title">智 慧 农 场</h1>
      <text v-if="showTitle" ref="title" class="text">{{ currentText }}</text>
    </div>
    <GetDevice/>
    <div class="cardContainer">
      <span class="item left-to-right" :class="{ 'hide-bg': showTmessage}" @click="toggleMessage('temperature')">
        <span class="text-content" v-show="showTmessage">{{ temperatureMessage}}</span>
      </span>
      <span class="item top-to-bottom" :class="{ 'hide-bg': showSmessage}" @click="toggleMessage('sun')">
        <span class="text-content" v-show="showSmessage">{{ sunMessage }}</span>
      </span>
      <span class="item right-to-left" :class="{ 'hide-bg': showWmessage }" @click="toggleMessage('wet')">
        <span class="text-content" v-show="showWmessage">{{ wetMessage}}</span>
      </span>
    </div>
  </div>
</template>
<script  setup>
import { ref} from 'vue';
import GetDevice from './GetDevice.vue';
let text = "智慧种植的种子在此发芽"
const currentText = ref('')
let index = 0
const showTitle = ref(true)
const showTmessage = ref(false)
const showSmessage = ref(false)
const showWmessage = ref(false)
const temperatureMessage = ref('这里是温度相关的文字内容')
const sunMessage = ref('这里是太阳相关的文字内容')
const wetMessage = ref('这里是湿度相关的文字内容')
const toggleMessage = (type) => {
  switch (type) {
    case 'temperature':
      showTmessage.value =!showTmessage.value;
      break
    case'sun':
      showSmessage.value =!showSmessage.value;
      break
    case 'wet':
      showWmessage.value =!showWmessage.value;
      break
  }
}

// 展示标题动画效果
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
</script>

<style>
.cardContainer {
  display: flex; 
  width: 90%; 
  height: 100%;
margin: 10px auto;
justify-content: space-around;
}

.item {
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center; 
  justify-content: center; 
  width: 320px; 
  height: 450px; 
  border-radius: 20px;
  background-color: #f0f0f0;
  margin-top: 30px;
  transition: background-size 1s ease;
}
.item:hover{
  background-size: 103% 103% !important;;
}
.left-to-right {
  animation: leftToRight 1s ease forwards; 
  opacity: 0; 
  background-image:url(../assets/img/温度.png);
  background-size: 100% 100%;
}
@keyframes leftToRight {
  from {
    transform: translateX(-100%); 
    opacity: 0;
  }
  to {
    transform: translateX(0); 
    opacity: 1;
  }
}

/* 从上到下出现的动画 */
.top-to-bottom {
  animation: topToBottom 1s ease 0.3s forwards; 
  opacity: 0;
  background-image:url(../assets/img/太阳.png);
  background-size: 100% 100%;
}
@keyframes topToBottom {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0); 
    opacity: 1;
    z-index: 10;
  }
}
.right-to-left {
  animation: rightToLeft 1s ease 0.6s forwards; 
  opacity: 0;
  background-image:url(../assets/img/湿度.png);
  background-size: 100% 100%;
}
@keyframes rightToLeft {
  from {
    transform: translateX(100%); 
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.hide-bg {
  background-image: none!important;
}

</style>