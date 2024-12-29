<template>
  <Loading  v-if="loading"/>
  <div>
    <Title :text="text" :subtext="subtext"/>
    <div class="cardContainer">
      <span class="item left-to-right" :class="{ 'hide-bg': showTmessage}" @click="toggleMessage('temperature')">
        <span class="text-content" v-show="showTmessage" @click.stop>
          <div class="card1">
            <h2>实时温度</h2>
            <div class="content">{{ currentTemp }}度</div>
            <i class="iconfont icon-mianxingwendujitubiao"></i>
          </div>
          <div class="slider-demo-block">
            <div class="slider-label">最低温设置</div>
            <el-slider 
              v-model="minTemp" 
              show-input 
              size="small" 
              :min="minSliderMin" 
              :max="minSliderMax" 
            />
            <div class="slider-label">最高温设置</div>
            <el-slider 
              v-model="maxTemp" 
              show-input 
              size="small" 
              :min="maxSliderMin" 
              :max="maxSliderMax" 
            />
            <el-button type="success" round @click="sendTemperatureRequest">确定</el-button>
          </div>
        </span>
      </span>
      <span class="item top-to-bottom" :class="{ 'hide-bg': showSmessage}" @click="toggleMessage('sun')">
        <span class="text-content" v-show="showSmessage" @click.stop>
          <div class="card2">
            <h2>实时光照</h2>
            <div class="content">{{ currentSun }}度</div>
            <el-icon>
              <Sunny class="sun"/>
            </el-icon>
          </div>
          <div class="slider-demo-block">
            <div class="slider-label">最暗光线设置</div>
            <el-slider 
              v-model="minSun" 
              show-input 
              size="small" 
              :min="minSunSliderMin" 
              :max="minSunSliderMax" 
            />
            <el-button type="success" round @click="sendSunRequest">确定</el-button>
            <div class="block">
      <el-date-picker
        v-model="time"
        type="datetime"
        placeholder="请选择关闭照明时间"
      />
      <el-button type="success" round @click="sendTimeRequest">确定</el-button>
    </div>
          </div>
        </span>
      </span>
      <span class="item right-to-left" :class="{ 'hide-bg': showWmessage }" @click="toggleMessage('wet')">
        <span class="text-content" v-show="showWmessage" @click.stop>
          <div class="card3">
            <h2>实时湿度</h2>
            <div class="content">{{ currentWet }}度</div>
            <el-icon><Pouring class="sun"/></el-icon>
          </div>
          <div class="slider-demo-block">
            <div class="slider-label">最低湿度设置</div>
            <el-slider 
              v-model="minWet" 
              show-input 
              size="small" 
              :min="minWetSliderMin" 
              :max="minWetSliderMax" 
            />
            <div class="slider-label">最高湿度设置</div>
            <el-slider 
              v-model="maxWet" 
              show-input 
              size="small" 
              :min="maxWetSliderMin" 
              :max="maxWetSliderMax" 
            />
            <el-button type="success" round @click="sendWetRequest">确定</el-button>
          </div>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup >
import Title from './Title.vue';
import { ref } from 'vue';
import { sendTemperature,sendWet,sendSunray,sendCloseTime} from '@/request/modules/farm';
import Loading from './Loading.vue';
const currentTemp= ref(1);
// 最低温滑块绑定的数据
const minTemp = ref(0);
// 最高温滑块绑定的数据
const maxTemp = ref(30);
// 最低温滑块的最小值
const minSliderMin = ref(-20);
// 最低温滑块的最大值
const minSliderMax = ref(50);
// 最高温滑块的最小值
const maxSliderMin = ref(0);
// 最高温滑块的最大值
const maxSliderMax = ref(100);
// 实时光照数据，
const currentSun = ref(1);
// 最暗光线滑块绑定的数据
const minSun = ref(0);
// 最暗光线滑块的最小值
const minSunSliderMin = ref(0);
// 最暗光线滑块的最大值
const minSunSliderMax =ref(50);
// 实时湿度数据
const currentWet=ref(1);
// 最低湿度滑块
const minWet= ref(0);
// 最高湿度滑块
const maxWet= ref(100);
// 最低湿度滑块的最大值
const minWetSliderMax= ref(50);
// 最低湿度滑块的最小值
const minWetSliderMin= ref(0);
// 最高湿度滑块的最小值
const maxWetSliderMin= ref(50);
// 最高湿度滑块的最大值
const maxWetSliderMax= ref(100);
// 标题文本
const text= "智 慧 农 场";
// 副标题文本
const subtext = "智慧种植的种子在此发芽";
// 是否显示温度相关消息
const showTmessage= ref(false);
// 是否显示光照相关消息
const showSmessage= ref(false);
// 是否显示湿度相关消息
const showWmessage = ref(false);
// 时间选择的数据
const time= ref('');
// 加载状态
const loading = ref(false);
const toggleMessage = (type)=>{
  switch (type) {
    case 'temperature':
      showTmessage.value =!showTmessage.value;
      break;
    case'sun':
      showSmessage.value =!showSmessage.value;
      break;
    case 'wet':
      showWmessage.value =!showWmessage.value;
      break
  }
}

