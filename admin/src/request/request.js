import axios from 'axios'
import { ElMessage, ElMessageBox } from "element-plus"; // 引入el 提示框

// 定义 baseURL
export const baseURL = 'http://113.45.133.116:9999';

// 创建 axios 实例
export const request = axios.create({
  baseURL,
  timeout: 60000, // 设置请求超时
});

// 获取 token
const token = () => {
  return sessionStorage.getItem("token");
};

// 请求拦截
request.interceptors.request.use(
  (config) => {
    const tokenValue = token();    
    // 配置请求头
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    if (tokenValue) {
      config.headers["Authorization"] = tokenValue;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
request.interceptors.response.use(
  (response) => {
    const { code } = response.data;
    if (code && code !== 200) {
      return Promise.reject(new Error(response.data.message || '业务逻辑错误'));
    }
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但不在2xx范围内
      ElMessageBox.alert(response.data.message || '请求错误');
      return Promise.reject(response.data);
    } else {
      ElMessage.warning("网络连接异常, 请稍后再试!");
    }
  }
);