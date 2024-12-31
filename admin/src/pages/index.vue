<template>
  <div class="container">
    <Header v-model="isAccount"/>
    <div class="tabs">
      <el-tabs 
      v-if="!isAccount"
      type="border-card" 
      class="custom-tabs" 
      tabPosition="left"
      @tab-change="changeTab"
      v-model="tabValue" 
      active-text-color="#ffd04b"
      background-color="#545c64">
        <el-tab-pane label="🚀 感知实验" name="1"><RouterView v-if="tabValue=='1'"/></el-tab-pane>
        <el-tab-pane label="🔵 蓝牙开门" name="2"><RouterView v-if="tabValue=='2'"/></el-tab-pane>
        <el-tab-pane label="💡 网络控灯" name="3"><RouterView v-if="tabValue=='3'"/></el-tab-pane>
        <el-tab-pane label="🚪 智能门禁" name="4"><RouterView v-if="tabValue=='4'"/></el-tab-pane>
        <el-tab-pane label="📦 智能仓储" name="5"><RouterView v-if="tabValue=='5'"/></el-tab-pane>
        <el-tab-pane label="🏫 智能教室" name="6"><RouterView v-if="tabValue=='6'" v-bind="{...classDeviceStatus,...classDeviceNum}" /></el-tab-pane>
        <el-tab-pane label="🌱 智慧农场" name="7"><RouterView v-if="tabValue=='7'"/></el-tab-pane>
      </el-tabs>
    </div>
    <div class="acc">
      <AccountManagement v-if="isAccount" v-model="isAccount"/>
    </div>
  </div>
</template>

<script setup>
import {ws_num,ws_switch} from '../request/ws'
import { onMounted,ref } from 'vue';
import { RouterView, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
const router = useRouter()
let tabValue = ref("1")
let isAccount = ref(false);
let classDeviceStatus = ref({
  fanStatus: true,
  curtainStatus: true,
})
let classDeviceNum = ref({
  temNum: 0,
  rayNum:0
})
onMounted(() => {
  changeTab()
  ws_switch.onopen = () => {
      console.log('硬件开关的ws连接成功');
  }
  ws_switch.onmessage = (e) => {
      console.log('硬件开关我收到信息了');
      let data = JSON.parse(e.data)
      console.log(data)
      if (data.type == 2) {
        classDeviceStatus.value.curtainStatus = data.status
      } else if (data.type == 3) {
        classDeviceStatus.value.fanStatus = data.status
      }
  }
  ws_num.onopen = () => {
      console.log('传感器信息的ws连接成功');
  }
  ws_num.onmessage = (e) => {
      console.log('传感器我收到信息了');
      let data = JSON.parse(e.data)
      console.log(data)
      if (data.type == 1) {
        classDeviceNum.value.rayNum = data.value
      } else if (data.type == 2) {
        classDeviceNum.value.temNum = data.value
      }
  }
})
function changeTab() {
  if (tabValue.value == '2') {
    router.replace('/blue')//蓝牙开门
  }else if (tabValue.value == '3') {
    router.replace('/lampControl')//网络控灯
  }else if (tabValue.value == '4') {
    router.replace('/smartOpen')//智能门禁
  } else if (tabValue.value == '5') {
    router.replace('/smartStorage')//智能存储
  }else if (tabValue.value == '6') {
    router.replace('/smartClass')//智能教室
  }else if(tabValue.value=='7'){
    router.replace('/smartFarm')//智慧农场
  } else {
    router.replace('/code')
  }
}
function ToogleisAccount(message) {
  isAccount = message
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
.el-tab-pane{
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px); /* 减去工具栏高度 */
  overflow: hidden;
}
.custom-tabs{
  height:100vh;
  margin:10px;
}
.el-tabs__item.is-active{
  background-color: pink;
}
</style>
