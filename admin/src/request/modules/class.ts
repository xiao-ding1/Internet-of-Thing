import { request } from "../request";
//修改设备阙值
const setFanFlag = (value) => request.get(`/class/temperature/${value}`)
const setCurtainFlag = (value) => request.get(`/class/ray/${value}`)
//控制设备
const controlFan = (status) => request.get(`/class/fan/${status}`)
const controlCurtain = (status) => request.get(`/class/curtain/${status}`)
//签到信息
const getSignInfo = ()=>request.get('/attendance')

export default {
  setFanFlag,
  setCurtainFlag,
  controlCurtain,
  controlFan,
  getSignInfo
}