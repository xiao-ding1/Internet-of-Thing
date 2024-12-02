<template>
  <div class="main-page">
    <!-- 工具栏 -->
    <div class="toolbar">
      <button @click="openProjectDialog">打开工程</button>
      <button @click="saveProject" :disabled="!isProjectOpen">保存</button>
      <button @click="compileProject" :disabled="!isProjectOpen">编译</button>
      <button @click="burnProject" :disabled="!isProjectOpen">烧录</button>
      <button @click="closeProject" :disabled="!isProjectOpen">关闭</button>
    </div>

    <!-- 内容区域 -->
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

    <!-- 弹出框：选择工程 -->
    <div class="dialog" v-if="showDialog">
      <div class="dialog-content">
        <h3>选择工程</h3>
        <ul>
          <li v-for="(project, index) in projects" :key="index" @click="selectProject(project)">
            {{ project.name }}
          </li>
        </ul>
        <button class="close-btn" @click="closeDialog">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Coding from './Coding.vue';
import CompileOutput from './CompileOutput.vue';
import Splitter from './Splitter.vue';

// 控制工程状态
const isProjectOpen = ref(false);
const showCompileOutput = ref(false);

// 控制弹出框
const showDialog = ref(false);
const projects = ref([
  { name: '工程 1' },
  { name: '工程 2' },
  { name: '工程 3' },
  { name: '工程 4' },
  { name: '工程 5' },
  { name: '工程 6' },
]);

// 打开弹出框
const openProjectDialog = () => {
  showDialog.value = true;
};

// 关闭弹出框
const closeDialog = () => {
  showDialog.value = false;
};

// 选择项目
const selectProject = (project) => {
  console.log(`打开 ${project.name}`);
  isProjectOpen.value = true;
  showDialog.value = false;
};

// 切换编译输出
const toggleCompileOutput = () => {
  showCompileOutput.value = !showCompileOutput.value;
};

// 保存项目
const saveProject = () => {
  console.log('项目已保存');
};

// 编译项目
const compileProject = () => {
  console.log('项目正在编译');
};

// 烧录项目
const burnProject = () => {
  console.log('项目正在烧录');
};

// 关闭项目
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

.dialog-content ul {
  list-style: none;
  padding: 0;
}

.dialog-content li {
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s;
}

.dialog-content li:hover {
  background: #f0f0f0;
}

.close-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
