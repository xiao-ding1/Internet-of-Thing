<template>
  <div class="account-management">
    <!-- 显示当前登录账号 -->
    <!-- <div class="current-account">
      <h2>当前账号信息</h2>
      <p><strong>账号:</strong> {{ currentAccount.username }}</p>
      <p><strong>绑定设备:</strong> {{ currentAccount.devices.join(', ') }}</p>
    </div> -->

    <!-- 账号管理表格 -->
    <el-table :data="accounts" border style="width: 100%" class="account-table">
       <!-- 用户账号列 -->
      <el-table-column prop="username" label="用户账号" width="150" />
      
      <!-- 管理员账号列 -->
      <el-table-column prop="adminname" label="管理员账号" width="150" />
      <!-- <el-table-column prop="password" label="密码" width="150">
        <template #default="scope">
          <span
            class="password-cell"
            @mouseenter="scope.row.showPassword = true"
            @mouseleave="scope.row.showPassword = false"
          >
            {{ scope.row.showPassword ? scope.row.password : '*******' }}
          </span>
        </template>
      </el-table-column> -->
      <el-table-column prop="devices" label="绑定设备" />
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button type="primary" size="small" @click="ResetPassword(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 页面操作按钮 -->
    <div class="actions">
      <el-button type="success" @click="dialogVisible = true">添加账号</el-button>
      <!-- <el-button type="warning" @click="goBack">返回首页</el-button> -->
    </div>
  </div>
  <div class="dialog" v-if="dialogVisible">
    <div class="dialog-content">
      <h3 class="dialog-title">添加账号</h3>
      <!-- 设备绑定选择 -->
      <div class="form-item">
        <label for="device-select">设备绑定:</label>
        <select id="device-select" v-model="addForm.boardId" class="form-input">
          <option v-for="device in devices" :key="device" :value="device">
            {{ device }}
          </option>
        </select>
      </div>

      <!-- 用户帐号 -->
      <div class="form-item">
        <label for="user-account">用户帐号:</label>
        <input
          id="user-account"
          type="text"
          v-model="addForm.username"
          placeholder="请输入用户帐号"
          class="form-input"
        />
      </div>

      <!-- 用户密码 -->
      <div class="form-item">
        <label for="user-password">用户密码:</label>
        <input
          id="user-password"
          type="password"
          v-model="addForm.userPassword"
          placeholder="留空默认为'123456'"
          class="form-input"
        />
      </div>

      <!-- 管理员帐号 -->
      <div class="form-item">
        <label for="admin-account">管理员帐号:</label>
        <input
          id="admin-account"
          type="text"
          v-model="addForm.adminName"
          placeholder="请输入管理员帐号"
          class="form-input"
        />
      </div>

      <!-- 管理员密码 -->
      <div class="form-item">
        <label for="admin-password">管理员密码:</label>
        <input
          id="admin-password"
          type="password"
          v-model="addForm.adminPassword"
          placeholder="留空默认为'123456'"
          class="form-input"
        />
      </div>

      <!-- 操作按钮 -->
      <div class="dialog-actions">
        <button class="btn cancel-btn" @click="cancelAddAccount">取消</button>
        <button class="btn confirm-btn" @click="confirmAddAccount">确认</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import api from '../request/index'
let dialogVisible = ref(false)

// 接收父组件的 v-model
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const init = async() =>{
  await getUserInfo()
  accounts.value = processAccountData(rawData.value)
  await getBoardId()
  devices.value = processDeviceData(devicesInfo.value)
}
onMounted(async() => {
  //初始化数据
  init()

})
const rawData = ref([])
const getUserInfo = async() => {
  try {
    const response = await api.listuserboard()
    rawData.value = response.data.data
  } catch (error) {
    if (error.message) {
      // 拦截器返回的自定义错误
      ElMessageBox.alert(`数据获取错误: ${error.message}`);
    } else {
      // 未知错误或网络问题
      ElMessageBox.alert("数据获取错误，请检查网络或稍后重试");
    }
  }
}
function processAccountData(data: any[]) {
  const accountMap = new Map<string, any>(); // 使用 Map 去重并合并数据

  data.forEach(item => {
    const key = `${item.username}-${item.adminname}`; // 唯一键
    if (accountMap.has(key)) {
      // 如果帐号已经存在，合并绑定的设备
      accountMap.get(key).devices.push(item.deviceId);
    } else {
      // 否则，创建新的帐号记录
      accountMap.set(key, {
        username: item.username, // 用户账号
        adminname: item.adminName, // 管理员账号
        devices: [item.deviceId], // 绑定设备
        showPassword: false,
      });
    }
  });

  // 将 Map 转换为数组并返回
  return Array.from(accountMap.values());
}

