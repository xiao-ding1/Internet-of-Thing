<template>
    <div class="introBox">
        <h1>智能教室</h1>
        <el-button class="appointBtn">签到 / 离开教室</el-button>
    </div>
    <div class="nowStatus">
      当前状态
    </div>
    <div class="subText">窗帘和风扇情况</div>
    <div class="controlCard">
      <DeviceCard/>
      <DeviceCard/>
    </div>
</template>
    
<script lang='ts' setup name=''>
    import DeviceCard from './DeviceCard.vue';
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
    .nowStatus{
      margin-bottom: 100px;
      width: 100vw;
      height: 800px;
      background-color: pink;
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