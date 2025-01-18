<template>
  <div class="introBox">
    <h1>智慧农场</h1>
  </div>
  <div class="content" >
    <div class="card1">
      <div class="card-header1"></div>
      <div class="card-content">
        <h2>滴灌状态</h2>
        <p>当前状态: {{ dripStatus? '开启' : '关闭' }}</p>
      </div>
      <div class="card-footer">
        <label class="switch-label">
          <input type="checkbox" v-model="dripStatus" @change="toggleDripStatus">
          <span class="switch-slider"></span>
        </label>
      </div>
    </div>
    <div class="card2">
      <div class="card-header2">
      </div>
      <div class="card-content">
        <h2>照明状态</h2>
        <p>当前状态: {{ lightStatus? '开启' : '关闭' }}</p>
      </div>
      <div class="card-footer">
        <label class="switch-label">
          <input type="checkbox" v-model="lightStatus" @change="toggleLightStatus">
          <span class="switch-slider"></span>
        </label>
      </div>
    </div>
    <div class="card3">
      <div class="card-header3"></div>
      <div class="card-content">
        <h2>通风状态</h2>
        <p>当前状态: {{ ventilationStatus? '开启' : '关闭' }}</p>
      </div>
      <div class="card-footer">
        <label class="switch-label">
          <input type="checkbox" v-model="ventilationStatus" @change="toggleVentilationStatus">
          <span class="switch-slider"></span>
        </label>
      </div>
    </div>
    <div class="ball"></div>
  </div>
  <Loading v-if="loading"/>
</template>

<script lang="ts" setup>
import { ref, computed} from 'vue';
import Loading from './Loading.vue';
import {controllWet, controllRay, controllFan} from '@/request/modules/farm'
import { useStore } from 'vuex';
const store = useStore()
const dripStatus = computed(()=>store.state.farmInfo.wetStatus)
const lightStatus = computed(()=>store.state.farmInfo.rayStatus)
const ventilationStatus = computed(()=>store.state.farmInfo.temStatus)
const loading = ref(false)
const toggleDripStatus = async () => {
  loading.value = true
  const status = dripStatus.value? 0 : 1
  try {
   const res = await controllWet(status)
   if (res.data && res.data.msg === 'success') {
    store.commit("farmInfo/setWetStatus",!dripStatus.value)
   }
  } catch (error) {
    console.error('滴灌设备状态更新失败', error)
  }
  finally {
    loading.value = false
  }
}

const toggleLightStatus = async () => {
  loading.value = true
  const status = lightStatus.value? 0 : 1
  try {
   const res = await controllRay(status)
   if (res.data && res.data.msg === 'success') {
    store.commit("farmInfo/setRayStatus",!lightStatus.value)
   }
  } catch (error) {
    console.error('照明设备状态更新失败', error)
  }
  finally {
    loading.value = false
}
}

const toggleVentilationStatus = async () => {
  loading.value = true
  const status = ventilationStatus.value? 0 : 1
  try {
   const res = await controllFan(status)
   if (res.data && res.data.msg === 'success') {
    store.commit("farmInfo/setTemStatus",!ventilationStatus.value)
   }
  } catch (error) {
    console.error('通风设备状态更新失败', error)
  }
  finally {
    loading.value = false
}}
</script>

<style scoped>
.card1 {
  position:absolute;
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 180px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 480px;
  right:100px;
  top: 100px;
  background-color: #eeeeee;
}
.card2 {
  position:absolute;
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 180px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 480px;
  margin-bottom: 80px;
  left: 30px;
  top: 380px;
  background-color: rgb(237, 244, 210);
}
.card3 {
  position:absolute;
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 180px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 480px;
  top:780px;
  left: 400px;
}
.card-header1,
.card-header2,
.card-header3
 {
  height:160px;
  position: relative;
}
h2{
  margin-bottom: 20px;
}
.card-content {
  padding: 40px;
  text-align: center;
  font-size: 30px;
}
.card-footer {
  padding: 10px;
  text-align: center;
  margin-bottom: 60px;
}
.switch-label {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 50px;
}
.switch-label input {
  opacity: 0;
  width: 0;
  height: 10px;
}
.switch-slider {
  position: absolute;
  top: 0;
  left: 0px;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  transition: 0.4s;
}
.switch-slider:before {
  position: absolute;
  content: '';
  height: 38px;
  width: 38px;
  left: 5px;
  bottom: 5px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}
input:checked +.switch-slider {
  background-color: #2196F3;
}
input:checked +.switch-slider:before {
  transform: translateX(46px);
}
.introBox {
  padding: 20px;
  width: 100vw;
  position: relative;
  background-color: #1709b1;
  height: 300px;
  border-radius: 0 0 100px 100px;
  transition: 1s;
}
h1 {
  margin: 40px 0 20px 0;
  text-align: center;
  transition: 2s;
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
.content {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  backface-visibility: hidden;
  transform-origin: center;
  background-color: #e6f4ff;
}
@keyframes containerAppear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.card-header2::before {
  content: ''; 
  background-image: url('../assets/img/太阳.png'); 
  background-size: contain; 
  background-repeat: no-repeat; 
  width: 100px; 
  height: 100px; 
  position: absolute; 
  top: 50px; 
  left: 140px; 
  z-index: 1;
}
.card-header1::before {
  content: ''; 
  background-image: url('../assets/img/滴灌.png'); 
  background-size: contain; 
  background-repeat: no-repeat; 
  width: 80px; 
  height: 80px; 
  position: absolute; 
  top: 50px; 
  left: 160px; 
  z-index: 1;
}
.card-header3::before {
  content: ''; 
  background-image: url('../assets/img/通风风扇.png'); 
  background-size: contain; 
  background-repeat: no-repeat; 
  width: 80px; 
  height: 80px; 
  position: absolute; 
  top: 60px; 
  left: 160px; 
  z-index: 1;
}

.ball{
  position: absolute;
  width: 500px;
  height: 400px;
  border-radius: 50%;
  background-color: #89c7fa;
  top:1400px;
  left: 300px;
  opacity: 0.2; 
  filter: blur(100px); 
}
</style>