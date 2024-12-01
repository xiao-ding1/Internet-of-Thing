<template>
  <el-tabs type="border-card" class="demo-tabs" tabPosition="left" @tab-change="changeTab" v-model="tabValue">
    <el-tab-pane label="感知实验" name="1"><RouterView /></el-tab-pane>
    <el-tab-pane label="蓝牙开门" name="2"><RouterView /></el-tab-pane>
    <el-tab-pane label="网络控灯" name="3"><RouterView /></el-tab-pane>
    <el-tab-pane label="智能门禁" name="4"><RouterView /></el-tab-pane>
    <el-tab-pane label="智能仓储" name="5"><RouterView /></el-tab-pane>
    <el-tab-pane label="智能教室" name="6"><RouterView /></el-tab-pane>
    <el-tab-pane label="智慧农场" name="7"><RouterView /></el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import { RouterView, useRouter } from 'vue-router'
const router = useRouter()
let tabValue = ref("1")
onMounted(() => {
  changeTab()
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
    router.replace('/7')//智慧农场
  } else {
    router.replace('/code')
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.el-tab-pane{
  height: 100vh;
  overflow: hidden;
}
</style>
