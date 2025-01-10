<template>
  <Title :text="text" :subtext="subtext"/>
  <Loading :loadingMessage="loadingMessage" v-if="loading"/>
  <div style="margin-bottom: 20px;">
  <el-button type="primary" @click="openDialog">商品信息录入</el-button>
  
  <el-select v-model="queryType" placeholder="选择查询类型" class="query-select" @change="queryStock">
      <el-option label="数量" value="quantity"></el-option>
      <el-option label="未出库" value="in"></el-option>
      <el-option label="已出库" value="out"></el-option>
      <el-option label="全部" value="all"></el-option>
  </el-select>
  <!-- 新增二级搜索框，根据查询类型是否为"quantity"来决定显示与否 -->
  <el-select v-if="queryType === 'quantity'" v-model="secondQueryType" placeholder="选择商品种类" class="query-select" @change="secondQueryStock">
      <el-option v-for="product in uniqueProductNames" :key="product" :label="product" :value="product"></el-option>
  </el-select>
  </div>
  <el-table 
  style="width: 99.97%;height:600px;--el-table-border-color: none;border-right: 1px #143275 solid;border-left: 1px #143275 solid;border-bottom: 1px #143275 solid;"
            :highlight-current-row="false"
            :header-cell-style="{ backgroundColor: '#143275', color: '#ffffff', fontSize: '14px', textAlign: 'center', borderLeft: '0.5px #154480 solid', borderBottom: '1px #154480 solid' }"
            :cell-style="{ color: 'black', fontSize: '14px', textAlign: 'center', borderBottom: '0.5px #143275 solid', borderLeft: '0.5px #143275 solid' }" :data="tableData" border  highlight-current-row>
      <el-table-column prop="outed" label="状态" width="150">
        <template #default="scope">
                <el-tag :type="scope.row.status=='已出库'?'success':'warning'">{{scope.row.status}}</el-tag>
            </template>
      </el-table-column>
      <el-table-column prop="number" label="商品编号" width="180"></el-table-column>
      <el-table-column prop="rfid" label="RFID码" width="180"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="type" label="型号" width="180"></el-table-column>
      <el-table-column prop="inTime" label="入库时间" width="200"></el-table-column>
      <el-table-column prop="inUsername" label="入库操作员" width="200">
      </el-table-column>
      <el-table-column prop="outTime" label="出库时间" width="200"></el-table-column>
      <el-table-column prop="outUsername" label="出库操作员" width="200">
      </el-table-column>
  </el-table>
  <el-dialog title="商品信息录入" v-model="dialogVisible">
    <el-form :model="newProduct" ref="formRef" label-width="90px">
      <el-form-item label="商品编号">
        <el-input v-model="newProduct.number"></el-input>
      </el-form-item>
      <el-form-item label="RFID码">
        <el-input v-model="newProduct.rfid"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="newProduct.name"></el-input>
      </el-form-item>
      <el-form-item label="型号">
        <el-input v-model="newProduct.type"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitProduct">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import Title from './Title.vue';
import { getinfo,getininfo,sendinfo,getcount } from '@/request/modules/storage';
import Loading from './Loading.vue';
const loading = ref(false)//加载状态
// 对话框是否可见
const dialogVisible = ref(false)
// 新商品信息对象
const newProduct = ref({
    rfid: '',
    name: '',
    type: '',
    number: '',
})
// 表格数据
const tableData = ref([])
const templeData = ref([])
// 查询类型
const queryType = ref('')
// 二级查询类型（用于选择商品种类查询数量时）
const secondQueryType = ref('')
// 是否显示标题
const text = '智 能 仓 储'
const subtext = "你想知道的仓储信息都在这"
const uniqueProductNames = ref([])
// 打开商品信息录入对话框
const openDialog = () => {
  dialogVisible.value = true
}
//获取rifd属性
const fetchRifd = async () => {
  try {
  const res = getinfo()
  return res.data.data
  }
  catch {
    console.error('获取rfid相关信息失败：', error)
    return []
  }
}
//提交商品信息录入
const submitProduct = () => {
  //新商品的录入
  sendinfo(newProduct.value)
  const rfidData = fetchRifd()
  const newData = []
  tableData.value.forEach((oldItem, index) => {
      const rfidItem = rfidData[index]
 //合并属性
      const mergedItem = {...oldItem,...rfidItem }
      newData.push(mergedItem)
 })
  tableData.value = newData
  dialogVisible.value = false 
  resetNewProduct()
}

// 重置新商品输入
const resetNewProduct = () => {
  newProduct.value = {
    rfid: '',
    name: '',
    type: '',
    number: '',
  }
}
// 查询库存，一级查询入口，根据不同查询类型处理
const queryStock = () => {
  if (queryType.value === 'quantity') {
    console.log('准备进行二级查询，选择商品种类后查询对应数量')
  } else if (queryType.value === 'in') {
    tableData.value = templeData.value.filter( item => item.status === '未出库')
  } else if (queryType.value === 'out') {
    tableData.value = templeData.value.filter( item => item.status === '已出库')
  }
   else if (queryType.value === 'all') {
    tableData.value = templeData.value
   }
}

// 二级查询库存，根据选择的商品种类查询对应数量
const secondQueryStock = async () => {
  console.log(`执行二级查询，查询商品 ${secondQueryType.value} 的数量`)
  loading.value = true
  try {
       const res = await getcount()
       console.log(res.data.data)
       res.data.data.forEach((item) => {
         if(item.type === `${secondQueryType.value}`){
          ElMessageBox.alert(`商品 ${secondQueryType.value} 的数量为：${item.count}`)
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

const fetchData = async () => {
    try {
        const Info = await getininfo()
        Info.data.data.forEach(item => {
            item.status = item.outed === 0? '未出库' : '已出库'
        })
        return Info.data.data
    } catch (error) {
        console.error('获取仓库物品信息失败：', error)
         return []
    }
}
onMounted( async () => {
  loading.value=false
  try{
  tableData.value = await fetchData()
  templeData.value = [...tableData.value]}
  catch (error) {
    console.error('加载数据失败')
  }
  finally {
  loading.value=true
  }
})
//二级查询的选项生成
watch( tableData, () => {
              const namesSet = new Set()
              tableData.value.forEach(item => {
              namesSet.add(item.type) })
  uniqueProductNames.value = Array.from(namesSet)
}, { immediate: true })

</script>

<style scoped>
.query-select {
  width: 150px;
  margin-left: 5px;
  margin-right: 5px;
}


.dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>