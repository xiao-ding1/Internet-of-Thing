import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus"; // 引入el 提示框
// 定义baseURL
export const baseURL = "http://113.45.133.116:9999";

// 创建 axios 实例
export const request = axios.create({
  baseURL,
  timeout: 60000, // 设置请求超时
});
const token = () => {
  if (sessionStorage.getItem("token")) {
    return sessionStorage.getItem("token");
  } else {
    return sessionStorage.getItem("token");
  }
};

//请求拦截
request.interceptors.request.use(
  (config) => {
    // 配置请求头
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    config.headers["authorization"] = token();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
request.interceptors.response.use(
  (response) => {
    // 检查后端的自定义业务状态码
    const { code } = response.data;
    if (code && code !== 200) {
      ElMessageBox.alert(response.data.message);
      return Promise.reject(new Error(response.data.message || "业务逻辑错误"));
    }
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      ElMessageBox.alert(response.data.message);
      return Promise.reject(response.data);
    } else {
      ElMessage.warning("网络连接异常,请稍后再试!");
      return Promise.reject("网络连接异常");
    }
  }
);
