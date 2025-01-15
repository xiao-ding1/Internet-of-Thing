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
        <el-tab-pane label="🏫 智能教室" name="6"><RouterView v-if="tabValue=='6'"/></el-tab-pane>
        <el-tab-pane label="🌱 智慧农场" name="7"><RouterView v-if="tabValue=='7'"/></el-tab-pane>
      </el-tabs>
    </div>
    <div class="acc">
      <AccountManagement v-if="isAccount" v-model="isAccount"/>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted,ref } from 'vue';
import { RouterView, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import { useStore } from 'vuex';

const router = useRouter()
let tabValue = ref("1")
let isAccount = ref(false);
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
    router.replace('/smartFarm')//智慧农场
  } else {
    router.replace('/code')
  }
}
function ToogleisAccount(message) {
  isAccount = message
}
let ws_blu
let ws_approve
let ws_sen
let ws_switch
// 当智能教室窗帘状态变化时，会发送下面的消息
// {
//     "type":2
//     "status":1
// }

// 1标识窗帘卷起
// 0标识窗帘放下

// 当智能教室风扇状态变化时，会发送下面的消息
// {
//     "type":3
//     "status":1
// }

// 1标识风扇开
// 0标识风扇关
onMounted(() => {
  const store = useStore()
  ws_blu = new WebSocket(`ws://113.45.133.116:9999/api/pushMessage/F?Authorization=${sessionStorage.getItem("token")}`)
    ws_blu.onopen = function () {
        // ElMessage({
        //     type: "success",
        //     message: "成功连接设备"
        // })
        // console.log("成功连接");
    }
    ws_blu.onmessage = function (e) {
        //根据状态修改isConnect和isLock信息
        const msg = e.data
        if (msg == "not connect") {
            store.commit('blueInfo/setIsConnect',false)
        } else {
            store.commit('blueInfo/setIsConnect',true)
            if (msg == "opened") {
                store.commit('blueInfo/setIsLock',false)
            } else {
                store.commit('blueInfo/setIsLock',true)
            }
        }
        changeLockStatus()
    }
    ws_blu.onerror = function (e) {
        // ElMessage({
        //     type: "error",
        //     message: "网络错误，请联系管理员查询错误"
        // })
    }
    ws_blu.onclose = function (e) {
        // if (e.wasClean) {
        //     ElMessage({
        //         type: "info",
        //         message: "连接已断开"
        //     })
        // }
  }
  ws_approve = new WebSocket(`ws://113.45.133.116:9999/api/pushMessage/B?Authorization=${sessionStorage.getItem("token")}`)
    ws_approve.onopen = function () {
        // ElMessage({
        //     type: "success",
        //     message: "成功连接设备"
        // })
        // console.log("成功连接");
    }
    ws_approve.onmessage = function (e) {
        const msg = e.data
        const userName = msg.split("申请预约审批")[0]
        // zhangsang申请预约审批
        store.commit('smartOpeningInfo/addTableInfo',{userName,status:"待审批"})
    }
    ws_approve.onerror = function (e) {
        // ElMessage({
        //     type: "error",
        //     message: "网络错误，请联系管理员查询错误"
        // })
    }
    ws_approve.onclose = function (e) {
        // if (e.wasClean) {
        //     ElMessage({
        //         type: "info",
        //         message: "连接已断开"
        //     })
        // }
  }
  ws_sen = new WebSocket(`ws://113.45.133.116:9999/api/pushMessage/D?Authorization=${sessionStorage.getItem("token")}`)
  ws_sen.onopen = function () {
        // ElMessage({
        //     type: "success",
        //     message: "成功连接设备"
        // })
        // console.log("成功连接");
    }
    ws_sen.onmessage = function (e) {
      const msg = JSON.parse(e.data)
      const { type, value } = msg
      if (type == 1) {
        store.commit('classInfo/setRayNum',value)
      } else if (type == 2) {
        store.commit('classInfo/setTemNum',value)
      }    
    }
    ws_sen.onerror = function (e) {
        // ElMessage({
        //     type: "error",
        //     message: "网络错误，请联系管理员查询错误"
        // })
    }
    ws_sen.onclose = function (e) {
        // if (e.wasClean) {
        //     ElMessage({
        //         type: "info",
        //         message: "连接已断开"
        //     })
        // }
  }
  ws_switch = new WebSocket(`ws://113.45.133.116:9999/api/pushMessage/A?Authorization=${sessionStorage.getItem("token")}`)
  ws_switch.onopen = function () {
        // ElMessage({
        //     type: "success",
        //     message: "成功连接设备"
        // })
        // console.log("成功连接");
    }
    ws_switch.onmessage = function (e) {
      const msg = JSON.parse(e.data)
      const { type, value } = msg
      if (type == 2) {
        store.commit('classInfo/setCurtainStatus',value==0?true:false)
      } else if (type == 3) {
        store.commit('classInfo/setFanStatus',value==1?true:false)
      }    
    }
    ws_switch.onerror = function (e) {
        // ElMessage({
        //     type: "error",
        //     message: "网络错误，请联系管理员查询错误"
        // })
    }
    ws_switch.onclose = function (e) {
        // if (e.wasClean) {
        //     ElMessage({
        //         type: "info",
        //         message: "连接已断开"
        //     })
        // }
  }
})
onBeforeUnmount(() => {
  ws_blu.close(1000)
  ws_blu = null
  ws_approve.close(1000)
  ws_approve = null
  ws_sen.close(1000)
  ws_sen = null
  ws_switch.close(1000)
  ws_switch = null
})
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
