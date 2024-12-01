<template>
  <div>
    <div class="top">
    <h1 class="centered-title">智 慧 农 场</h1>
    <text v-if="showTitle" ref="title" class="text">{{ currentText }}</text>
  </div>
  </div>
</template>

<script  setup>
import { ref } from 'vue';
let text = "智慧种植的种子再次发芽"
const currentText = ref('')
let index = 0
const showTitle = ref(true)
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

</style>