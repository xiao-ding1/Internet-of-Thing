<template>
  <div class="main-page">
    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <button @click="openProjectDialog">
          <i class="icon-folder-open"></i> 打开工程
        </button>
        <button @click="saveProject" :disabled="!isProjectOpen">
          <i class="icon-save"></i> 保存
        </button>
        <button @click="compileProject" :disabled="!isProjectOpen">
          <i class="icon-cogs"></i> 编译
        </button>
        <button @click="burnProject" :disabled="!isProjectOpen">
          <i class="icon-fire"></i> 烧录
        </button>
        <button @click="closeProject" :disabled="!isProjectOpen">
          <i class="icon-close"></i> 关闭
        </button>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <!-- Splitter 显示 -->
      <Splitter v-if="isProjectOpen && showCompileOutput">
        <template #top>
          <Coding @toggleCompileOutput="toggleCompileOutput" />
        </template>
        <template #bottom>
          <CompileOutput />
        </template>
      </Splitter>

      <!-- 隐藏 CompileOutput 时 -->
      <div v-else-if="isProjectOpen && !showCompileOutput">
        <Coding @toggleCompileOutput="toggleCompileOutput" />
      </div>
    </div>

    <!-- 选择工程弹窗 -->
    <div class="dialog" v-if="showDialog">
      <div class="dialog-content">
        <h3>选择工程</h3>
        <ul>
          <li
            v-for="(project, index) in projects"
            :key="index"
            @click="selectProject(project)"
            class="dialog-project-item"
          >
            <i class="icon-file-alt"></i> {{ project.name }}
          </li>
        </ul>
        <button class="close-btn" @click="closeDialog">
          <i class="icon-close"></i> 关闭
        </button>
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
  background: #f7f8fc;
  font-family: Arial, sans-serif;
}

.toolbar {
  display: flex;
  justify-content: flex-start; /* 左对齐 */
  align-items: center; /* 垂直居中 */
  background: #007acc;
  color: white;
  padding: 10px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toolbar-left {
  display: flex; /* 使按钮水平排列 */
  gap: 10px; /* 添加按钮间距 */
}

button {
  display: flex;
  align-items: center; /* 图标与文字垂直居中 */
  padding: 10px 10px;
  background: #ffffff;
  color: #007acc;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #005f99;
  color: white;
}

button:disabled {
  background: #ddd;
  color: #888;
  cursor: not-allowed;
}

button i {
  font-size: 16px;
}

.content {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  z-index: 10;
}

.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  width: 400px;
  text-align: center;
}

.dialog-content h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
}

.dialog-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dialog-content li {
  padding: 10px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.3s;
}

.dialog-content li:hover {
  background: #f0f0f0;
  border-radius: 4px;
}

.dialog-project-item i {
  margin-right: 10px;
  color: #007acc;
}

.close-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.close-btn:hover {
  background: #005f99;
}
</style>