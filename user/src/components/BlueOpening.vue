<template>
    <div class="page">
        <div class="lead">
            <img src="../assets/img/箭头.png" alt="">&nbsp;
            <span>点击按钮开关门</span>
        </div>
        <div class="deviceControlBtn"
        ref="controlBtn"
         @click="changeStatus"
         :style="{ '--slr': isLoading ? 'controlLoading': ''}"
         ></div>
        <div class="deviceInfo">
            <h1>{{curStatus}}</h1>
            <p><span>{{ deviceInfo }}</span>
            <el-icon @click="getBlue"><Refresh /></el-icon></p>
        </div>
    </div>
</template>
    
<script lang='ts' setup name='BlueOpening'>
import { onBeforeMount, ref,watch } from 'vue'
let isOn = ref(true)
let isConnect = ref(false)
let isLoading = ref(false)
let curStatus = ref('点击按钮蓝牙连接设备')
let deviceInfo = ref('暂无设备连接')
let controlBtn = ref()
function loadingText() {
    let curAction = isOn.value?'正在关锁':'正在开锁'
    curStatus.value = curAction
    let num= 0
    let timeId = setInterval(() => {
        if (isLoading.value) {
            if (num < 3) {
                curStatus.value += '.'
                num++
            } else {
                num = 0
                curStatus.value = curAction
            }
        } else {
            clearInterval(timeId)
        }
    },300)
}
async function getBlue() {
    const bluetooth = window.navigator.bluetooth
    try {
        const isSupport = await bluetooth.getAvailability()
        if (isSupport) {
            const bluetoothDevice = await bluetooth.requestDevice({
                filters: [
                {
                    services: ['uuid/opening_service'],
                }
                ]
            })
            bluetoothDevice.addEventListener('gattserverdisconnected', e => {
                isConnect.value = false
                ElMessage("蓝牙断开")
                deviceInfo.value = "暂无设备连接"
            });
            const server = bluetoothDevice.gatt
            if (!server.connected) {
                await server.connect()
            }
            // 获取服务
            const openingService = await server.getPrimaryService('opening_service')
            // 获取舵机状态的特征值对象
            const openingStatusCharacteristic = await openingService.getCharacteristic('battery_level');
            // 读取状态
            const status = await openingStatusCharacteristic.readValue()
            // isOn.value = Boolean(status.getUint16)
            //倾听状态变更
            openingStatusCharacteristic.startNotifications().then(() => {
                openingStatusCharacteristic.addEventListener('characteristicvaluechanged', e => {
                    console.log(e)
                    //修改isOn值
                });
            }).catch(error => {
                console.error('Error starting notifications:', error);
            })
            isConnect.value = true
            ElMessage({
                type: "success",
                message:"连接成功"
            })
            deviceInfo.value = "设备连接中"
            return openingStatusCharacteristic
        } else {
            throw new Error("this browser is not supported")
        }
    } catch (error) {
        if ((/cancelled/).test(error)) {
            //用户取消连接
            ElMessage('连接失败')
        } else if ((/not supported/).test(error)) {
            ElMessage('连接失败，该浏览器不支持蓝牙操作，请用其他浏览器打开')
            curStatus.value = '该浏览器不支持蓝牙操作，请用其他浏览器打开'
        } else {
            ElMessage("失败信息：",error)
        }
        isConnect.value = false
    }
}
let activeDeviceC = ref()
async function changeStatus() {
    if (!isConnect.value) {
        activeDeviceC.value = getBlue()
    } else {
        if (activeDeviceC.value) {
            //写入值
            if (!isLoading.value) {
                try {
                isLoading.value = true
                loadingText()
                if (isOn.value) {
                    //写入关门请求
                    await activeDeviceC.value.writeValue("关门")
                } else {
                    //写入开门请求
                    await activeDeviceC.value.writeValue("开门")
                }
                isOn.value = !isOn.value
                isLoading.value = false
                curStatus.value = isOn.value?'锁已开':'锁已关'
                } catch (err) {
                    ElMessage({
                        type: "error",
                        message:`修改状态失败，错误信息：${err}`,
                    })
                    isLoading.value = false
                }
            }
        } else {
            ElMessage("不存在特征值对象，请重新连接")
            isConnect.value = false
        }
    }
}
const socket_blu = new WebSocket(`ws://113.45.133.116:9999/api/pushMessage/F?Authorization=${sessionStorage.getItem("token")}`)
watch([isConnect.value, isOn.value], ([newIsConnect, newIsOn], _) => {
    if (!newIsConnect) {
        socket_blu.send("not connect")
    } else if (newIsOn) {
        socket_blu.send("opened")
    } else {
        socket_blu.send("closed")
    }
})
onBeforeMount(() => {
    socket_blu.close()
})
</script>
    
<style>
    .page{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .lead{
        margin-top: 80px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 50px;
    }
    .deviceControlBtn{
        position: relative;
        margin: 100px 0 400px 0;
        width: 60vw;
        height: 60vw;
        border-radius: 50%;
        background:url(../assets/img/btn0.png) center/cover no-repeat;
    }
    .deviceControlBtn::before{
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        content:'';
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #1709b1;
        transition: 1s;
        animation: var(--slr) 1s linear infinite;
    }
    @keyframes controlLoading {
        0%{
            opacity: 0.2;
            transform: scale(1);
        }
        50%{
            opacity: 0.5;
        }
        100%{
            opacity: .2;
            transform: scale(1.4);
        }
    }
    .deviceInfo{
        width: 100%;
        text-align: center;
    }
    .deviceInfo h1{
        margin-bottom: 30px;
        font-size: 50px;
    }
    .deviceInfo p{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }
    .deviceInfo p .el-icon{
        margin-left: 15px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #1709b1;
        color: #fff;
    }

</style>