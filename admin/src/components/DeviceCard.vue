<template>
    <el-card class="" 
      :class="isOpening ?'active':''" 
    >
      <div class="top">
          <div class="deviceIcon" :class="isOpening?'active':''">
            <!-- 设备图标 -->
            <i :class="`iconfont ${deviceIcon}`"></i>
          </div>
          <div>
                <i class="iconfont icon-mianxingwendujitubiao" v-if="deviceInfo.deviceName==='风扇'"></i>
                <i class="iconfont icon-guangzhaoqiangdu" v-else></i>
                {{ deviceInfo.currentNum }}&nbsp;
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
            <el-button-group>
                <el-button size="small" :type="isAuto?'info':'primary'" @click="changeMode('manual')">手动</el-button>
                <el-tooltip placement="bottom" :content="`当前阙值为${deviceInfo.currentflag}，是否要调至自动挡？`" :disabled="isAuto">
                    <el-button size="small" :type="isAuto?'primary':'info'" @click="changeMode('auto')">自动</el-button>
                </el-tooltip>
                <el-tooltip placement="bottom" :content="`当前为自动挡，阙值为${deviceInfo.currentflag}，超过自动开启，点击修改阙值`">
                    <el-button v-if="isAuto" size="small" type="primary" @click="openEdit"><el-icon><Edit /></el-icon></el-button>
                </el-tooltip>
            </el-button-group>
        </div>
      </div>
    </el-card>
</template>
    
<script setup name='DeviceCard'>
import { ElInputNumber } from 'element-plus'
import { ref, h, onMounted, computed} from 'vue'
import { setFanFlag, setCurtainFlag, controlFan, controlCurtain } from '@/request/modules/class'
let { device } = defineProps(['device'])
let deviceInfo = ref({
    deviceName: '',
    currentflag: 0,//阙值
    currentNum:'0°',//实时数据
    setFlagFn: null,//更新阙值的方法
    controlDeviceFn: null//控制设备的方法
})
let deviceIcon= computed(() => {
    if (device === 'fan') {
        return isOpening.value?'icon-a-fengliangzhonggaotianchongyes':'icon-songpaifengxitong'
    } else {
        return isOpening.value?'icon-curtain_off':'icon-chuanglian'
    }
})
let isOpening = ref(false)
let isLoading = ref(false)
let isAuto = ref(true)
function Control() {
    isLoading.value = true
    if (isAuto.value) {
        ElMessage.success('模式自动切换成手动模式')
        isAuto.value = false
    }
    return new Promise((resolve, reject) => {
        if (isOpening.value) {
            //关闭
            deviceInfo.value.controlDeviceFn(0).then(() => {
                ElMessage.success(device === 'fan' ? '风扇已关闭' : '窗帘已卷起')
                return resolve(true)
            }).catch(() => {
                ElMessage.error('操作失败')
                return reject(false)
            }).finally(() => {
                isLoading.value = false
            })
        } else {
            //开启
            deviceInfo.value.controlDeviceFn(1).then(() => {
                ElMessage.success(device==='fan'?'风扇已打开':'窗帘已放下')
                return resolve(true)
            }).catch(() => {
                ElMessage.error('操作失败')
                return reject(false)
            }).finally(() => {
                isLoading.value = false
            })
        }  
    })
}
function changeMode(way) {
    //改变控制模式
    if (way == "auto") {
        isAuto.value = true
    } else {
        isAuto.value = false
    }
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
onMounted(() => {
    if (device === 'fan') {
        deviceInfo.value = {
            ...deviceInfo.value,
            deviceName: '风扇',
            setFlagFn: setFanFlag,
            controlDeviceFn:controlFan
        }
    } else {
        deviceInfo.value = {
            ...deviceInfo.value,
            deviceName: '窗帘',
            setFlagFn: setCurtainFlag,
            controlDeviceFn:controlCurtain
        }
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