<template>
  <Title :text="text" :subtext="subtext"/>
  <div style="margin-bottom: 20px;">
  <el-button type="primary" @click="openDialog">商品信息录入</el-button>
  
  <el-select v-model="queryType" placeholder="选择查询类型" class="query-select" @change="queryStock">
      <el-option label="查询数量" value="quantity"></el-option>
      <el-option label="查询入库" value="in"></el-option>
      <el-option label="查询出库" value="out"></el-option>
  </el-select>
  <!-- 新增二级搜索框，根据查询类型是否为"quantity"来决定显示与否 -->
  <el-select v-if="queryType === 'quantity'" v-model="secondQueryType" placeholder="选择商品种类" class="query-select" @change="secondQueryStock">
      <el-option v-for="product in uniqueProductNames" :key="product" :label="product" :value="product"></el-option>
  </el-select>
  <el-button type="success" @click="performStockOperation('in')">入库</el-button>
  <el-button type="warning" @click="performStockOperation('out')">出库</el-button>
  <el-select placeholder="请选择设备" class="query-select"></el-select>
  </div>
  <el-table 
  style="width: 99.97%;height:550px;--el-table-border-color: none;border-right: 1px #143275 solid;border-left: 1px #143275 solid;border-bottom: 1px #143275 solid;"
            :highlight-current-row="false"
            :header-cell-style="{ backgroundColor: '#143275', color: '#ffffff', fontSize: '14px', textAlign: 'center', borderLeft: '0.5px #154480 solid', borderBottom: '1px #154480 solid' }"
            :cell-style="{ color: 'black', fontSize: '14px', textAlign: 'center', borderBottom: '0.5px #143275 solid', borderLeft: '0.5px #143275 solid' }" :data="tableData" border @selection-change="handleSelectionChange" highlight-current-row>
      <el-table-column type="selection" width="55"></el-table-column> 
      <el-table-column prop="productId" label="商品编号" width="180"></el-table-column>
      <el-table-column prop="rfid" label="RFID码" width="180"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="model" label="型号" width="180"></el-table-column>
      <el-table-column prop="inDate" label="入库时间" width="200"></el-table-column>
      <el-table-column prop="inOperator" label="入库操作员代码" width="200">
        <template v-slot="scope">
          <el-button @click="showUserDetails(scope.row.timeId)">点击查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="outDate" label="出库时间" width="200"></el-table-column>
      <el-table-column prop="outOperator" label="出库操作员代码" width="200">
        <template v-slot="scope">
          <el-button @click="showUserDetails(scope.row.timeId)">点击查看详情</el-button>
        </template>
      </el-table-column>
  </el-table>
  <el-dialog title="商品信息录入" v-model="dialogVisible">
    <el-form :model="newProduct" ref="formRef" label-width="120px">
      <el-form-item label="商品编号">
        <el-input v-model="newProduct.productId"></el-input>
      </el-form-item>
      <el-form-item label="RFID码">
        <el-input v-model="newProduct.rfid"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="newProduct.name"></el-input>
      </el-form-item>
      <el-form-item label="型号">
        <el-input v-model="newProduct.model"></el-input>
      </el-form-item>
      <el-form-item label="入库时间">
        <el-date-picker v-model="newProduct.inDate" type="date" placeholder="选择入库时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="入库操作员代码">
        <el-input v-model="newProduct.inOperator"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitProduct">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import Title from './Title.vue';

// 对话框是否可见
const dialogVisible = ref(false)
// 新商品信息对象
const newProduct = ref({
  productId: '',
  rfid: '',
  name: '',
  model: '',
  inDate: '',
  inOperator: ''
})

