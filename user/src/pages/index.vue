<template>
  <div class="page">
    <el-menu
    default-active="0"
    class="menu"
    @open="changeTab"
    :unique-opened="true"
  >
      <el-menu-item v-for="(item,index) in menuList" :index="String(index)">
          <span>{{ item.name }}</span>
          <el-icon><ArrowRight/></el-icon>
      </el-menu-item>
    </el-menu>
    <div class="cover" v-if="isshowMenu" @click="FoldMenu"></div>
    <div class="main_container">
      <el-page-header @back="goBack">
      </el-page-header>
      <h1>{{ title }}</h1>
      <RouterView  style="flex: 1;"/>
    </div>
  </div>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { RouterView, useRouter } from 'vue-router'
import { ref } from 'vue';
let isshowMenu = ref(true)
const router = useRouter()
let title = ref('')
let menuList = [
  {
    name: '蓝牙开门',
    path: '/blue',
    icon:'icon-menu'
  }, {
    name: '网络控灯',
    path: '/xxx',
  }, {
    name: '智能门禁',
    path:'smartOpen'
  },
  {
    name: '智能存储',
    path:'/xxx'
  },
  {
    name: '智能教室',
    path:'/SmartClass'
  },
  {
    name: '智慧农场',
    path:'/xxx'
  }
]
function changeTab(key) {
  if (key) {
    router.replace(menuList[Number(key)].path)
    title.value = menuList[Number(key)].name
    FoldMenu()
  }
}
function FoldMenu(e) {
  document.querySelector('.menu').style.animation = 'foldMenu 0.8s linear forwards'
  isshowMenu.value = false
}
function goBack() {
  //展开菜单
  document.querySelector('.menu').style.animationName = 'unfoldMenu'
  isshowMenu.value = true
}
</script>

<style>
.page{
  display: flex;
  width: 100%;
  height: 100vh;
}
.menu{
  position: absolute;
  z-index: 100;
  width: 200px;
  height: 100vh;
  transition: 0.8s;
}
.el-menu-item{
  padding: 20px 15px;
  display: flex;
  justify-content: space-between;
}
.cover{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  background-color: transparent;
}
.main_container{
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.main_container h1{
 margin-bottom: 50px;
}
.el-page-header{
  margin-bottom: 20px;
}
/* 展开折叠菜单 */
@keyframes foldMenu{
  100%{
    transform: translateX(-220px);
  }
}
@keyframes unfoldMenu{
  100%{
    transform: translateX(0px);
  }
}
</style>
