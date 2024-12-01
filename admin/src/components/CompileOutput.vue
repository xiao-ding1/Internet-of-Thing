<template>
<div class="output-container">
    <pre class="output-content">
    {{ output }}
    </pre>
</div>
</template>

<script setup>
import { ref } from 'vue';

// 定义一个输出内容的状态，可以通过 props 或父组件事件更新
const output = ref("这里显示代码编译结果...");
</script>

<style scoped>
.output-container {
width: 100%;
height: 100%;
background-color: #1e1e1e;
color: #d4d4d4;
font-family: Consolas, 'Courier New', monospace;
display: flex;
flex-direction: column;
border: 1px solid #333;
}

.output-content {
flex: 1;
overflow: auto;
padding: 10px;
padding-top: 30px;
white-space: pre-wrap; /* 自动换行 */
word-wrap: break-word;
}
</style>