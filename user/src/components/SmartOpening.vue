<template>
    <div class="pages">
      <div class="introBox">
          <h1>智能门禁</h1>
          <el-button class="appointBtn">Appointment</el-button>
      </div>
      <div class="myAppointment">
        <div class="subText">我的预约</div>
        <ul>
          <el-card class="box-card">
            <div slot="header" class="card-header">
              <el-tag type="success">预约成功</el-tag>
            </div>
            <ul class="card-content">
              <li>预约编号：xxx</li>
              <li>设备名称：xxx</li>
              <li>设备时间：xxx</li>
              <li><el-tag type="warning" style="float: right;" effect="dark" @click="showDetail">详情</el-tag></li>
            </ul>
          </el-card>
        </ul>
      </div>
      <div class="cover" v-if="isShow" @click="hidDetail">
        <div class="showContent" @click.stop>
          <div v-if="isDone">
              <div>成功预约</div>
              <div>二维码</div>
            </div>
            <div v-else>待审核</div>
          </div>
          <div class="showBtn" v-if="isDone">
            <el-button type="info">保存二维码</el-button>
            <el-button type="success">扫码驱动舵机</el-button>
          </div>
      </div>
    </div>
</template>
    
<script setup name='smartClass'>
import {ref} from 'vue'
let isShow = ref(false)
let isDone = ref(false)
function showDetail() {
  isShow.value = true
}
function hidDetail() {
  isShow.value = false
}
</script>
    
<style scoped>
    .pages{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 100vh;  
    }
    .introBox{
      margin-bottom: 50px;
      padding: 20px;
      width: 100vw;
      position: relative;
      background-color: #1709b1;
      height: 300px;
      border-radius:0 0 100px 100px;
      transition: 1s;
    }
    .appointBtn{
      position: absolute;
      top: calc(100% - 40px);
      left: 50%;
      transform: translateX(-50%);
      width: 300px;
      height: 80px;
      border-radius: 20px;
      font-size: 20px;
      font-weight: 700;
      box-shadow: 1px 4px 10px #ccc;
    }
    h1{
      margin: 40px 0 20px 0;
      text-align: center;
      transition:2s;
      color: #fff;
      font-size: 60px;
      animation: shadow 2s linear forwards;
    }
    .myAppointment{
      padding: 20px 10px;
      width: 90vw;
      flex: 1;
      background-color: #fff;
    }
    .myAppointment .subText{
      border-left: 5px solid #1709b1;
      padding-left: 10px;
      margin-bottom: 20px;
      font-size: 30px;
    }
    .card-header{
      display: flex;
      justify-content: flex-end;
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid rgba(0,0,0,.1);
    }
    .card-content{
      padding: 10px;
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
    .cover{
      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 1;
      width: 100vw;
      height: 100vh;
      background-color: rgba(204, 204, 204,.7);
    }
    .showContent{
      width: 800px;
      height: 1350px;
      background-color: #fff;
    }
    .showBtn>button{
      margin: 30px;
      width: 200px;
      height: 100px;
      border-radius: 20px;
      font-size: 20px;
    }
</style>