const ws = new WebSocket('ws://113.45.133.116:9999');
// 温度设置发送请求的函数
const sendTemperatureRequest = async()=>{
  loading.value=true
  try {
    const response = await sendTemperature(minTemp.value, maxTemp.value)
    console.log(response.data)
  } catch (error) {
    console.error('温度设置请求发送失败', error)
  } finally {
    loading.value = false
  }
}


// 湿度设置发送请求的函数
const sendWetRequest = async()=>{
  loading.value=true
  try {
    const response = await sendWet(minWet.value, maxWet.value)
    console.log(response.data)
  } catch (error) {
    console.error('温度设置请求发送失败', error)
  } finally {
    loading.value = false
  }
}

// 光照设置发送请求的函数
const sendSunRequest = async()=>{
  loading.value=true
  try {
    const response = await sendSunray(minSunSliderMin.value)
    console.log(response.data)
  } catch (error) {
    console.error('温度设置请求发送失败', error)
  } finally {
    loading.value = false
  }
}
//发送时间
const sendTimeRequest = async()=>{
  loading.value=true
  try{
    const response = await sendCloseTime(time.value)
    console.log(response)
  }catch(error){
    console.error('时间设置失败',error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
:deep(.el-input-number--small) {
  width: 5rem; 
  margin-left: -10px;
}
.slider-demo-block {
  max-width: 220px;
  display: flex;
  align-items: center;
  margin-top: 260px;
  flex-direction: column; 
  gap: 10px;
  margin-left: 50px;
}
.slider-demo-block.el-slider {
  margin-top: 0;
  margin-left: 5px;
  width: 100%; 
}

.slider-label {
  font-size: 14px;
  margin-bottom: 5px;
  text-align: center;
  width: 100%;
}
h2{
  position: absolute;
  font-size: 24;
  color: #4a4a4a;
  top: 10px;
  left: 10px;
}
.cardContainer {
  display: flex;
  width: 90%;
  height: 100%;
  margin: 10px auto;
  justify-content: space-around;
}

.item {
  position: relative;
  font-size: 16px;
  color: #333;
  width: 320px;
  height: 450px;
  border-radius: 20px;
  background-color: #f0f0f0;
  margin-top: 30px;
  transition: background-size 1s ease;
}
.item:hover{
  background-size: 103% 103%!important;
}
.left-to-right {
  animation: leftToRight 1s ease forwards;
  opacity: 0;
  background-image:url(../assets/img/温度.png);
  background-size: 100% 100%;
}
@keyframes leftToRight {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 从上到下出现的动画 */
.top-to-bottom {
  animation: topToBottom 1s ease 0.3s forwards;
  opacity: 0;
  background-image:url(../assets/img/太阳.png);
  background-size: 100% 100%;
}
@keyframes topToBottom {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
    z-index: 10;
  }
}
.right-to-left {
  animation: rightToLeft 1s ease 0.6s forwards;
  opacity: 0;
  background-image:url(../assets/img/湿度.png);
  background-size: 100% 100%;
}
@keyframes rightToLeft {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.hide-bg {
  background-image: none!important;
}
.card1{
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 15px;
  background-image: linear-gradient(-225deg,#9ff2d8 0%,#ffc6f4 100%);
  top: 40px;
  left: 75px;
  box-shadow: 4px 4px 6px 0px #ccc;
}
.card2{
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 15px;
  background-image: linear-gradient(to top,#bac8d6 0%,#fccbd3 0%,#c9ffbf 100%);
  top: 40px;
  left: 75px;
  box-shadow: 4px 4px 6px 0px #ccc;
}
.card3{
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 15px;
  background-image: linear-gradient(45deg,#bba4f1 0%,#eed9d3 100%);
  top: 40px;
  left: 75px;
  box-shadow: 4px 4px 6px 0px #ccc;
}
.content{
  position: absolute;
  bottom: 30px;
  width: 40px;
  height: 20px;
  left: 15px;
  color: #4a4a4a;
  font-size: 20px;
}
.icon-mianxingwendujitubiao{
  position: absolute;
  right: 10px;
  top: 25px;
}
i{
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transform: scale(1.5);
}
.sun{
  position: absolute;
  left: 100px;
  top: 15px;
}
.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
  display: flex;
  flex-direction: row;
}
.block:last-child {
  border-right: none;
}
:deep(.el-button){
  margin-left: 5px;
}
</style>