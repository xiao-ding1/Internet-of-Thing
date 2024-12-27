<template>
  <div class="account-management">
    <!-- 显示当前登录账号 -->
    <div class="current-account">
      <h2>当前账号信息</h2>
      <p><strong>账号:</strong> {{ currentAccount.username }}</p>
      <p><strong>绑定设备:</strong> {{ currentAccount.devices.join(', ') }}</p>
    </div>

    <!-- 账号管理表格 -->
    <el-table :data="accounts" border style="width: 100%" class="account-table">
      <el-table-column prop="username" label="账号" width="150" />
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
      <el-button type="success" @click="addAccount">添加账号</el-button>
      <el-button type="warning" @click="goBack">返回首页</el-button>
    </div>


    <!-- 添加账号弹窗 -->
    <el-dialog title="添加账号" v-model:visible="addDialogVisible">
      <el-form :model="addForm">
        <el-form-item label="账号" required>
          <el-input v-model="addForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input type="password" v-model="addForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="绑定设备">
          <el-input v-model="addForm.devices" placeholder="请输入绑定设备（用逗号分隔）"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveNewAccount">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import api from '../request/index'
// 接收父组件的 v-model
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

onMounted(async() => {
  await getUserInfo()
  accounts.value = processAccountData(rawData.value)
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
  const accountMap = new Map<string, any>(); // 使用 Map 来去重并合并数据

  data.forEach(item => {
    if (accountMap.has(item.username)) {
      // 如果帐号已经存在，合并绑定的设备
      accountMap.get(item.username).devices.push(item.deviceId);
    } else {
      // 否则，创建新的帐号记录
      accountMap.set(item.username, {
        username: item.username,
        // password: '********', // 默认密码显示为******，可根据需要替换
        devices: [item.deviceId], // 绑定设备
        showPassword: false
      });
    }
  });

  // 将 Map 转换为数组并返回
  return Array.from(accountMap.values());
}

// 发射事件，用于更新父组件的 v-model
const emit = defineEmits(['update:modelValue']);

// 返回首页
function goBack() {
  emit('update:modelValue', false);
}

// 当前账号列表（静态数据）
const accounts = ref([
  { username: 'user1', password: 'password1', devices: ['Device A', 'Device B'] },
  { username: 'user2', password: 'password2', devices: ['Device C'] },
]);

// 当前登录账号（默认设置为第一个账号）
const currentAccount = ref({
  username: 'user1',
  password: 'password1',
  devices: ['Device A', 'Device B'],
});

// 修改弹窗和添加弹窗的可见状态
let addDialogVisible = ref(false);

// 编辑表单和添加表单的数据
const editForm = ref({ username: '', password: '', devices: '' });
const addForm = ref({ username: '', password: '', devices: '' });

// 编辑账号
function ResetPassword(account: any) {
  let defaultpass = '123456'; // 设置默认密码
  editForm.value = { ...account, devices: account.devices.join(', ') }; // 填充表单数据

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

// 添加账号
function addAccount() {
  // 重置表单数据
  addForm.value = { username: '', password: '', devices: '' };
  // 显示弹窗
  addDialogVisible.value = true;
  console.log("Add Dialog Visible:", addDialogVisible.value); // 调试输出，检查状态变化
}

// 保存新账号
function saveNewAccount() {
  const newAccount = {
    ...addForm.value,
    devices: addForm.value.devices.split(',').map((d: string) => d.trim()),
  };
  accounts.value.push(newAccount);
  addDialogVisible.value = false;
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
</style>