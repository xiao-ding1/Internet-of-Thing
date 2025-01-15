<template>
    <Title :text="text" :subtext="subText"/>
    <div class="action">
        <div class="filterAction">
            <el-check-tag type="primary" checked>新的待审批信息{{ tableData.filter(ele=>{return ele.status=='待审批'}).length }}</el-check-tag>
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
        <el-table-column prop="userName" label="申请人" />
        <el-table-column label="操作" fixed="right">
            <template #default="scope">
                <el-button @click="passFn">审批通过</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
    
<script lang='ts' setup name='smartOpening'>
    import {  ref, computed } from 'vue';
    import Title from './Title.vue';
    import { pass } from '@/request/modules/lock';
    import { useStore } from 'vuex';
    const store = useStore()
    const text = '智    能    门    禁'
    const subText = '在此审批用户出行请求'
    //表格信息
    const tableData = computed(()=>store.state.smartOpeningInfo.tableInfo)
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
        pass().then(() => {
            ElMessage({
                type: "success",
                message:"审批通过"
            })
            store.commit('smartOpening/clearTableInfo')
        }).catch(err => {
            ElMessage.error(`操作失败，错误信息${err}`)
        })
    }
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