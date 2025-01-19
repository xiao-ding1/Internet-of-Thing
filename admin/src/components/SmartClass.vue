<template>
    <Title :text="text" :subtext="subtext"/>
    <el-container>
        <el-main>
            <div class="tableBox">
                <div class="tableHeader">
                    <div class="infoTitle">签到情况</div>
                    <el-input
                        style="width: 240px;"
                        suffix-icon="Search"
                        placeholder="search"
                        v-model="searchKey"
                    />
                </div>
                <el-table 
                :data="showData"
                fixed 
                table-layout="fixed"
                style="flex: 1; height:100% ;width: 99.97%;--el-table-border-color: none;border-right: 1px #143275 solid;border-left: 1px #143275 solid;border-bottom: 1px #143275 solid;"
                :highlight-current-row="false"
                :header-cell-style="{ backgroundColor: '#143275', color: '#ffffff', fontSize: '14px', textAlign: 'center', borderLeft: '0.5px #154480 solid', borderBottom: '1px #154480 solid' }"
                :cell-style="{ color: 'black', fontSize: '14px', textAlign: 'center', borderBottom: '0.5px #143275 solid', borderLeft: '0.5px #143275 solid' }"
                >
                    <el-table-column type="selection"/>
                    <el-table-column prop="startTime" label="签到时间"/>
                    <el-table-column prop="endTime" label="签退时间"/>
                    <el-table-column prop="totalTime" label="总时长"/>
                </el-table>
            </div>
        </el-main>
        <el-aside width="300px">
            <div class="people">
                <div class="infoTitle">签到情况</div>
                 <el-result :icon="isSignIn=='未签到'?'error':'success'" :title="isSignIn"></el-result>
            </div>
            <div class="device">
                <DeviceCard device="fan"/>
                <DeviceCard device="curtain"/>
            </div>
        </el-aside>
    </el-container>
</template>
    
<script setup name='SmartClass'>
import { ref, computed, onMounted,watch } from 'vue'
import { useStore } from 'vuex'
import api from '../request/index'
import Title from './Title.vue'
import dayjs from 'dayjs'
const text = '智    能    教    室'
const subtext = '用科技帮助学生实现高效学习'

//对于数据
const store = useStore()
let searchKey = ref('')
let tableData = ref([])
let isSignIn = ref('未签到')
function getTableData() {
    api.classFn.getSignInfo().then(res => {
        tableData.value = []
        const { data } = res.data
        const nowDay = dayjs(new Date()).format('YYYY-MM-DD')
        data.forEach(ele => {
            const { inTime, outTime } = ele
            const item = {
                startTime: dayjs(inTime).format('YYYY-MM-DD HH:mm:ss'),
                endTime: '—',
                totalTime:'—'
            }
            //判断是否有今日签到
            if (nowDay == dayjs(item.startTime).format('YYYY-MM-DD')) {
                if (outTime == null) {
                    isSignIn.value = '已签到'
                } else {
                    isSignIn.value = '今日已完成签到'
                }
            }
            if (outTime != null) {
                const timeDif = new Date(new Date(outTime).getTime() - new Date(inTime).getTime())
                const hour = timeDif.getHours() - 8
                const min = timeDif.getMinutes()
                const scond = timeDif.getSeconds()
                let totalTime = ''
                totalTime += hour ? `${hour}小时` : ''
                totalTime += min ? `${min}分钟` : ''
                totalTime += scond ? `${scond}秒` : ''
                item.endTime = dayjs(outTime).format('YYYY-MM-DD HH:mm:ss')
                item.totalTime = totalTime
            }
            tableData.value.push(item)
        })
    })
}
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

watch(store.state.classInfo.isSignIn,getTableData,{immediate:true})

onMounted(() => {
    api.getSwitch(2)//窗帘
    api.getSwitch(3)//风扇
})
</script>
    
<style scoped>
    .el-container{
        width: 100%;
        flex: 1;
    }
    .el-main{
        height: 100%;
    }
    .tableHeader{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    .tableBox{
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .el-aside{
        height: 100%;
        overflow: hidden;
    }
    .el-aside>div{
        margin: 10px;
        height: calc(50% - 20px);
        width: calc(100% - 20px);
    }
    .people{
        display: flex;
        flex-direction: column;
    }
    .infoTitle{
        padding-left: 10px;
        border-left: 5px solid #5c7bd9;
    }
    .peopleCharts{
        flex: 1;
    }
    .device>div{
        margin-top: 10px;
        height: 50%;
        border-radius: 5%;
    }
    .device>.active{
        background-color: #143275;
        color: #fff;
    }
</style>