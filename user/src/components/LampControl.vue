<template>
  <div class="body" :class="{ 'light-on-bg': isOn }">
   <div class="introBox">
       <h1>智能灯控</h1>
   </div>
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
     <input type="checkbox" id="switch" @change="toggleLight" :disabled="loading" :checked="isOn">
     <label for="switch" class="switch"></label>
   </div>
 </div>
 <Loading  v-if="loading"/>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { controlLamp } from '../request/modules/lamp';
import Loading from './Loading.vue';
const store = useStore()
const isOn = computed(()=>store.state.lampInfo.lampDeviceStatus)
const loading = ref(false)
// 切换灯泡的开关状态
const toggleLight = async () => {
 const status = isOn.value? 0 : 1
 try {
  loading.value = true
   const response = await controlLamp(status)
   if (response && response.data.msg === 'success') {
     if (status === 1) {
       ElMessage({
         message: '开灯成功',
         type: 'success'
       })
     } else {
       ElMessage({
         message: '关灯成功',
         type: 'success'
       })
     }
     store.commit("lampInfo/setLampStatus",!isOn.value)
   } 
 } catch (error) {
   ElMessage({
     message: '发送控制灯请求失败',
     type: 'error'
   })
 }
 finally{
  loading.value = false
 }
}
</script>

<style scoped>
.body{
 background-color:rgb(191, 191, 191);
 width:100vw;
 height: 100vh;
 transition: background-color 0.5s ease;
}
.introBox{
     margin-bottom: 100px;
     padding: 20px;
     width: 100vw;
     position: relative;
     background-color: #8b8b8b;
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
 background: radial-gradient(yellow 50%, #e4e4e4); 
 filter: drop-shadow(0 0 200px yellow);
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
 background-color: #7a7a7a;
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
 background-color:rgb(255, 255, 179);
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