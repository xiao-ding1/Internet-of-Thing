<template>
    <h1>欢迎体验蓝牙开门</h1>
    <div class="showCase">
        <div class="myPhone"><img src="../static/iphone.png" alt="iphone"></div>
        <div class="link">
            <div class="linkLine" :class="isConnect?'connectLine':'line'"></div>
            <div class="linkIcon">
                <el-icon v-if="isConnect" class="connectClass"><Connection/></el-icon>
                <el-icon v-else><CloseBold /></el-icon>
            </div>
            <div class="connectWaring" v-if="!isConnect">连接失败，请重试</div>
        </div>
        <div class="lockBox">
            <div class="lock" :style="lockAniStyle"></div>
            <div class="lockStatus" v-if="isConnect">{{ status }}</div>
        </div>
    </div>
</template>
    
<script lang='ts' setup name='BlueOpening'>
import { onMounted, ref } from 'vue'
import { Connection } from '@element-plus/icons-vue';
let isLock = ref(true)
let lockAniStyle = ref({})
let isConnect = ref(true)
let status = ref('门锁已关闭')
function getDoorInfo() {
    //获取单片机蓝牙信息
    //蓝牙是否匹配isConnect
    //匹配成功检测开门信息
    changeLockStatus()
}
function changeLockStatus() {
    if (isConnect.value) {
        if (isLock.value) {
            //锁着
            lockAniStyle.value = {
                '--lock-color':'#01dde8',
                '--lock-style': 'lockClose',
                '--ring-style1': 'lockDown',
                '--ring-style2': 'ringClose',
            }
            status.value = '门锁已关闭'
        } else {
            //开着
            lockAniStyle.value ={
                '--lock-style': 'lockOpen',
                '--ring-style1': 'lockPop',
                '--ring-style2': 'ringOpen',
            }     
            status.value = '门锁已打开'
        }
    } else {
        lockAniStyle.value = {
            '--lock-color':'#ccc',
            '--lock-style': 'lockClose',
            '--ring-style1': 'lockDown',
            '--ring-style2': 'ringClose',
        }
    }
}
onMounted(() => {
    getDoorInfo()
})
    
</script>
    
<style scoped>
    .showCase{
        margin-top: 50px;
        display: flex;
    }
    .showCase>div{
        z-index: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 33%;
        background-color: transparent;
    }
    .myPhone img{
        width: 60%;
    }
    /* 连接线的样式 */
    .linkLine{
        margin-left: 70px;
        position: relative;
        width: 120%;
        height: 5px;
        background-color: #ccc;
    }
    .connectLine{
        background-color: #01dde8;
    }
    .connectLine::before{
        content: '';
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        width: 20px;
        height: 100%;
        background:  linear-gradient(to right, transparent, #fff); 
        box-shadow: 0px 0px 17px 5px #72dffa;
        animation: brightening 2s infinite;
    }
    .linkIcon{
        margin-top: -60px;
        color: red;
        font-size: 100px;
        transition: 1s;
    }
    .connectClass{
        margin-top: 10px;
        font-size: 30px;
        color: #72dffa;
        animation: textPop 1.2s linear infinite;
    }
    .connectWaring{
        margin-top: -20px;
        font-size: 18px;
        color: red;
    }
    /* 锁样式 */
    .lock{
        display: flex;
        position: relative;
        justify-content: center;
        width: 30%;
        height: 100px;
        border-radius: 10%;
        background-color: #ccc;
        transition: 1.3s;
        animation: var(--lock-style) 1.3s linear forwards;
    }
    .lock::before{
        content: '';
        position: absolute;
        z-index: -1;
        top: -60%;
        background-color: #fff;
        border-radius: 40%;
        border: 12px solid #ccc;
        width: 60%;
        height: 80%;
        animation: var(--ring-style1) 1.3s linear forwards;
    }
    .lock::after{
        content: '';
        z-index: -1;
        position: absolute;
        left: 0;
        width: 20%;
        height: 30%;
        background-color: #fff;
        animation: var(--ring-style2) 1.3s linear forwards;
    }
    .lockStatus{
        margin-top: 20px;
    }
    @keyframes brightening {
        0% {
            left: 0;
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            left: calc(100% - 20px); 
            opacity: 0;
        }
    }
    @keyframes textPop {
        0%{
            transform: scale(1);
        }
        75%{
            transform: scale(1.1);
        }
        100%{
            transform: scale(1);
        }
    }
</style>