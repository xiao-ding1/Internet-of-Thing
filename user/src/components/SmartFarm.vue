<template>
  <div class="introBox">
        <h1>智慧农场</h1>
    </div>
    <div class="labels">
      <label for="tab_top" class="tab">滴灌</label>
      <label for="tab_middle" class="tab">通风</label>
      <label for="tab_bottom" class="tab">照明</label>
    </div>
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
  </div>
</template>

<script lang="ts" setup>
const showMessage = (systemName: string) => {
  alert(`当前是：${systemName}`);
};
</script>
<style scoped>
    .introBox{
      margin-bottom: 100px;
      padding: 20px;
      width: 100vw;
      position: relative;
      background-color: #1709b1;
      height: 300px;
      border-radius:0 0 100px 100px;
      transition: 1s;
    }
    h1{
      margin: 40px 0 20px 0;
      text-align: center;
      transition:2s;
      color: #fff;
      font-size: 60px;
      animation: shadow 2s linear forwards;
    }
    @keyframes shadow {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
        letter-spacing: 10px;
        -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent, transparent
              50%, rgba(255, 255, 255, 0.3));
      }
    }
    .container{
        width: 800px;
        height: 800px;
        display: flex;
        position: absolute;
        left: 50%;
        top: 55%;
        transform: translate(-50%,-50%);
        color: #fff;
        font-weight: 300;
        perspective: 1800px;
        animation: containerAppear 1s ease-in-out forwards; 
}
@keyframes containerAppear {
  from {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}
input{
  display: none;
}
.labels{
  background-color: pink;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 600px;
  height: 100px;
  border-radius: 20px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.tab {
  height: 80px;
  width: 120px; 
  background-color: #32CD32; 
  text-align: center;
  font-size: 40px; 
  margin-left: 40px;
  border-radius: 30px;
  margin: auto;
  line-height: 80px;
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
  transition: transform 0.5s ease-in-out;
  height: 800px;
}
.tab-content{
  width: 740px;
  height: 750px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  margin-left: 30px;
  backface-visibility: hidden; 
  transform-origin: center;
}
.tab-content:nth-child(1){
  background-color: rgb(26, 29, 234);
  transform: rotateX(-90deg) translateZ(380px); 
}
.tab-content:nth-child(2){
  background-color: rgb(60,40,190);
  transform: rotateX(0deg) translateZ(360px);
}
.tab-content:nth-child(3){
background-color: aqua;
  transform: rotateX(90deg) translateZ(340px); 
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