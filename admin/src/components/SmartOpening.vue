<template>
    <Title :text="text" :subtext="subText"/>
    <div class="action">
        <div class="filterAction">
            <el-check-tag :checked="showStatus=='all'?true:false" type="primary" @change="changeAll">全部 {{ tableAllData.length }}</el-check-tag>
            <el-check-tag :checked="showStatus=='unapproved'?true:false" type="primary" @change="changeUnDone">新的审批信息{{ tableAllData.filter(ele=>{return ele.status=='待审批'}).length }}</el-check-tag>
            <el-check-tag :checked="showStatus=='approved'?true:false" type="primary" @change="changeDone">已审批{{ tableAllData.filter(ele=>{return ele.status=='已通过'}).length }}</el-check-tag>
        </div>
        <div class="otherAction">
            <el-input
            style="width: 240px;"
            suffix-icon="Search"
            placeholder="search"
            v-model="searchKey"
            />
            <!-- <el-button type="success" style="margin: 0 5px 0 10px;" @click="multPass">批量审批</el-button> -->
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
        <!-- <el-table-column prop="userName" label="申请人" /> -->
        <el-table-column prop="time" label="申请时间" />
        <el-table-column label="操作" fixed="right">
            <template #default="scope">
                <el-button @click="passFn" v-if="scope.row.status=='待审批'">审批通过</el-button>
                 <el-tag type="success" v-else>已通过</el-tag>
            </template>
        </el-table-column>
    </el-table>
</template>
    
<script lang='ts' setup name='smartOpening'>
    import dayjs from 'dayjs'
    import {  ref, computed ,watch} from 'vue';
    import Title from './Title.vue';
    import api from '@/request/index'
    import { useStore } from 'vuex';
    const store = useStore()
    const text = '智    能    门    禁'
    const subText = '在此审批用户出行请求'
    //表格信息
    let showStatus = ref('unapproved')
    function changeAll() {
        //tableData显示全部内容
        showStatus.value = 'all'
    }
    function changeDone() {
        //tableData显示已批阅内容
        showStatus.value = 'approved'
    }
    function changeUnDone() {
        //tableData显示未批阅内容
        showStatus.value = 'unapproved'
    }
    let tableData = computed(() => {
        //对于tab标签内容的过滤
        return tableAllData.value.filter(ele => {
            if (showStatus.value == 'all') {
                return true
            } else if (showStatus.value == 'approved') {
                return ele.status =='已通过'
            } else if (showStatus.value == 'unapproved') {
                return ele.status =='待审批'
            }
        })
    })
    const tableAllData = ref([])
    function getTableInfo() {
        api.open.getReservation().then(res => {
        tableAllData.value = []
        const { data } = res.data
        data.forEach(ele => {
            const {updateTime,createTime,approval} = ele
            const newItem = {
                time: updateTime != null ? updateTime : createTime,
                status:approval==0?'待审批':'已通过'
            }
            newItem.time = dayjs(newItem.time).format('YYYY-MM-DD HH:mm:ss')
            tableAllData.value.push(newItem)
        })
    })
    }
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
    //审批通过
    function passFn() {
        api.open.pass().then(() => {
            ElMessage({
                type: "success",
                message:"审批通过"
            })
            store.commit('smartOpeningInfo/clearTableInfo')
        }).catch(err => {
            ElMessage.error(`操作失败，错误信息${err}`)
        })
    }
    watch(store.state.smartOpeningInfo.newMsg,getTableInfo,{immediate:true})
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
.el-table{
    flex: 1;
}
</style>