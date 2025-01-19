<template>
    <div class="introBox">
        <h1>智能教室</h1>
    </div>
    <div class="nowStatus">
      <div class="deco">
        <!-- 日历背景 -->
      </div>
      <div class="clockIn">
        <p>{{nowTime.day}}</p>
        <p>{{`${nowTime.year}.${nowTime.month}`}}</p>
        <p>{{ nowTime.date }}</p>
        <el-tag type="success" class="action" v-if="isClockIn=='已完成'">今日已完成签到</el-tag>
        <el-button type="primary" plain class="action" v-else @click="signFn">{{ isClockIn=='未签到'?'立即打卡':'离开教室' }}</el-button>
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
import { onBeforeUnmount, onMounted, ref } from 'vue'
import api from '@/request/index'
import dayjs from 'dayjs'
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
  api.getSwitch(2)//窗帘
  api.getSwitch(3)//风扇
})
let isClockIn = ref('未签到')
function checkIsClockIn() {
    api.classFn.getSignInfo().then(res => {
        const { data } = res.data
        const nowDay = dayjs(date.value).format('YYYY-MM-DD')
        data.forEach(ele => {
            const { inTime, outTime } = ele
            //判断是否有今日签到
            if (nowDay == dayjs(inTime).format('YYYY-MM-DD')) {
                if (outTime == null) {
                    isClockIn.value = '未签退'
                } else {
                    isClockIn.value = '已完成'
                }
            }
        })
    }).catch(err => {
      console.error("获取签到信息失败，错误信息",err)
    })
}
checkIsClockIn()
function signFn() {
  if (isClockIn.value == '未签到') {
    api.classFn.signIn().then(res => {
      checkIsClockIn()
      ElMessage.success("你已成功签到")
    }).catch(err => {
      console.error("签到操作失败，错误信息",err)
    })
  } else if(isClockIn.value == '未签退'){
    api.classFn.signOut().then(res => {
      checkIsClockIn()
      ElMessage.success("你已成功签退")
      ElMessage.success("已完成今日签到")
    }).catch(err => {
      console.error("签退操作失败，错误信息",err)
    })
  }
}
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
    .clockIn .action{
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