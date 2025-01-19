import { request } from "../request";
//修改设备阙值
const setFanFlag = (value) => request.get(`/class/temperature/${value}`)
const setCurtainFlag = (value) => request.get(`/class/ray/${value}`)
//控制设备
const controlFan = (status) => request.get(`/class/fan/${status}`)
const controlCurtain = (status) => request.get(`/class/curtain/${status}`)
//签到
const signIn = () => request.get('/attendance/checkIn')
const signOut = () => request.get('/attendance/checkOut')

export default {
  setFanFlag,
  setCurtainFlag,
  controlFan,
  controlCurtain,
  signIn,
  signOut
}