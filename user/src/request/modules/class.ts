import { request } from "../request";
//修改设备阙值
export const setFanFlag = (value) => request.get(`/class/temperature/${value}`)
export const setCurtainFlag = (value) => request.get(`/class/ray/${value}`)
//控制设备
export const controlFan = (status) => request.get(`/class/fan/${status}`)
export const controlCurtain = (status) => request.get(`/class/curtain/${status}`)
//签到
export const signIn = () => request.get('/attendance/checkIn')
export const signOut = ()=>request.get('/attendance/checkOut')