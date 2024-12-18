<template>
  <h1>智能仓储</h1>
  <div class="topChoose">
    <select placeholder="请选择查询类型"v-model="queryType">
      <option>已入库</option>
      <option>已出库</option>
      <option>数量</option>
    </select>
    <select v-if="queryType === '数量'" placeholder="请选择种类" v-model="selectedKind">
      <option v-for="kind in kinds" :key="kind" :value="kind">{{ kind }}</option>
    </select>
    <input
      placeholder="请输入查询名称"
      placeholder-class="input-placeholder"
    />
  </div>
  <div class="info-container" ref="scrollContainer">
    <span
      v-for="(item, index) in visibleItems"
      :key="item.id"
      class="item-card"
    >
      <h2>名称：{{ item.name }}</h2>
      <h3>型号：{{ item.id }}</h3>
      <h3>种类：{{ item.model }}</h3>
      <h3>数量: {{ item.number }}</h3>
      <h3>状态：{{ item.status }}</h3>
    </span>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const queryType = ref('')
const selectedKind = ref('')
const kinds = ref(['种类1', '种类2', '种类3'])
const allItems = ref([
  {
    name: '物品1',
    id: '001',
    model: 'ModelA',
    number: 10,
    status: '已入库'
  },
  {
    name: '物品2',
    id: '002',
    model: 'ModelB',
    number: 5,
    status: '已出库'
  }
  ,
  {
    name: '物品2',
    id: '002',
    model: 'ModelB',
    number: 5,
    status: '已出库'
  }
  ,
  {
    name: '物品2',
    id: '002',
    model: 'ModelB',
    number: 5,
    status: '已出库'
  }

])
const visibleItems = ref(allItems.value.slice(0, 10))
const isLoading = ref(false)
const hasMore = ref(allItems.value.length > visibleItems.value.length)
const scrollContainer = ref(null)

// 滚动到容器底部来触发加载更多
const handleScroll = () => {
  if (isLoading.value ||!hasMore.value) return;
  const container = scrollContainer.value;
  if (container) {
    const { scrollTop, clientHeight, scrollHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      //触发加载更多
      loadMoreData()
    }
  }
}

onMounted(() => {
  const container = scrollContainer.value
  if (container) {
    container.addEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
body {
  background-color: #f0f5fa;
}
.topChoose {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  background-color: #e9f1f8;
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
input {
  flex: 1;
  padding: 15px 15px;
  border: 1px solid #b9d3e8;
  border-radius: 5px;
  outline: none;
  margin-left: 15px;
  color: #4a76a8;
  font-family: Arial, sans-serif;
  transition: all 0.3s ease;
  font-size: 26px;
  width: 10px;
}

input:focus {
  border-color: #78a3d2;
}

.input-placeholder {
  color: #99b4d0;
}
.info-container {
  padding: 30px;
  background-color: white;
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