import axios from 'axios'
import { ElMessage, ElMessageBox } from "element-plus"; // 引入el 提示框
// 定义baseURL
export const baseURL = 'http://113.45.133.116:9999';

// 创建 axios 实例
export const request = axios.create({
  baseURL,
  timeout: 60000, // 设置请求超时
});
const token = () => {
  try {
      if (sessionStorage.getItem("token")) {
          return sessionStorage.getItem("token");
      } else {
          return null;
      }
  } catch (e) {
      console.error('获取token出现异常：', e);
      return null;
  }
};

//请求拦截
request.interceptors.request.use(
  (config) => {
    console.log(sessionStorage.getItem('token'));
    // 配置请求头
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    config.headers["Authorization"] = token();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
