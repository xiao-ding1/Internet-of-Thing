<template>
    <el-card class="" 
      :class="isOpening ?'active':''" 
      @click="Control"
      :style="{'cursor':isLoading?'not-allowed':'pointer'}"
    >
      <div class="top">
          <div class="deviceIcon" :class="isOpening?'active':''">
            <i class="iconfont icon-songpaifengxitong"></i>
          </div>
          <el-switch
              v-model="isOpening"
              @change="Control"
              inline-prompt
              active-text="ON"
              inactive-text="OFF"
              :loading="isLoading"
          />
      </div>
      <div class="card_body">
        <div class="deviceName">风扇</div>
        <div class="deviceInfo" @click.stop="">
            <div><i class="iconfont icon-mianxingwendujitubiao"></i>20°</div>
            <!-- <div> -->
            <div>
                <el-tooltip placement="bottom" v-if="isAuto">
                    <template #content>当前阙值为1<br/>超过则自动开启</template>
                    <el-tag>自动</el-tag>
                </el-tooltip>
                <el-tooltip placement="bottom" v-else>
                    <template #content>当前为手动方式<br/></template>
                    <el-tag>手动</el-tag>
                </el-tooltip>
            </div>
            <el-tag type="success" @click="changeMode">切换</el-tag>
            <!-- </div> -->
        </div>
      </div>
    </el-card>
</template>
    
<script lang='ts' setup name='DeviceCard'>
import {ref} from 'vue'
let isOpening = ref(false)
let isLoading =ref(false)
function Control() {
    if (!isLoading.value) {
        //远程控制打开还是关闭
        isLoading.value = true
        if (isOpening.value) {
        //关闭
        //发请求
        } else {
            //打开
            //发请求
        }
        isLoading.value = false
        isOpening.value = !isOpening.value
    }
    isAuto.value =false
}
let isAuto = ref(true)
function changeMode() {
    isAuto.value = !isAuto.value
    //改变模式
}
    
</script>
    
<style scoped>
.el-card.active{
    background-color: #143275;
    color: #fff;
}
    .card_body{
        display: flex;
        flex-direction: column;
    }
    .top{
        margin-bottom: 10px;
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .deviceIcon{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        font-size: 30px;
        border-radius: 50%;
        background-color: rgba(84, 112, 198,.2);
        color: #143275;
    }
    .deviceIcon.active{
        background-color: #fff;
        color: #143275;
    }
    .card_body{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex: 1;
    }
    .card_body .deviceName{
        width: 40px;
        height: 100%;
        text-align: center;
        font-weight: 700;
    }
    .card_body .deviceInfo{
        display: flex;
        align-items: center;
    }
    .deviceInfo>div{
        margin-right: 10px;
    }
</style>