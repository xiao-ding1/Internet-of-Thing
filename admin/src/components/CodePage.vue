<template>
<div class="main-page">
    <!-- 工具栏 -->
    <div class="toolbar">
    <button @click="openProject">打开工程</button>
    <button @click="saveProject">保存</button>
    <button @click="compileProject">编译</button>
    <button @click="burnProject">烧录</button>
    <button @click="closeProject">关闭</button>
    </div>

    <!-- 显示 Coding 组件区域 -->
    <!-- <div class="content">
        <Splitter v-if="isProjectOpen">
            <template #top>
            <Coding @toggleCompileOutput="toggleCompileOutput" />
            </template>
            <template #bottom>
            <CompileOutput v-if="showCompileOutput" />
            </template>
        </Splitter>
    </div> -->
    <div class="content">
        <!-- 根据 isProjectOpen 控制 Splitter 的显示 -->
        <Splitter v-if="isProjectOpen && showCompileOutput">
          <template #top>
            <Coding @toggleCompileOutput="toggleCompileOutput" />
          </template>
          <template #bottom>
            <CompileOutput />
          </template>
        </Splitter>
        
        <!-- 当 CompileOutput 隐藏时，只显示 Coding 组件 -->
        <div v-else-if="isProjectOpen && !showCompileOutput">
          <Coding @toggleCompileOutput="toggleCompileOutput" />
        </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import Coding from './Coding.vue';
import CompileOutput from './CompileOutput.vue';
import Splitter from './Splitter.vue';

// 使用 ref 来声明响应式变量
const isProjectOpen = ref(false);
const showCompileOutput = ref(false);

const toggleCompileOutput = () => {
  showCompileOutput.value = !showCompileOutput.value;
};
// 打开工程的方法
const openProject = () => {
isProjectOpen.value = true;
};

// 保存项目的方法
const saveProject = () => {
console.log('项目已保存');
// 这里可以添加保存的具体逻辑，比如通过 API 请求保存数据
};

// 编译项目的方法
const compileProject = () => {
console.log('项目正在编译');
// 这里可以添加编译的具体逻辑，比如调用编译 API 或者在 Monaco 中编译代码
};

// 烧录项目的方法
const burnProject = () => {
console.log('项目正在烧录');
// 这里可以添加烧录的具体逻辑，比如模拟烧录到硬件的过程
};

// 关闭项目的方法
const closeProject = () => {
isProjectOpen.value = false;
console.log('项目已关闭');
};
</script>

<style scoped>
.main-page {
display: flex;
flex-direction: column;
height: 100vh;
}

.toolbar {
background-color: #f4f4f4;
padding: 10px;
display: flex;
justify-content: flex-start;
align-items: center;
}

.content {
flex-grow: 1;
padding: 10px;
}

button {
padding: 10px;
font-size: 14px;
cursor: pointer;
margin-right: 10px;
}

button:last-child {
margin-right: 0;
}
</style>
