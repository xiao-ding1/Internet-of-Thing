<template>
    <div class="introBox">
        <h1>智能教室</h1>
    </div>
    <div class="nowStatus">
      <div class="deco">
        日历背景
      </div>
      <div class="clockIn">
        <p>{{nowTime.day}}</p>
        <p>{{`${nowTime.year}.${nowTime.month}`}}</p>
        <p>{{ nowTime.date }}</p>
        <el-button type="primary" plain>{{ isClockIn?"离开教室":"立即打卡" }}</el-button>
      </div>
    </div>
    <div class="subText">窗帘和风扇情况</div>
    <div class="controlCard">
      <DeviceCard device="fan"/>
      <DeviceCard device="curtain"/>
    </div>
</template>
    
<script setup name='smartClass'>
import DeviceCard from './DeviceCard.vue';
import {onBeforeUnmount, onMounted, ref} from 'vue'
let isClockIn = ref(false)
let date = ref(new Date())
let week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
let nowTime = {
  year: date.value.getFullYear(),
  month: date.value.getMonth()+1,
  day: week[date.value.getDay()],
  date:date.value.getDate()
}
let timeId
onMounted(() => {
  timeId = setInterval(() => {
    date.value = new Date()
  }, 24 * 60 * 60)
})
onBeforeUnmount(() => {
  clearInterval(timeId)
})
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
      margin-bottom: 100px;
      padding: 20px;
      width: 100vw;
      position: relative;
      background-color: #1709b1;
      height: 300px;
      border-radius:0 0 100px 100px;
      transition: 1s;
    }
    h1{
      margin: 40px 0 20px 0;
      text-align: center;
      transition:2s;
      color: #fff;
      font-size: 60px;
      animation: shadow 2s linear forwards;
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
    .nowStatus{
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 20px;
      margin: 50px auto;
      width: 90%;
      height: 800px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .nowStatus .deco{
      height: 450px;
    }
    .clockIn{
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .clockIn p{
      font-size: 40px;
      line-height: 1.3;
      color: rgba(0,0,0,.5);
    }
    .clockIn p:nth-child(3){
      color: #000;
      font-size: 120px;
      font-weight: 700;
    }
    .clockIn button{
      margin: 40px auto;
      width: 90%;
      height: 80px;
      font-size: 40px;
      font-weight: 700;
    }
    .subText{
      margin-bottom: 10px;
      padding-left: 20px;
      border-left: 2px solid #1709b1;
      font-size: 20px;
    }
    .controlCard{
      display: flex;
    }
    .controlCard>div{
      width: 45%;
      margin: 20px;
      height: 120px;
    }
</style>