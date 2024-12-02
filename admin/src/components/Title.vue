<template>
  <div class="top">
      <h1 class="centered-title">{{ text }}</h1> 
      <text v-if="showTitle" ref="title" class="text">{{ currentText }}</text>
  </div>
</template>
    
<script lang='ts' setup name='title'>
  import {ref} from 'vue'
    let showTitle = ref(false)
    let {text,subtext} = defineProps(['text','subtext'])
    const currentText = ref('')
    let index = 0
    // 展示标题动画效果
    const showCenteredTitle = () => {
      showTitle.value = true
      const interval = setInterval(() => {
        if (index < subtext.length) {
          currentText.value += subtext[index]
          index++
        } else {
          clearInterval(interval)
        }
      }, 100)
    }
    setTimeout(showCenteredTitle, 1000)
</script>
    
<style scoped>
    
@keyframes show-up {
    to {
      opacity: 1;
    }
  }
  .top {
    margin: auto;
    margin-top: 40px;
    height: 100px;
    width: 500px;
    text-align: center;
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
  .text {
    display: block;
    width: 200px;
    height: 20px;
    opacity: 1;
    margin: 10px auto;
    font-size: 14px;
    color: rgb(79, 83, 83);
    transition: opacity 1s ease-in-out; 
    text-shadow: 0 4px 10px rgb(0, 0, 0, 0.2);
    margin-bottom: 10px;
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
</style>