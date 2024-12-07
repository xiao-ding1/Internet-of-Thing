<template>
   <div class="body" :class="{ 'light-on-bg': isOn }">
    <div class="textContent">智能灯控</div>
    <div class="bulbContain">
    <div class="bulb" :class="{ 'on': isOn }">
      <div id="stave"></div>
      <svg width="80" height="150">
        <polyline points=" 60,35 0,50 80,65 0,80 80,95 0,110 80,125 20,140"/>
      </svg>
    </div>
    <div>
      <label class="base">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="basecup"></div>
      </label>
    </div>
    </div>
    <div class="switch-box">
      <input type="checkbox" id="switch" @change="toggleLight">
      <label for="switch" class="switch"></label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOn = ref(false)

// 切换灯泡的开关状态
const toggleLight = (event) => {
  isOn.value = event.target.checked
}

</script>

<style scoped>
.body{
  width:100vw;
  height: 100vh;
  background-color: rgb(40, 40, 40);
  transition: background-color 0.5s ease; /* 添加过渡效果 */
}
.textContent{
  height: 300px;
  color: white;
  font-size: 80px;
  text-align: center;
  background-color: #111cdf;
}
.body.light-on-bg{
         background-color:rgb(40, 40, 40); 
      }
.bulbContain{
  width: 400px;
  height: 500px;
  margin: 0 auto;
  padding-top: 300px;
}
.bulb {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(#000 50%, #e4e4e4);
  transition: background-color 0.5s; 
  margin: auto;
}

.bulb.on {
  background: radial-gradient(yellow 30%, #e4e4e4); 
  filter: drop-shadow(0 0 100px #eeda82);
}

#stave {
  width: 35px;
  height: 200px;
  background-color: #b6b6b6;
  border-radius: 5px 5px 0 0;
  position: absolute;
  margin-top: 55px;
  opacity: 0.5;
  margin: auto;
}

polyline {
  fill: transparent;
  stroke: #b3c3c4;
  stroke-width: 3;
}

.base {
  display: block;
  width: 86px;
  height: 85px;
  background-color: cadetblue;
  margin-top: -10px;
  margin: auto;
}

.bar {
  width: 95px;
  height: 7px;
  background-color: #bcbaba;
  border-radius: 5px;
  transform: translate(-4px, 6px) rotate(-6deg);
  margin-bottom: 5px;
}

.bar:nth-child(2) {
  transform: translate(-4px, 50px) rotate(-6deg);
}

.bar:nth-child(3) {
  transform: translate(-4px, 10px) rotate(-6deg);
}

.basecup {
  width: 20px;
  height: 17px;
  background-color: cadetblue;
  border-radius: 0 0 10px 10px;
  margin: 55px auto;
}
.switch-box{
  position: relative;
  margin-top: 600px;
  margin-left: 380px;
}
[type=checkbox]{
  width: 180px;
  height: 90px;
  position: absolute;
  opacity:0;
  cursor: pointer;
  top: 0;
  left: 0;
  margin: 0;
  z-index: 1;
}
.switch{
  width: 250px;
  height: 100px;
  border-radius: 50px;
  background-color: #171717;
  display: flex;
  align-items: center;
  padding: 6px;
  transition: background-color 0.3s ease;
}
.switch::before{
  content: '';
  height: 81px;
  width:81px;
  border-radius: 50%;
 
  background-color: #111cdf; 
  background-image: url(../assets/img/月亮.png);
  background-position: contain;
  background-repeat: no-repeat;
  background-size: 100% 98%;
  position: relative;
  transition: all 0.5s ease;
  margin-left: 0;
  box-shadow: -2px 4px 10px -2px #f1f0f0;
}
[type=checkbox]:checked +.switch{
  background-color: rgb(237, 218, 183);
}
[type=checkbox]:checked + .switch::before{
  margin-left: 155px;
  background-color: #fff;
  background-image: url(../assets/img/太阳.png);
  box-shadow: -2px 4px 10px -2px #f1f0f0;
}
.switch.circle-screw::before{
  width: 98px;
}
[type=checkbox]:checked +.switch.circle-screw::before{
  width: 98px;
  margin-left: 72px;
}
</style>
