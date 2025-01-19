<template>
  <div class="pages">
    <div class="introBox">
      <h1>智能门禁</h1>
      <el-button class="appointBtn" @click="appointFn">Appointment</el-button>
    </div>
    <div class="myAppointment">
      <div class="subText">我的预约</div>
      <ul v-if="appointInfo.length">
        <li v-for="(item) of appointInfo" :key="item.id">
          <el-card class="box-card">
            <div slot="header" class="card-header">
              <div>预约详情</div>
              <el-tag :type="item.status=='待审批'?'warning':item.status=='已失效'?'info':'success'">{{ item.status }}</el-tag>
            </div>
            <ul class="card-content">
              <!-- <li>预约编号：{{item.id}}</li> -->
              <!-- <li>预约人：{{ item.userName }}</li> -->
              <li>预约时间：{{ item.time }}</li>
              <li>
                <!-- <el-tag
                  type="warning"
                  style="float: right"
                  effect="dark"
                  @click="showDetail"
                  v-if="item.status=='审批通过'"
                  >查询二维码驱动舵机</el-tag
                > -->
                <el-button
                  type="warning"
                  style="float: right"
                  @click="openDoor"
                  v-if="item.status=='审批通过'"
                  >开门</el-button
                >
              </li>
            </ul>
          </el-card>
        </li>
      </ul>
      <div v-else class="notFound">
        <img src="../assets/img/订单.png" alt="">
        <h2 style="color: black;">暂无预约</h2>
      </div>
    </div>
    <!-- <div class="cover" v-if="isShow">
      <div class="returnBtn" @click="hidDetail"><el-icon><ArrowLeftBold /></el-icon></div>
      <div class="showContent">
          <div class="QR">
            <div class="frame">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            二维码
          </div>
      </div>
      <div class="showBtn" v-if="isDone">
        <el-button type="info">保存二维码</el-button>
        <el-button type="success">扫码驱动舵机</el-button>
      </div>
    </div> -->
  </div>
</template>

<script setup name="smartClass">
import api from '@/request/index'
import { ref } from "vue";
import dayjs from 'dayjs'
let appointInfo = ref([])
function getMyAppoint() {
  api.appointFn.getAppointInfo().then(res => {
    const { data } = res.data
    appointInfo.value = []
    let nowDay = dayjs(new Date()).format('YYYY-MM-DD')
    data.forEach(ele => {
      const {updateTime,createTime,approval} = ele
      let newAppointInfo = {
        time:updateTime!=null?updateTime:createTime,
        status:approval==0?'待审批':'审批通过'
      }
      if (nowDay != dayjs(newAppointInfo.time).format('YYYY-MM-DD')) {
        //不是同一天
        if (newAppointInfo.status == '待审批') {
          newAppointInfo.status='已失效'
        } else {
          newAppointInfo.status='已完成'
        }
      }
      newAppointInfo.time = dayjs(newAppointInfo.time).format('YYYY-MM-DD HH:mm:ss')
      appointInfo.value.push(newAppointInfo)
    })
  }).catch(err => {
    console.error('获取个人预约信息失败，失败信息：',err);
  })
}
getMyAppoint()
function appointFn() {
  api.appointFn.appoint().then(res => {
    getMyAppoint()
    ElMessage.success("预约成功")
  }).catch(err => {
    console.error('个人预约失败，失败信息：',err);
  })
}
function openDoor() {
  api.appointFn.open().then(res => {
    ElMessageBox.alert("门已开")
  }).catch(err => {
    console.error('智能门禁开门失败，失败信息：',err);
  })
}
</script>

<style scoped>
.pages {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.introBox {
  margin-bottom: 50px;
  padding: 20px;
  width: 100vw;
  position: relative;
  background-color: #1709b1;
  height: 300px;
  border-radius: 0 0 100px 100px;
  transition: 1s;
}
.appointBtn {
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
h1 {
  margin: 40px 0 20px 0;
  text-align: center;
  transition: 2s;
  color: #fff;
  font-size: 60px;
  animation: shadow 2s linear forwards;
}
.myAppointment {
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  width: 90vw;
  flex: 1;
  background-color: #fff;
}
.myAppointment .subText {
  border-left: 5px solid #1709b1;
  padding-left: 10px;
  margin-bottom: 20px;
  font-size: 30px;
}
.myAppointment ul li{
  margin-bottom: 20px;
}
.notFound{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.notFound img{
  margin-bottom: 100px;
  width: 250px;
}
.notFound h2{
  font-size: 40px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-weight: 700;
}
.card-content {
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
.returnBtn {
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 50px;
  color: #fff;
}
/* .cover {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background-color: #1709b1;
}
.showContent {
  margin-bottom: 50px;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5%;
}
.QR{
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 400px;
  height: 400px;
  background-color: pink;
}
.frame{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.frame>div:nth-child(1){
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border-top: 10px solid #000;
  border-left: 10px solid #000;
}
.frame>div:nth-child(2){
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  border-top: 10px solid #000;
  border-right: 10px solid #000;
}
.frame>div:nth-child(3){
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border-bottom: 10px solid #000;
  border-left: 10px solid #000;
}
.frame>div:nth-child(4){
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 100px;
  border-bottom: 10px solid #000;
  border-right: 10px solid #000;
}
.frame>div:nth-child(5){
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  width: 50px;
  height: 50px;
  border-right: 10px solid #000;
}
.frame>div:nth-child(6){
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 50px;
  height: 50px;
  border-left: 10px solid #000;
}
.showBtn > button {
  margin: 30px;
  width: 200px;
  height: 100px;
  border-radius: 20px;
  font-size: 20px;
} */
</style>
