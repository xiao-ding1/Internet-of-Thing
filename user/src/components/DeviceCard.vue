<template>
    <el-card :class="{'active':isOpening}">
      <div class="top">
          <div class="deviceIcon" :class="{'active':isOpening}">
            <!-- 设备图标 -->
            <i :class="`iconfont ${deviceIcon}`"></i>
          </div>
          <div>
                <i class="iconfont icon-mianxingwendujitubiao" v-if="deviceInfo.deviceName==='风扇'"></i>
                <i class="iconfont icon-guangzhaoqiangdu" v-else></i>
                {{num}}&nbsp;
                <el-switch
                    v-model="isOpening"
                    :before-change="Control"
                    :loading="isLoading"
                    active-text="ON"
                    inactive-text="OFF"
                    inline-prompt
                />
        </div>
      </div>
      <div class="card_body">
        <div class="deviceName">{{ deviceInfo.deviceName }}</div>
        <div class="deviceInfo" @click.stop="">
            <span>当前阙值为{{ deviceInfo.currentflag }}</span>&nbsp;
            <el-tooltip placement="bottom" :content="`当前阙值为${deviceInfo.currentflag}，超过阙值则自动开启，点击修改阙值`">
                <el-button size="small" type="primary" @click="openEdit"><el-icon><Edit /></el-icon></el-button>
            </el-tooltip>
        </div>
      </div>
    </el-card>
</template>
    
<script setup name='DeviceCard'>
import { ElInputNumber } from 'element-plus'
import { ref, h, onMounted, computed} from 'vue'
import api from '@/request/index'
import { useStore } from 'vuex'
const store = useStore()
let { device} = defineProps(['device'])
let deviceInfo = ref({
    deviceName: '',
    currentflag: 0,//阙值
    setFlagFn: null,//更新阙值的方法
    controlDeviceFn: null//控制设备的方法
})
let deviceIcon
let isLoading = ref(false)
function Control() {
    isLoading.value = true
    return new Promise((resolve, reject) => {
        if (isOpening.value) {
            //关闭
            deviceInfo.value.controlDeviceFn(0).then(() => {
                //测试代码
                if (device == 'fan') {
                    store.commit('classInfo/setFanStatus',false)
                } else {
                    store.commit('classInfo/setCurtainStatus',false)
                }
                //逻辑处理
                if (isOpening.value == false) {
                    ElMessage.success(device=='fan'?'风扇已关闭':'窗帘已卷起')
                } else {
                    ElMessage.error("操作失败，错误信息：设备未开启")
                }
            }).catch((err) => {
                ElMessage.error(`操作失败，请稍后再试，错误信息${err.message}`)
            }).finally(() => {
                isLoading.value = false
            })
        } else {
            //开启
            deviceInfo.value.controlDeviceFn(1).then((res) => {
                //测试代码
                if (device == 'fan') {
                    store.commit('classInfo/setFanStatus',true)
                } else {
                    store.commit('classInfo/setCurtainStatus',true)
                }
                //逻辑处理
                if (isOpening.value == true) {
                    ElMessage.success(device=='fan'?'风扇已开启':'窗帘已放下')
                } else {
                    ElMessage.error("操作失败，错误信息：设备未开启")
                }
            }).catch((err) => {
                ElMessage.error(`操作失败，请稍后再试，错误信息${err.message}`)
            }).finally(() => {
                isLoading.value = false
            })
        }  
    })
}
function openEdit() {
    let num = ref(1)
    // 修改温度阙值，当超过这个值时教室风扇自动开启
    ElMessageBox({
        title: '修改温度阙值',
        message: () =>
        h(ElInputNumber, {
            modelValue: num.value,
            'onUpdate:modelValue': (val) => {
            num.value = val
            },
            min: 1,
            max: 10,
            'value-on-clear':1//数字选择器被清空后的值
        }),
        showCancelButton:true
    }).then(() => {
        deviceInfo.value.setFlagFn(num.value).then(res => {
            ElMessage({
                type: 'success',
                message: `修改温度阙值成功`,
            })
            deviceInfo.value.currentflag = num.value
        }).catch(err => {
            ElMessage({
                type: 'success',
                message: err.message,
            })
        })
    }).catch((action) => {
       ElMessage({
        type: 'info',
        message: `action: ${action}`,
        })
    })
}
//数据
let num
let isOpening
onMounted(() => {
    if (device === 'fan') {
        deviceInfo.value = {
            ...deviceInfo.value,
            deviceName: '风扇',
            setFlagFn: api.classFn.setFanFlag,
            controlDeviceFn:api.classFn.controlFan
        }
        num = computed(() => store.state.classInfo.temNum+'°')
        isOpening = computed(() => store.state.classInfo.fanStatus)
        console.log("fans",isOpening.value);
        
        deviceIcon = computed(()=>isOpening.value?'icon-a-fengliangzhonggaotianchongyes':'icon-songpaifengxitong')
    } else {
        deviceInfo.value = {
            ...deviceInfo.value,
            deviceName: '窗帘',
            setFlagFn: api.classFn.setCurtainFlag,
            controlDeviceFn:api.classFn.controlCurtain
        }
        num = computed(() => store.state.classInfo.rayNum+'lx')
        isOpening = computed(() => store.state.classInfo.curtainStatus)
        deviceIcon = computed(()=>isOpening.value?'icon-curtain_off':'icon-chuanglian')
    }
}) 
</script>
    
<style scoped>
    .el-card.active{
        background-color: #143275;
        color: #fff;
    }
    .card_body{
        display: flex;
        flex-direction: column;
    }
    .top{
        margin-bottom: 10px;
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .deviceIcon{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        font-size: 30px;
        border-radius: 50%;
        background-color: rgba(84, 112, 198,.2);
        color: #143275;
    }
    .deviceIcon i{
        font-size: inherit;
    }
    .deviceIcon.active{
        background-color: #fff;
        color: #143275;
    }
    .card_body{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex: 1;
    }
    .card_body .deviceName{
        width: 40px;
        height: 100%;
        text-align: center;
        font-weight: 700;
    }
    .card_body .deviceInfo{
        display: flex;
        align-items: center;
        justify-content: end;
    }
    .deviceInfo>div{
        margin-right: 10px;
    }
    .numBtn{
        display: flex;
        flex-direction: column;
    }
    .numBtn>button{
       height: 15px;
       line-height: 12px;
    }
</style>