// 表格数据
const tableData = ref([  {
    productId: '001',
    rfid: 'RFID001',
    name: '产品 A',
    model: '型号 A',
    inDate: '2023-01-01',
    outDate: '2023-01-10',
  },
  {
    productId: '001',
    rfid: 'RFID001',
    name: '产品 A',
    model: '型号 A',
    inDate: '2023-01-01',
    outDate: '2023-01-10',
  },
  {
    productId: '001',
    rfid: 'RFID001',
    name: '产品 A',
    model: '型号 A',
    inDate: '2023-01-01',
    outDate: '2023-01-10',
  },
  {
    productId: '001',
    rfid: 'RFID001',
    name: '产品 A',
    model: '型号 A',
    inDate: '2023-01-01',
    outDate: '2023-01-10',
  },

  {
    productId: '001',
    rfid: 'RFID001',
    name: '产品 A',
    model: '型号 A',
    inDate: '2023-01-01',
    outDate: '2023-01-10',
  },
  {
    productId: '001',
    rfid: 'RFID001',
    name: '产品 A',
    model: '型号 A',
    inDate: '2023-01-01',
    outDate: '2023-01-10',
  },
  {
    productId: '001',
    rfid: 'RFID001',
    name: '产品 A',
    model: '型号 A',
    inDate: '2023-01-01',
    outDate: '2023-01-10',
  },
  {
    productId: '001',
    rfid: 'RFID001',
    name: '产品 A',
    model: '型号 A',
    inDate: '2023-01-01',
    outDate: '2023-01-10',
  },
  {
    productId: '001',
    rfid: 'RFID001',
    name: '产品 A',
    model: '型号 A',
    inDate: '2023-01-01',
    outDate: '2023-01-10',
  },
  {
    productId: '001',
    rfid: 'RFID001',
    name: '产品 A',
    model: '型号 A',
    inDate: '2023-01-01',
    outDate: '2023-01-10',
  },

  {
    productId: '001',
    rfid: 'RFID001',
    name: '产品 A',
    model: '型号 A',
    inDate: '2023-01-01',
    outDate: '2023-01-10',
  },
  {
    productId: '001',
    rfid: 'RFID001',
    name: '产品 A',
    model: '型号 A',
    inDate: '2023-01-01',
    outDate: '2023-01-10',
  },

  {
    productId: '001',
    rfid: 'RFID001',
    name: '产品 A',
    model: '型号 A',
    inDate: '2023-01-01',
    outDate: '2023-01-10',
  },{
    productId: '001',
    rfid: 'RFID001',
    name: '产品 A',
    model: '型号 A',
    inDate: '2023-01-01',
    outDate: '2023-01-10',
  },])
// 选中的行数据
const selectedRows = ref([])
// 查询类型
const queryType = ref('')
// 二级查询类型（用于选择商品种类查询数量时）
const secondQueryType = ref('')
// 是否显示标题
const text = '智 能 仓 储'
const subtext = "你想知道的仓储信息都在这"

// 打开商品信息录入对话框
const openDialog = () => {
  dialogVisible.value = true
}

// 提交商品信息录入
const submitProduct = () => {
  // 处理新商品的录入
  tableData.value.push({...newProduct.value })
  dialogVisible.value = false 
  resetNewProduct() // 重置
}

// 重置新商品输入
const resetNewProduct = () => {
  newProduct.value = {
    productId: '',
    rfid: '',
    name: '',
    model: '',
    inDate: '',
    inOperator: ''
  }
}

// 查询库存，一级查询入口，根据不同查询类型处理
const queryStock = () => {
  console.log(`执行查询: ${queryType.value}`)
  if (queryType.value === 'quantity') {
    // 当选择查询数量时，准备二级查询相关数据等（这里先简单打印示意）
    console.log('准备进行二级查询，选择商品种类后查询对应数量')
  } else if (queryType.value === 'in') {
    // 这里添加真正的查询入库逻辑
    console.log('执行查询入库逻辑')
  } else if (queryType.value === 'out') {
    // 这里添加真正的查询出库逻辑
    console.log('执行查询出库逻辑')
  }
}

// 二级查询库存，根据选择的商品种类查询对应数量
const secondQueryStock = () => {
  console.log(`执行二级查询，查询商品 ${secondQueryType.value} 的数量`)
  // 在这里添加具体的根据商品种类查询数量的逻辑，例如遍历tableData查找对应商品并统计数量等
  let count = 0;
  tableData.value.forEach(item => {
    if (item.name === secondQueryType.value) {
      count++;
    }
  });
  ElMessageBox.alert(`商品 ${secondQueryType.value} 的数量为：${count}`)
}

// 处理选择变化
const handleSelectionChange = (val) => {
  selectedRows.value = val
}

// 执行入库或出库操作
const performStockOperation = (operationType) => {
  if (selectedRows.value.length === 0) {
    ElMessageBox.alert("请选择要商品进行操作")
    return
  }

  selectedRows.value.forEach(row => {
    if (operationType === 'in') {
      ElMessageBox.alert( `入库操作：商品编号 ${row.productId} 已入库`)
    } else if (operationType === 'out') {
      ElMessageBox.alert(`出库操作：商品编号 ${row.productId} 已出库`,)
      // 添加出库逻辑
    }
  })

  selectedRows.value = []// 清空已选择的行
}

// 提取商品名称列表，用于二级查询的选项生成（这里简单从已有数据中提取名称列表，可根据实际情况调整数据源等）
const uniqueProductNames = ref([])
watch(tableData, () => {
  const namesSet = new Set();
  tableData.value.forEach(item => {
    namesSet.add(item.name);
  });
  uniqueProductNames.value = Array.from(namesSet);
}, { immediate: true })
</script>

<style scoped>
.query-select {
  width: 150px;
  margin-left: 5px;
  margin-right: 5px;
}

.action-buttons {
  margin-top: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>