<template>
    <Title :text="text" :subtext="subText"/>
    <div class="action">
        <div class="filterAction">
            <el-check-tag :checked="showStatus=='all'?true:false" type="primary" @change="changeAll">全部 {{ tableAllData.length }}</el-check-tag>
            <el-check-tag :checked="showStatus=='approved'?true:false" type="primary" @change="changeDone">已审批{{ tableAllData.filter(ele=>{return ele.status=='通过'}).length }}</el-check-tag>
            <el-check-tag :checked="showStatus=='unapproved'?true:false" type="primary" @change="changeUnDone">未审批{{ tableAllData.filter(ele=>{return ele.status=='待审批'}).length }}</el-check-tag>
        </div>
        <div class="otherAction">
            <el-input
            style="width: 240px;"
            suffix-icon="Search"
            placeholder="search"
            v-model="searchKey"
            />
            <el-button type="success" style="margin: 0 5px 0 10px;">批量审批</el-button>
        </div>
    </div>
    <el-table 
    :data="showData"
     fixed 
     table-layout="fixed"
     style="width: 99.97%;max-height:550px;--el-table-border-color: none;border-right: 1px #143275 solid;border-left: 1px #143275 solid;border-bottom: 1px #143275 solid;"
    :highlight-current-row="false"
    :header-cell-style="{ backgroundColor: '#143275', color: '#ffffff', fontSize: '14px', textAlign: 'center', borderLeft: '0.5px #154480 solid', borderBottom: '1px #154480 solid' }"
    :cell-style="{ color: 'black', fontSize: '14px', textAlign: 'center', borderBottom: '0.5px #143275 solid', borderLeft: '0.5px #143275 solid' }"
    >
        <el-table-column type="selection" :selectable="(row)=>row.status=='待审批'"></el-table-column>
        <el-table-column prop="deviceName" label="门禁名称" fixed="left" />
        <el-table-column prop="userName" label="申请人" />
        <el-table-column prop="time" label="请求时间"/>
        <el-table-column label="状态">
            <template #default="scope">
                <el-tag :type="scope.row.status=='通过'?'success':'warning'">{{scope.row.status}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
            <template #default="scope">
                <div>
                    <el-button>编辑</el-button>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>
    
<script lang='ts' setup name='smartOpening'>
    import { reactive, ref, computed } from 'vue';
    //进行时间格式化
    import dayjs from 'dayjs';
    import Title from './Title.vue';
    const text = '智    能    门    禁'
    const subText = '在此审批用户出行请求'
    //表格信息
    const tableAllData = reactive([
        {
            deviceName: '设备信息',
            userName: '用户信息',
            time: dayjs(new Date()).format('YYYY-MM-DD'),
            status:'通过'
        }
    ])
    let showStatus = ref('all')
    function changeAll() {
        //tableData显示全部内容
        //...
        showStatus.value = 'all'
    }
    function changeDone() {
        //tableData显示已批阅内容
        //...
        showStatus.value = 'approved'
    }
    function changeUnDone() {
        //tableData显示未批阅内容
        //...
        showStatus.value = 'unapproved'
    }
    let tableData = computed(() => {
        //对于tab标签内容的过滤
        return tableAllData.filter(ele => {
            if (showStatus.value == 'all') {
                return true
            } else if (showStatus.value == 'approved') {
                return ele.status =='通过'
            } else if (showStatus.value == 'unapproved') {
                return ele.status =='待审批'
            }
        })
    })
    //搜索内容
    let searchKey = ref('')
    //搜索内容过滤的最后呈现
    let showData = computed(() => {
        return tableData.value.filter(ele => {
            if (searchKey.value == '') {
                return true
            } else {
                for (let key in ele) {
                    if (new RegExp(searchKey.value).test(ele[key])) {
                        return true
                    }
                }
                return false
            }
        })
    })
</script>
    
<style scoped>
.action{
    margin: 20px 0 5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between
}
.filterAction .el-check-tag{
    margin: 5px;
}
</style>