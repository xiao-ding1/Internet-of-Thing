<template>
    <Title :text="text" :subtext="subtext"/>
    <el-container>
        <el-main>
            <div class="tableBox">
                <div class="action">
                    <el-button style="background-color: #143275;color: #fff;">新增学生信息</el-button>
                    <div class="other_action">
                         <el-input
                        style="width: 240px;"
                        suffix-icon="Search"
                        placeholder="search"
                        v-model="searchKey"
                        />
                        <el-button type="success" style="margin: 0 5px 0 10px;">批量删除</el-button>
                    </div>
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
                    <el-table-column type="selection" />
                    <el-table-column prop="name" label="学生名" />
                    <el-table-column prop="phone" label="手机号" />
                    <el-table-column prop="status" label="签到状态" >
                        <template #default="scope">
                            <el-tag :type="scope.row.status=='已签到'?'success':'warning'">{{scope.row.status}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template #default="scope">
                            <div>
                                <el-button>编辑</el-button>
                                <el-button>删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
        <el-aside width="300px">
            <div class="people">
                <div class="infoTitle">签到情况</div>
                <div ref="peopleCharts" class="peopleCharts"></div>
            </div>
            <div class="device">
                <DeviceCard/>
                <DeviceCard/>
            </div>
        </el-aside>
    </el-container>
</template>
    
<script lang='ts' setup name=''>
import {onMounted, reactive, ref,computed} from 'vue'
import Title from './Title.vue';
const text = '智    能    教    室'
const subtext = '用科技帮助学生实现高效学习'
//对于表格
let searchKey = ref('')
let tableData = ref([
    {
        name: '学生1',
        phone: '电话1',
        status:'已签到'
    }
    
])
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

//图表
let peopleCharts = ref()
import * as echarts from 'echarts'
onMounted(() => {
    let chart1 = echarts.init(peopleCharts.value)
    let baseOption = {
    color: [
        'rgba(20, 50, 117,.3)',
        'rgba(20, 50, 117)'
    ],
    tooltip: {
        trigger:'item'
    },
    //图例组件，标识哪个颜色是哪个模块的组件
    legend: {
        top: '5%',
        left:'center'
    },
    series: [
        {
            type: "pie",
            radius: ["40%", "70%"],//修改内外半径
            // 初始不显示标签文字
            label: {
                show: false ,
                position:'center'
            },
            // 不显示连接线
            labelLine: { show: false },
            data: [
            { value: 50, name: "未签到" },
            { value: 50, name: "已签到" },
            ],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth:2
            },
            emphasis:{
                label: {
                    show: true,
                    fontSize: 30,
                    fontWeight:'bold'
                }
            }
        }
    ]
}
    chart1.setOption(baseOption)
    window.addEventListener('resize', function () {
        chart1.resize()
    })
})

//对于风扇和空调设备
import DeviceCard from './DeviceCard.vue'






</script>
    
<style scoped>
    .el-container{
        width: 100%;
        flex: 1;
    }
    .el-main{
        height: 100%;
    }
    .action{
        display: flex;
        justify-content: space-between;
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