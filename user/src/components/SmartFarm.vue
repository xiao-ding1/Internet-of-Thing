<template>
  <div class="textContent">智慧农场</div>
  <div class="container">
    <input type="radio" name="tabs" id="tab_top" checked>
    <input type="radio" name="tabs" id="tab_middle">
    <input type="radio" name="tabs" id="tab_bottom">
    <div class="cube">
      <div class="tab-content">
        这是照明系统的内容
        <button @click="showMessage('照明系统')">点击我</button> 
        <label class="toggle">
          <input type="checkbox">
          <div class="off-knob"></div>
          <div class="on-knob"></div>
        </label>
      </div>
      <div class="tab-content">
        这是通风系统的内容
        <button @click="showMessage('通风系统')">点击我</button> 
      </div>
      <div class="tab-content">
        这是滴灌系统的内容
        <button @click="showMessage('滴灌系统')">点击我</button> 
      </div>
    </div>
    <div class="labels">
      <label for="tab_top" class="tab">滴灌</label>
      <label for="tab_middle" class="tab">通风</label>
      <label for="tab_bottom" class="tab">照明</label>
    </div>
  </div>
</template>

<script lang="ts" setup>
const showMessage = (systemName: string) => {
  alert(`当前是：${systemName}`);
};
</script>
<style scoped>
.container{
  width: 800px;
  display: flex;
  position: absolute;
  left: 55%;
  top: 55%;
  transform: translate(-50%,-50%);
  color: #fff;
  font-weight: 300;
  perspective: 1800px;
}
input{
  display: none;
}
.labels{
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: -20px; 
  margin-left: 40px; 
}
.tab {
  height: 220px; 
  line-height: 200px; 
  text-align: center;
  font-size: 40px; 
  margin-left: 40px;
}
.tab:nth-child(1){
  background-color: aqua;
}
.tab:nth-child(2){
  background-color: rgb(60, 40, 190);
}
.tab:nth-child(3){
  background-color: rgb(26, 29, 234);
}
.cube {
  position: relative;
  flex: 1;
  transform-style: preserve-3d;
  transition: transform 0.5s ease-in;
  height: 800px;
}
.tab-content{
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.tab-content:nth-child(1){
  background-color: rgb(26, 29, 234);
  transform: rotateX(-90deg) translateZ(400px); 
  transform-origin: center;
}
.tab-content:nth-child(2){
  background-color: rgb(60,40,190);
  transform: translateZ(400px);
  transform-origin: center;
}
.tab-content:nth-child(3){
background-color: aqua;
  transform: rotateX(90deg) translateZ(400px); 
  transform-origin: center;
}
#tab_top:checked ~.cube{
  transform: rotateX(-90deg);
}
#tab_middle:checked ~.cube{
  transform: rotateX(0deg);
}
#tab_bottom:checked ~.cube{
  transform: rotateX(90deg);
}
.tab-content button {
  appearance: none;
  -webkit-appearance: none;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px; 
}

.tab-content:nth-child(1) button {
  background-color: #FFD700; 
  color: #333;
}

.tab-content:nth-child(1) button:hover {
  background-color: #F0E68C; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.tab-content:nth-child(2) button {
  background-color: #00BFFF; 
  color: #fff;
}

.tab-content:nth-child(2) button:hover {
  background-color: #87CEFA;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.tab-content:nth-child(3) button {
  background-color: #32CD32; 
  color: #fff;
}

.tab-content:nth-child(3) button:hover {
  background-color: #98FB98; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>