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
let ws_sign
onMounted(() => {
  const store = useStore()
  function makeWs(url,handleFn) {
    let ws
    let wsUrl ="ws://8.134.218.209/api/ws"+url+`?Authorization=${sessionStorage.getItem("token")}`;
    // 避免重复连接
    let lockReconnect = false;
    // 定时任务
    let tt;
    createWebSocket()
    return ws
    function createWebSocket() {
      try {
          ws = new WebSocket(wsUrl);
          init();
      } catch(e) {
          console.log('ws连接错误' + e)
          //重连
          reconnect();
      }
      return ws
    }
    function init() {
      ws.onopen = function () {
        console.log('连接成功');
      }
      ws.onclose = function (e) {
        if (e.code != 1000){
          reconnect();
        }
      }
      ws.onmessage = function (e) {
          handleFn(e.data)
      }
    }
    function reconnect() {
      if(lockReconnect) {
          return;
        };
        lockReconnect = true;
        tt && clearTimeout(tt);
        tt = setTimeout(function () {
          createWebSocket();
          lockReconnect = false;
        }, 2000);
    }
  }
  ws_blu = makeWs('/F', msg => {
  // 根据状态修改isConnect和isLock信息
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
  })
  ws_approve = makeWs('/B', msg => {
    if (/申请/.test(msg)) {
      store.commit('smartOpeningInfo/addTableInfo')
    }
  })
  ws_sen = makeWs('/D', data => {
    const msg = JSON.parse(data)
    const { type, value } = msg
    if (type == 1) {
      store.commit('classInfo/setRayNum',value)
    } else if (type == 2) {
      store.commit('classInfo/setTemNum',value)
    } else if (type == 3) {
      store.commit('farmInfo/setwetNum',value)
    }  else if (type == 4) {
      store.commit('farmInfo/settemNum',value)
    }  else if (type == 5) {
      store.commit('farmInfo/setrayNum',value)
    } 
  })
  ws_switch = makeWs('/A', data => {
    const msg = JSON.parse(data)
    const { type, value } = msg
    if (type == 2) {
      store.commit('classInfo/setCurtainStatus',value==0?true:false)
    } else if (type == 3) {
      store.commit('classInfo/setFanStatus',value==1?true:false)
    } else if (type == 1) {
      store.commit('lampInfo/setLampStatus',value==1?true:false)   
  }
  })
  ws_sign = makeWs('/G', data => {
    const msg = JSON.parse(data)
    if (/签到/.test(msg)) {
      store.commit('classInfo/setSignInInfo',true)
    } else if (/签退/.test(msg)){
      store.commit('classInfo/setSignInInfo',false)
    }
  })  
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
  ws_sign.close(1000)
  ws_sign = null
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
