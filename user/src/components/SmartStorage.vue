<template>
  <h1>智能仓储</h1>
  <div class="page">
  <Loading  v-if="loading"/>
  <div class="topChoose">
    <select placeholder="请选择查询类型"v-model="queryType"  @change="queryStock">
      <option>已入库</option>
      <option>已出库</option>
      <option>全部</option>
      <option>数量</option>
    </select>
    <select v-if="queryType === '数量'" placeholder="请选择种类" v-model="selectedKind"  @change="secondQueryStock">
      <option v-for="kind in kinds" :key="kind" :value="kind">{{ kind }}</option>
    </select>
    <div class="search-container">
      <input
        placeholder="请输入查询名称"
        placeholder-class="input-placeholder"
        v-model="searchText" 
      />
      <button @click="doSearch">搜索</button> 
    </div>
  </div>
  <div class="info-container" ref="scrollContainer">
    <span
      v-for="(item, index) in visibleItems"
      :key="item.id"
      class="item-card"
    >
      <h2>名称：{{ item.name }}</h2>
      <h3>型号：{{ item.number }}</h3>
      <h3>种类：{{ item.type }}</h3>
      <h3>状态：{{ item.status }}</h3>
    </span>
  </div>
  </div>
</template>
<script setup>
import { ref, onMounted ,watch} from 'vue';
import { getInfo, getcount } from '../request/modules/storage'
import Loading from './Loading.vue';
const queryType = ref('')
const selectedKind = ref('')
const templeData = ref([])
const kinds = ref([])
const allItems = ref([])
const visibleItems = ref([])
const loading = ref(false)
const searchText = ref('')
//获取商品信息
const getgoodsInfo = async () => {
  try {
    const res = await getInfo ()
    if (res && res.data.msg === 'success'){
      res.data.data.forEach(item => {
            item.status = item.outed === 0? '未出库' : '已出库'
        })
      allItems.value = res.data.data
      templeData.value = [...allItems.value]
      visibleItems.value = allItems.value.slice(0, 10)}
    }
  catch (error) {
    ElMessage({
     message: '获取商品信息失败',
     type: 'error'
   })
  }
}
//一级查询
const queryStock = () => {
   if (queryType.value === '已入库') {
    visibleItems.value = templeData.value.filter( item => item.status === '未出库')
  } else if (queryType.value === '已出库') {
    visibleItems.value = templeData.value.filter( item => item.status === '已出库')
  }
   else if (queryType.value === '全部') {
    visibleItems.value = templeData.value
   }
}

// 二级查询库存，根据选择的商品种类查询对应数量
const secondQueryStock = async () => {
  loading.value = true
  try {
       const res = await getcount()
       console.log(res.data.data)
       res.data.data.forEach((item) => {
         if(item.type === `${selectedKind.value}`){
          ElMessageBox.alert(`商品 ${selectedKind.value} 的数量为：${item.count}`)
          return
         }
       })
  }
  catch (error) {
    console.log('查询失败:',error)
  }
  finally{
    loading.value = false
  }
}
const doSearch = async () => {
  if (searchText.value.trim() === '') {
    ElMessage({
      message: '请输入搜索内容',
      type: 'warning'
    })
    return
  }
  try {
    const filteredItems = allItems.value.filter(item => item.name.includes(searchText.value))
    visibleItems.value = filteredItems
    if (filteredItems.length === 0) {
      ElMessage({
        message: '未找到相关内容',
        type: 'info'
      })
    }
    else {
      ElMessage({
        message: '搜索成功',
        type: 'success'
      })
    }
  } catch (error) {
    ElMessage({
      message: '搜索出现错误',
      type: 'error'
    })
  }
}

onMounted(() => {
  getgoodsInfo()
})

//二级查询的选项生成
watch( allItems, () => {
              const namesSet = new Set()
              allItems.value.forEach(item => {
              namesSet.add(item.type) })
  kinds.value = Array.from(namesSet)
}, { immediate: true })

//当搜索框无内容时，重置visibleItems
watch(searchText, (newVal, oldVal) => {
  if (newVal.trim() === '') {
    visibleItems.value = templeData.value
  }
})
</script>

<style scoped>
.page {
  margin-top: 120px;
}
.topChoose {
  display: flex;
  align-items: center;
  padding: 25px;
  background-color: #1b84df;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  font-size: 20px;
}

select {
  padding: 10px 0px;
  padding-right: 40px;
  border: 1px solid #b9d3e8;
  border-radius: 5px;
  outline: none;
  background-color: white;
  cursor: pointer;
  color: #4a76a8;
  transition: all 0.3s ease;
  font-size: 26px;
}
select option {
  font-size: 10px;
}
select:hover {
  border-color: #78a3d2;
}
.search-container {
  align-items: center;
  width: 400px;
  margin-right:20px;
}

input {
  padding: 12px 15px;
  border: 1px solid #b9d3e8;
  border-radius: 5px;
  outline: none;
  color: #4a76a8;
  font-family: Arial, sans-serif;
  transition: all 0.3s ease;
  font-size: 26px;
  width: 250px;
  margin-left: 20px;
}

input:focus {
  border-color: #78a3d2;
}

.input-placeholder {
  color: #99b4d0;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #78a3d2;
  color: white;
  cursor: pointer;
  margin-left: 10px;
  font-size: 26px;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #5c85b0;
}
.input-placeholder {
  color: #99b4d0;
}
.info-container {
  padding: 30px;
  background-color: rgb(138, 200, 248);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 100%;
 }

h1 {
  margin: 40px 0 20px 0;
      text-align: center;
      transition:2s;
      color: #75a7dc;
      font-size: 60px;
      animation: shadow 2s linear forwards;
      margin-bottom: 40px;
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
h2{
  font-size: 24px;
  color: #4a76a8;
  padding-bottom: 10px;
  margin-left: 5px;
}
h3 {
  font-size: 20px;
  margin-bottom: 12px;
  color: #4a76a8;
  font-weight: 400;
  margin-left: 10px;
  padding-top: 5px;
}

.item-card {
  display: block;
  background-color: #f0f5fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px; 
}

.load-more {
  text-align: center;
  padding: 15px;
  background-color: #e9f1f8;
  border-radius: 8px;
  cursor: pointer;
  color: #4a76a8;
  margin-top: 20px;
}
</style>