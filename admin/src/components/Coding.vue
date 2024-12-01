<template>
  <div>
    <div class="toolbar" :class="{ 'dark-mode': theme === 'vs-dark', 'light-mode': theme === 'vs-light' }">
      <select v-model="language" @change="changeLanguage">
        <option value="javascript">JavaScript</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      </select>
      <button @click="toggleTheme">
        切换到{{ theme === 'vs-dark' ? '明亮模式' : '夜间模式' }}
      </button>
      <button @click="toggleCompileOutput">
        {{ showCompileOutput ? '隐藏编译输出' : '显示编译输出' }}
      </button>
    </div>
    <div class="codearea" ref="codearea"></div>
  </div>
</template>

<script setup>
import * as monaco from 'monaco-editor';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const codearea = ref(null);
let editorInstance;

const language = ref('javascript');
const theme = ref('vs-light');

onMounted(() => {
  editorInstance = monaco.editor.create(codearea.value, {
    value: `console.log('Hello, Monaco!');`,
    language: language.value,
    theme: theme.value,
    automaticLayout: true,
    minimap: {
      enabled: true, // 启用 minimap
      size: 'proportional', // 设置为按内容比例显示
      scale: 2, // 调大比例，默认值为 1
      maxColumn: 120, // 限制最大列数，增大视图宽度
      renderCharacters: true, // 显示字符
    },
    overviewRulerLanes: 3, // 右侧滚动条的标尺视图（可选）
  });

  window.addEventListener('resize', handleResize);
});

const handleResize = () => {
  if (editorInstance) {
    editorInstance.layout();
  }
};

onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.dispose();
  }
  window.removeEventListener('resize', handleResize);
});

const changeLanguage = () => {
  const model = editorInstance.getModel();
  if (model) {
    monaco.editor.setModelLanguage(model, language.value);
  }
};

const toggleTheme = () => {
  theme.value = theme.value === 'vs-dark' ? 'vs-light' : 'vs-dark';
  monaco.editor.setTheme(theme.value);
};

const emit = defineEmits(['toggleCompileOutput']);
const toggleCompileOutput = () => {
  emit('toggleCompileOutput');
};
</script>

<style>
.toolbar {
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  transition: background 0.3s, color 0.3s;
  padding-bottom: 20px;
}
.toolbar.dark-mode {
  background: #2d2d2d;
  color: white;
}
.toolbar.light-mode {
  background: #f5f5f5;
  color: black;
}
.toolbar select,
.toolbar button {
  padding: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}
.toolbar select {
  background: #3c3c3c;
  color: white;
}
.toolbar button {
  background: #007acc;
  color: white;
}
.toolbar.light-mode select {
  background: #e0e0e0;
  color: black;
}
.toolbar.light-mode button {
  background: #007acc;
  color: white;
}
.codearea {
  height: calc(100vh - 50px); /* 减去工具栏高度 */
  width: 100%;
}
</style>