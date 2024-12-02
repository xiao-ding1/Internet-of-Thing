<template>
    <div class="box">
        <div class="deviceInfo" @click="OpenBlueTooth" v-loading="isLoading">
            <div v-if="!connectInfo.isConnect" class="warningInfo">还未匹配，请开启蓝牙</div>
            <ul v-else>
                <li>
                    <div class="info">{{ connectInfo.name }}</div>
                    <span>设备信息</span>
                </li>
                <li>
                    <div class="info">{{ connectInfo.status }}</div>
                    <span>设备状态</span>
                </li>
            </ul>
        </div>
        <ul class="btn">
            <li><el-button :type="isOn==true?'primary':'info'" @click="turnOn">开</el-button></li>
            <li><el-button :type="isOn==false?'primary':'info'" @click="turnOff">关</el-button></li>
        </ul>
    </div>
</template>
    
<script lang='ts' setup name='BlueOpening'>
import { reactive, ref } from 'vue'
let isOn = ref(false)
function turnOn() {
    isOn.value = true
    //向设备发送信息
    console.log(111);
    
}
function turnOff() {
    isOn.value = false
    //向设备发送信息
    console.log(222);
    
}
let connectInfo = reactive({
    isConnect:false,
    name:'xxx',
    status:'On'
})
function getBlue() {
    //获取蓝牙匹配信息

    //是否匹配
    //设备信息，设备状态
}
let isLoading = ref(false)
function OpenBlueTooth() {
    if (connectInfo.isConnect == false) {
        //连接蓝牙
        isLoading.value = true
        setTimeout(() => {
            //连接成功
            connectInfo.isConnect = true
            isLoading.value = false
        },1000)
    }
}
    
</script>
    
<style scoped>
    .box{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .deviceInfo{
        margin-bottom: 40px;
        width: 100vw;
        height: calc(1/2*100vh);
        border-radius: 5%;
        background-color: gainsboro;
    }
    .deviceInfo ul li{
        padding: 100px;
    }
    .info{
        font-size: 70px;
    }
    .warningInfo{
        font-size: 50px;
        padding: 50px;
        font-weight: 700;
        color: #fff;
    }
    .btn{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .btn li .el-button{
        width: calc(1/4*80vw);
        height:  calc(1/4*80vw);
        font-size: 2.5rem;
        font-weight: 700;
        border-radius: 50%;
    }

</style>