const devicesInfo = ref([])
const getBoardId = async() => {
  try {
    const response = await api.listboard()
    devicesInfo.value = response.data.data
  } catch (error) {
    if (error.message) {
      // 拦截器返回的自定义错误
      ElMessageBox.alert(`数据获取错误: ${error.message}`);
    } else {
      // 未知错误或网络问题
      ElMessageBox.alert("数据获取错误，请检查网络或稍后重试");
    }
  }
}
//提取deviceId用于
function processDeviceData(data: any[]) {
  let ret = []
  data.forEach(item => {
    ret.push(item.id)
  })
  return ret;
}

// 发射事件，用于更新父组件的 v-model
const emit = defineEmits(['update:modelValue']);

// 当前账号列表
const accounts = ref([
  // { username: 'user1', password: 'password1', devices: ['Device A', 'Device B'] },
  // { username: 'user2', password: 'password2', devices: ['Device C'] },
]);

function ResetPassword(account: any) {
  let defaultpass = '123456'; // 设置默认密码
  console.log('reset')

  // 调用重置密码接口
  api.resetpassword(account.username, defaultpass)
    .then(response => {
      // 处理成功的返回数据
      ElMessage.success('密码重置成功');
      // 更新账户密码
      const updatedAccount = accounts.value.find(acc => acc.username === account.username);
      if (updatedAccount) {
        updatedAccount.password = defaultpass; // 更新密码为默认密码
      }
    })
    .catch(error => {
      // 处理错误
      ElMessage.error('密码重置失败:',error.msg);
    });
}
function toogleDialog() {
  this.dialogVisible.value = !dialogVisible.value
}

// 表单数据
const addForm = ref({
  boardId: '', // 绑定设备
  username: '', // 用户帐号
  userPassword: '', // 用户密码
  adminName: '', // 管理员帐号
  adminPassword: '', // 管理员密码
});
// 重置添加帐号表单数据
function resetForm() {
  addForm.value = {
    boardId: '',
    username: '',
    userPassword: '',
    adminName: '',
    adminPassword: '',
  };
}

// 设备列表数据（替代接口数据）
const devices = ref(['Device A', 'Device B', 'Device C']);

// 取消添加帐号
function cancelAddAccount() {
  dialogVisible.value = false; // 关闭弹窗
  resetForm(); // 重置表单数据
}

// 确认添加帐号
const confirmAddAccount = async() => {
  switch (validateForm()) {
    case 101:
      ElMessage.error('请填写完整的表单信息');
      break;
    case 202:
      ElMessage.error('管理员与用户帐号不能一致');
      break;
    case 303:
      ElMessage.error('请选择绑定设备');
      break;
    default:
      try {
        const response = await api.register(
          addForm.value.username,
          addForm.value.userPassword,
          addForm.value.adminName,
          addForm.value.adminPassword,
          addForm.value.boardId
        )
        dialogVisible.value = false; // 关闭弹窗
        resetForm(); // 重置表单数据
      } catch (error) {
        if (error) {
        // 拦截器返回的自定义错误
        ElMessageBox.alert(`添加失败: ${error.essage}`);
        } else {
          // 未知错误或网络问题
          ElMessageBox.alert("添加失败，请检查网络或稍后重试");
        }
      }
       

  // try {
  //   const response = api.register()
  //   dialogVisible.value = false; // 关闭弹窗
  //   resetForm(); // 重置表单数据
  // } catch (error) {
    
  // }
}

// 验证添加帐号表单内容是否完整
function validateForm() {
  const { boardId, username, userPassword, adminName, adminPassword } =
    addForm.value;
  if(!(username && username.length > 2 && adminName && adminName.length > 2)) return 101

  if (username === adminName) return 202

  if(!(boardId)) return 303
}
}
</script>

<style scoped>
.account-management {
  padding: 20px;
  background-color: #f5f7fa;
}

h1 {
  margin-bottom: 20px;
}

.current-account {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.account-table {
  margin-top: 20px;
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px); /* 添加模糊背景效果 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  animation: fadeIn 0.3s ease-out; /* 淡入动画 */
}

.dialog-content {
  background: #ffffff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 420px;
  text-align: left;
  animation: slideIn 0.3s ease-out; /* 滑入动画 */
}

.dialog-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333333;
  text-align: center;
}

.form-item {
  margin-bottom: 15px;
}

.form-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #666666;
}

.form-input,
.form-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}


.form-input:focus {
  border-color: #4caf50;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333333;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

.confirm-btn {
  background-color: #4caf50;
  color: white;
}

.confirm-btn:hover {
  background-color: #43a047;
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>