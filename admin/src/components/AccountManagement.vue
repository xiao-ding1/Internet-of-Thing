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
      <el-table-column prop="password" label="密码" width="150" />
      <el-table-column prop="devices" label="绑定设备" />
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button type="primary" size="small" @click="editAccount(scope.row)">修改</el-button>
          <el-button type="success" size="small" @click="setAsCurrent(scope.row)">设置为当前账号</el-button>
          <el-button type="danger" size="small" @click="deleteAccount(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 页面操作按钮 -->
    <div class="actions">
      <el-button type="success" @click="addAccount">添加账号</el-button>
      <el-button type="warning" @click="goBack">返回首页</el-button>
    </div>

    <!-- 修改账号弹窗 -->
    <el-dialog title="修改账号信息" v-model:visible="editDialogVisible">
      <el-form :model="editForm">
        <el-form-item label="账号" required>
          <el-input v-model="editForm.username" placeholder="请输入新的账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input type="password" v-model="editForm.password" placeholder="请输入新的密码"></el-input>
        </el-form-item>
        <el-form-item label="绑定设备">
          <el-input v-model="editForm.devices" placeholder="请输入绑定设备（用逗号分隔）"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </template>
    </el-dialog>

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
import { ref } from 'vue';
// 接收父组件的 v-model
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

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
let editDialogVisible = ref(false);
let addDialogVisible = ref(false);

// 编辑表单和添加表单的数据
const editForm = ref({ username: '', password: '', devices: '' });
const addForm = ref({ username: '', password: '', devices: '' });

// 设置某账号为当前登录账号
function setAsCurrent(account: any) {
  currentAccount.value = { ...account };
}

// 编辑账号
function editAccount(account: any) {
  editForm.value = { ...account, devices: account.devices.join(', ') };
  editDialogVisible.value = true;
}

// 保存编辑的账号
function saveEdit() {
  const editedAccount = {
    ...editForm.value,
    devices: editForm.value.devices.split(',').map((d: string) => d.trim()),
  };

  // 更新账号列表
  const index = accounts.value.findIndex((acc) => acc.username === editForm.value.username);
  if (index !== -1) {
    accounts.value[index] = editedAccount;
  }

  // 如果修改的账号是当前账号，也同步更新
  if (currentAccount.value.username === editedAccount.username) {
    currentAccount.value = { ...editedAccount };
  }

  editDialogVisible.value = false;
}

// 添加账号
function addAccount() {
  addForm.value = { username: '', password: '', devices: '' };
  addDialogVisible.value = true;
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

// 删除账号
function deleteAccount(index: number) {
  const deletedAccount = accounts.value[index];
  accounts.value.splice(index, 1);

  // 如果删除的账号是当前账号，清空当前账号信息
  if (currentAccount.value.username === deletedAccount.username) {
    currentAccount.value = { username: '', password: '', devices: [] };
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
</style>