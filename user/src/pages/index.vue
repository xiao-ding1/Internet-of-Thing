<template>
  <div :style="{animationName:isMenuShow?'menuShow':'menuHid'}" class="menuPage">
    <div class="closeMenu" @click="hidMenu"><el-icon><CloseBold /></el-icon></div>
    <nav class="menu">
      <div class="ring">
        <i style="--clr:#00ff0a;"></i>
        <i style="--clr:#ff0057;"></i>
        <i style="--clr:#fffd44;"></i>
      <input type="checkbox" v-model="isMenuOpen" class="menu-toggler" id="menu_toggler"/>
         <label for="menu_toggler"></label>
      </div>
      <ul>
        <li>
          <span  class="menu-item" v-for="(item, index) in menuItems" :key="index" @click="navigateToComponent(index)"></span>
        </li>
      </ul>
    </nav>
  </div>
  <div class="content">
    <button  class="backMenu" @click="openMenu"><el-icon><ArrowLeft /></el-icon></button>
    <RouterView/>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// 定义响应式数据，用于控制菜单是否展开
const isMenuOpen = ref(false)
const isMenuShow = ref(true)
function openMenu() {
  isMenuShow.value = true
}
function hidMenu() {
  isMenuShow.value = false
}
const menuItems = ref([
  { imageSrc: '../assets/img/太阳.png' },
  { imageSrc: '../assets/img/太阳.png' },
  { imageSrc: '../../assets/img/太阳.png' },
  { imageSrc: '../../assets/img/太阳.png' },
  { imageSrc: '../../assets/img/太阳.png' },
  { imageSrc: '../../assets/img/太阳.png' },
  { imageSrc: '../../assets/img/太阳.png' },
])
const router = useRouter()
const navigateToComponent = (index) => {
  const routeNames = ['/blue', '/smartOpen', '/smartClass','smartFarm','smartStorage','lampControl']
  const routeName = routeNames[index]
  if (routeName) {
    router.replace({ path: routeName })
    isMenuShow.value = false
  }
}

// 根据菜单展开状态设置菜单项的样式相关逻辑（旋转和位移等）
const setMenuItemStyles = () => {
  const rotations =[0, 51.43, 102.86, 154.29, 205.71, 257.14, 308.57]
  menuItems.value.forEach((_, index) => {
    const rotation = rotations[index];
    const translateXValue = -110;
    const menuItem = document.querySelector(`.menu-item:nth-child(${index + 1})`);
    if (menuItem) {
      if (isMenuOpen.value) {
        menuItem.style.opacity = '1';
        menuItem.style.transform = `rotate(${rotation}deg) translateX(${translateXValue}px)`;
      } else {
        menuItem.style.opacity = '0';
        menuItem.style.transform = '';
      }
    }
  })
}
watch(isMenuOpen, () => {
  setMenuItemStyles()
})

onMounted(() => {
  setMenuItemStyles()
})
</script>

<style>
.content{
  width:100vw;
  height: 100vh;}
.menuPage{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(0);
  transition: 1s;
  width: 100vw;
  height: 100vh;
  background-color: #1709b1;
  animation: menuShow 1s linear forwards;
}
.closeMenu{
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 50px;
}
.backMenu{
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(0,0,0,.1);
  font-size: 40px;
}
@keyframes menuShow {
  100%{
    transform: translateX(0);
  }
}
@keyframes menuHid {
  100%{
    transform: translateX(-100vw);
  }
}
.menu {
  width: 500px; 
  height: 500px; 
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.menu-toggler {
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100px; /* 适当增大宽度 */
  height: 120px; /* 适当增大高度 */
  z-index: 2;
  opacity: 0;
  cursor: pointer;
}

.menu-toggler:hover + label,
.menu-toggler:hover + label::before,
.menu-toggler:hover + label::after {
  background: rgb(255, 0, 191);
}

.menu-toggler:checked + label {
  background: transparent;
}

.menu-toggler:checked + label::before,
.menu-toggler:checked + label::after {
  top: 0;
  width: 80px; /* 宽度随元素增大而调整 */
  transform-origin: 50% 50%;
}

.menu-toggler:checked + label::before {
  transform: rotate(45deg);
}

.menu-toggler:checked + label::after {
  transform: rotate(-45deg);
}

.menu-toggler:checked ~ ul.menu-item {
  opacity: 1;
}

.menu-toggler + label {
  width: 100px; /* 宽度随元素增大而调整 */
  height: 16px; /* 适当增大高度 */
  display: block;
  z-index: 1;
  border-radius: 4px; /* 适当增大圆角 */
  background: rgba(61, 21, 240, 0.7);
  transition: transform 0.5s, top 0.5s;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.menu-toggler + label::before,
.menu-toggler + label::after {
  width: 60px; /* 宽度随元素增大而调整 */
  height: 8px; /* 适当增大高度 */
  display: block;
  z-index: 1;
  border-radius: 4px; /* 适当增大圆角 */
  background: rgba(248, 91, 91, 0.7);
  transition: transform 0.5s, top 0.5s;
  content: "";
  position: absolute;
  left: 0;
}

.menu-toggler + label::before {
  top: 30px; /* 适当调整位置 */
}

.menu-toggler + label::after {
  top: -30px; /* 适当调整位置 */
}

.menu-item {
  position: absolute;
  display: block;
  top: -50px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 150px; 
  height: 150px;
  opacity: 0;
  transition: 0.5s;
  background-color: aqua;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
}

.menu-item:nth-child(1) {
  top: -120px;
  left: -230px;
  background-image: url('../assets/img/太阳.png');
}
.menu-item:nth-child(2) {
  top: -250px;
  left: -50px;
  background-image: url('../assets/img/太阳.png');
}
.menu-item:nth-child(3) {
  top: -210px;
  left: 180px;
  background-image: url('../../assets/img/太阳.png');
}
.menu-item:nth-child(4) {
  top: 0px;
  left: 250px;
  background-image: url('../../assets/img/太阳.png');
}
.menu-item:nth-child(5) {
  top: 180px;
  left: 150px;
  background-image: url('../../assets/img/太阳.png');
}
.menu-item:nth-child(6) {
  top: 210px;
  left: -55px;
  background-image: url('../../assets/img/太阳.png');
}
.menu-item:nth-child(7) {
  top: 80px;
  left: -190px;
  background-image: url('../../assets/img/太阳.png');
}
.ring i{
  position:absolute;
  border:  2px solid black;
  inset: 0;
  transition:  all 0.5s;

}
.ring i:nth-child(1){
  animation: animate 10s linear infinite;
  border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
}
.ring i:nth-child(2){
  border-radius: 41% 44% 56% 59% / 38% 62% 63% 37%;
  animation: animate 4s linear infinite;
}
.ring i:nth-child(3){
  border-radius: 41% 44% 56% 68% / 38% 62% 63% 37%;
  animation: animate 6s linear infinite;
}
.ring i{
  border:6px solid var(--clr);
  filter:drop-shadow(0 0 20px var(--clr))
}
@keyframes animate {
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>