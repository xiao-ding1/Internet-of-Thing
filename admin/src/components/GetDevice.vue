<template>
<div>
    <text class="choose">请在此选择设备</text>
    <div class="lead"></div>
  <select v-model="selectedDevice">
    <option v-for="device in deviceList" :key="device.id" :value="device.id">{{ device.name }}</option>
  </select>
  </div>
</template>
<script setup>
import { ref,onMounted } from 'vue';
const deviceList = ref([{id:111,name:222}])
const selectedDevice = ref('')
onMounted(() => {
//获取设备型号
})
</script>
<style scoped>
select {
  position: absolute;
  appearance: none; 
  border: 1px solid #ccc; 
  border-radius: 5px;
  padding: 8px 12px; 
  font-size: 14px;
  color: #333; 
  background-image: url('../assets/img/flower.jpg'); 
  background-repeat: no-repeat;
  width: 150px;
  cursor: pointer; 
  background-color: transparent;
  background-position: right 8px center; 
  background-size: contain;
right: 120px;
}

select option {
  font-size: 14px; 
  color: #333; 
}
.lead{
  position: absolute;
  display: block;
  width: 40px;
  height: 40px;
  margin-left: 500px;
  background-image: url(../assets/img/箭头.png);
  background-size: contain;
  right: 110px;
  background-repeat: no-repeat;
  top: 90px;
}
.choose{
  font-size: 12px;
  position: absolute;
  top: 130px;
  right: 120px;
  color: #525252;
}
</style>