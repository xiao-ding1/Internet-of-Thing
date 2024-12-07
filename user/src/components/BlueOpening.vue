<template>
    <div class="page">
        <div class="lead">
            <img src="../assets/img/箭头.png" alt="">&nbsp;
            <span>点击按钮开关门</span>
        </div>
        <div class="deviceControlBtn"
         @click="changeStatus"
         :style="{ '--slr': isLoading ? 'controlLoading': ''}"
         ></div>
        <div class="deviceInfo">
            <h1>{{curStatus}}</h1>
            <p><span>设备信息：xxx</span>
            <el-icon @click="getBlue"><Refresh /></el-icon></p>
        </div>
    </div>
</template>
    
<script lang='ts' setup name='BlueOpening'>
import { onMounted,  ref } from 'vue'
let isOn = ref(true)
let isLoading = ref(false)
let curStatus = ref('锁已开')
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
function changeStatus() {
    isLoading.value = true
    loadingText()
    setTimeout(() => {
        if (isOn.value) {
        //关门，向设备发请求
        } else {
            //开门，向设备发请求
        }
        isLoading.value = false
        isOn.value = !isOn.value
        curStatus.value = isOn.value?'锁已开':'锁已关'
    },2000)
}
function getBlue() {
    
}
onMounted(() => {
    getBlue()
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
        /* 100%{
            opacity: 0.2;
            transform: scale(1);
        } */
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