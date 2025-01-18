import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus"; // 引入el 提示框

// 定义 baseURL
export const baseURL = "http://8.134.218.209/api";

// 创建 axios 实例
export const request = axios.create({
  baseURL,
  timeout: 60000, // 设置请求超时
});

// 获取 token
const token = () => {
  try {
    if (sessionStorage.getItem("token")) {
      return sessionStorage.getItem("token");
    } else {
      return null;
    }
  } catch (e) {
    console.error("获取token出现异常：", e);
    return null;
  }
};

//请求拦截
request.interceptors.request.use(
  (config) => {
    console.log(sessionStorage.getItem("token"));
    // 配置请求头
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    config.headers["Authorization"] = token();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 响应拦截
request.interceptors.response.use(
  (response) => {
    // 检查接口返回的 code 是否为 200
    const { code, msg } = response.data;
    if (code !== 200) {
      // 如果 code 不是 200，弹出提示框显示错误信息
      ElMessageBox.alert(msg || "请求失败", "请求失败", {
        type: "error",
        confirmButtonText: "确定",
      });
      return Promise.reject(new Error(msg || "请求失败"))
    }

    // 如果是 200，返回数据
    return response;
  },
  (error) => {
    // 处理其他错误，如网络错误、服务器错误等
    ElMessageBox.alert("请求失败，请检查网络或稍后重试", "网络错误", {
      type: "error",
      confirmButtonText: "确定",
    });

    return Promise.reject(error); // 返回错误
  }
);
