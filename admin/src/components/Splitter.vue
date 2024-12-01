<template>
    <div v-show="isSplitterVisible" class="splitter-container">
      <div class="top-pane" :style="{ height: topHeight + '%' }">
        <slot name="top"></slot>
      </div>
      <div class="drag-bar" @mousedown="startDragging"></div>
      <div class="bottom-pane" :style="{ height: bottomHeight + '%' }">
        <slot name="bottom"></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const topHeight = ref(50); // 初始上部分高度占比
  const bottomHeight = ref(50); // 初始下部分高度占比
  const isSplitterVisible = ref(true); // 控制 Splitter 是否显示
  let isDragging = false; // 是否正在拖动
  let startY = 0; // 鼠标开始位置
  
  // 控制 Splitter 是否显示
  watch(() => bottomHeight.value, (newHeight) => {
    if (newHeight === 0) {
      isSplitterVisible.value = false; // 当 CompileOutput 隐藏时隐藏 Splitter
    } else {
      isSplitterVisible.value = true; // 显示 Splitter
    }
  });
  
  const startDragging = (event) => {
    isDragging = true;
    startY = event.clientY;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDragging);
  };
  
  const onDrag = (event) => {
    if (!isDragging) return;
    const deltaY = event.clientY - startY; // 鼠标移动的距离
    const containerHeight = document.querySelector('.splitter-container').offsetHeight;
    const newTopHeight = ((topHeight.value * containerHeight) / 100 + deltaY) / containerHeight * 100;
  
    if (newTopHeight > 10 && newTopHeight < 90) {
      topHeight.value = newTopHeight;
      bottomHeight.value = 100 - topHeight.value;
      startY = event.clientY; // 更新拖动起点
    }
  };
  
  const stopDragging = () => {
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDragging);
  };
  </script>
  
  <style scoped>
  .splitter-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: opacity 0.3s ease;
  }
  
  .top-pane,
  .bottom-pane {
    width: 100%;
    overflow: auto;
  }
  
  .drag-bar {
    width: 100%;
    height: 5px;
    background-color: gray;
    cursor: ns-resize;
    transition: background-color 0.2s;
  }
  
  .drag-bar:hover {
    background-color: darkgray;
  }
  
  /* 当 Splitter 隐藏时，设置透明度 */
  .splitter-container[style*="opacity: 0"] {
    display: none;
  }
  </style>